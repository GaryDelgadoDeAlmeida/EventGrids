<?php

namespace App\Controller\API;

use App\Manager\CommentManager;
use App\Manager\SerializeManager;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class CommentController extends AbstractController
{
    private CommentManager $commentManager;
    private SerializeManager $serializeManager;
    private CommentRepository $commentRepository;
    function __construct(
        CommentManager $commentManager, 
        SerializeManager $serializeManager,
        CommentRepository $commentRepository
    ) {
        $this->commentManager = $commentManager;
        $this->serializeManager = $serializeManager;
        $this->commentRepository = $commentRepository;
    }

    #[Route('/comment', name: 'post_comment', methods: ["POST"])]
    public function post_comment(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->commentManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $comment = $this->commentManager->fillComment($fields);
            if(is_string($comment)) {
                throw new \Exception($comment);
            }

            $this->commentRepository->save($comment, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $this->serializeManager->serializeContent($comment), 
            Response::HTTP_CREATED
        );
    }
}
