<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class TagController extends AbstractController
{
    private SerializeManager $serializeManager;
    private TagRepository $tagRepository;

    function __construct(SerializeManager $serializeManager, TagRepository $tagRepository) {
        $this->serializeManager = $serializeManager;
        $this->tagRepository = $tagRepository;
    }

    #[Route('/tags', name: 'get_tags', methods: ["GET"])]
    public function get_tags(): JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->tagRepository->findAll()
            )
        ]);
    }

    #[Route('/tag/{tagID}', name: 'get_tag', methods: ["GET"])]
    public function get_tag(int $tagID) : JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->tagRepository->find($tagID)
            )
        ]);
    }
}
