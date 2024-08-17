<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\BlogRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class BlogController extends AbstractController
{
    private SerializeManager $serializeManager;
    private BlogRepository $blogRepository;

    function __construct(SerializeManager $serializeManager, BlogRepository $blogRepository) {
        $this->serializeManager = $serializeManager;
        $this->blogRepository = $blogRepository;
    }

    #[Route('/blogs', name: 'get_blogs', methods: ["GET"])]
    public function get_blogs(Request $request): JsonResponse {
        $limit = is_numeric($request->get("limit")) && $request->get("limit") > 1 ? $request->get("limit") : 9;
        $offset = is_numeric($request->get("offset")) && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

        return $this->json($this->serializeManager->serializeContent([
            "offset" => $offset,
            "maxOffset" => ceil($this->blogRepository->countBlogs() / $limit),
            "results" => $this->blogRepository->findBy([], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit)
        ]), Response::HTTP_OK);
    }

    #[Route('/blog/{blogID}', name: 'get_blog', requirements: ["blogID" => "^\d+(?:\d+)?$"], methods: ["GET"])]
    public function get_blog(int $blogID) : JsonResponse {
        $blog = $this->blogRepository->find($blogID);
        if(empty($blog)) {
            return $this->json([
                "message" => "Article not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($blog), 
            Response::HTTP_OK
        );
    }
}
