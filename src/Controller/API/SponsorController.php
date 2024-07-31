<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class SponsorController extends AbstractController
{
    private SerializeManager $serializeManager;
    function __construct(SerializeManager $serializeManager) {
        $this->serializeManager = $serializeManager;
    }

    #[Route('/sponsors', name: 'get_sponsors', methods: ["GET"])]
    public function get_sponsors(): JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }
}
