<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\PriceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class PriceController extends AbstractController
{
    private SerializeManager $serializeManager;
    private PriceRepository $priceRepository;

    function __construct(SerializeManager $serializeManager, PriceRepository $priceRepository) {
        $this->serializeManager = $serializeManager;
        $this->priceRepository = $priceRepository;
    }

    #[Route('/prices', name: 'get_prices', methods: ["GET"])]
    public function get_prices(): JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->priceRepository->findAll()
            )
        ], Response::HTTP_OK);
    }
}
