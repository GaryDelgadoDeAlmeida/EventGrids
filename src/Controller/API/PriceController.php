<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class PriceController extends AbstractController
{
    private SerializeManager $serializeManager;
    function __construct(SerializeManager $serializeManager) {
        $this->serializeManager = $serializeManager;
    }

    #[Route('/prices', name: 'get_prices', methods: ["GET"])]
    public function get_prices(): JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }
}
