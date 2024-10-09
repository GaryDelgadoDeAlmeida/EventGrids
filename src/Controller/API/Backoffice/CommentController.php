<?php

namespace App\Controller\API\Backoffice;

use App\Manager\SerializeManager;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class CommentController extends AbstractController
{
    private SerializeManager $serializeManager;
    private CommentRepository $commentRepository;

    function __construct(SerializeManager $serializeManager, CommentRepository $commentRepository) {
        $this->serializeManager = $serializeManager;
        $this->commentRepository = $commentRepository;
    }

    #[Route('/comments', name: 'get_comments', methods: ["GET"])]
    public function get_comments(Request $request): JsonResponse {
        $limit = 20;
        $offset = !empty($request->get("offset")) && is_numeric($request->get("offset")) ? intval($request->get("offset")) : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->commentRepository->countComments() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->commentRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ]);
    }

    #[Route('/comment/{commentID}', name: 'get_comments', requirements: ["commentID" => "^\d+(?:\d+)?$"], methods: ["DELETE"])]
    public function remove_comment(int $commentID) : JsonResponse {
        $comment = $this->commentRepository->find($commentID);
        if(empty($comment)) {
            return $this->json([
                "message" => "The comment couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove link the blog entity
            $comment->setBlog(null);

            // Remove the entity object from database
            $this->commentRepository->remove($comment, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
