<?php

namespace App\Controller\API\Backoffice;

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
    private SerializeManager $serializeManager;
    private InboxRepository $inboxRepository;

    function __construct(
        SerializeManager $serializeManager, 
        InboxRepository $inboxRepository
    ) {
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
        return $this->json([
            "message" => ""
        ], Response::HTTP_OK);
    }
}
