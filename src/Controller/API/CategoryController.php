<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class CategoryController extends AbstractController
{
    private SerializeManager $serializeManager;
    private CategoryRepository $categoryRepository;

    function __construct(
        SerializeManager $serializeManager, 
        CategoryRepository $categoryRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/categories', name: 'get_categories', methods: ["GET"])]
    public function get_categories(): JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->categoryRepository->findAll()
            )
        ], Response::HTTP_OK);
    }

    #[Route('/category/{categoryID}/blogs', name: 'get_category', methods: ["GET"])]
    public function get_category(int $categoryID, Request $request): JsonResponse {
        $limit = 6;
        $offset = is_numeric($request->get("offset")) && $request->get("offset") > 1 ? $request->get("offset") : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil(1 / $limit),
            "results" => $this->serializeManager->serializeContent([])
        ], Response::HTTP_OK);
    }
}
