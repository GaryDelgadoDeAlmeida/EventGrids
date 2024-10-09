<?php

namespace App\Controller\API\Backoffice;

use App\Manager\InboxManager;
use App\Manager\SerializeManager;
use App\Repository\InboxRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class InboxController extends AbstractController
{
    private InboxManager $inboxManager;
    private SerializeManager $serializeManager;
    private InboxRepository $inboxRepository;

    function __construct(
        InboxManager $inboxManager,
        SerializeManager $serializeManager, 
        InboxRepository $inboxRepository
    ) {
        $this->inboxManager = $inboxManager;
        $this->serializeManager = $serializeManager;
        $this->inboxRepository = $inboxRepository;
    }

    #[Route('/inboxs', name: 'get_inboxs', methods: ["GET"])]
    public function get_inboxs(Request $request): JsonResponse {
        $limit = 20;
        $offset = $request->get("offset") ? $request->get("offset") : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->inboxRepository->countInbox() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->inboxRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route("/inbox/{inboxID}", name: "get_inbox", requirements: ["inboxID" => "^\d+(?:\d+)?$"], methods: ["GET"])]
    public function get_inbox(int $inboxID) : JsonResponse {
        $inbox = $this->inboxRepository->find($inboxID);
        if(empty($inbox)) {
            return $this->json([
                "message" => "The inbox couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json($inbox, Response::HTTP_OK);
    }

    #[Route("/inbox/{inboxID}/update", name: "update_inbox", requirements: ["inboxID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_inbox(int $inboxID, Request $request) : JsonResponse {
        $inbox = $this->inboxRepository->find($inboxID);
        if(empty($inbox)) {
            return $this->json([
                "message" => "The inbox couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->inboxManager->checkFields($jsonContent, true);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $inbox = $this->inboxManager->fillInbox($fields, $inbox);
            if(is_string($inbox)) {
                throw new \Exception($inbox);
            }

            $this->inboxRepository->save($inbox, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
    }

    #[Route("/inbox/{inboxID}/remove", name: "remove_inbox", requirements: ["inboxID" => "^\d+(?:\d+)?$"], methods: ["REMOVE"])]
    public function remove_inbox(int $inboxID) : JsonResponse {
        $inbox = $this->inboxRepository->find($inboxID);
        if(empty($inbox)) {
            return $this->json([
                "message" => "The inbox couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $this->inboxRepository->remvoe($inbox, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code != 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
