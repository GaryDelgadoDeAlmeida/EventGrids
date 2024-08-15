<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\ServiceRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class ServiceController extends AbstractController
{
    private SerializeManager $serializeManager;
    private ServiceRepository $serviceRepository;

    function __construct(
        SerializeManager $serializeManager, 
        ServiceRepository $serviceRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->serviceRepository = $serviceRepository;
    }

    #[Route('/services', name: 'get_services', methods: ["GET"])]
    public function get_services(): JsonResponse {
        return $this->json([
            "results" => $this->serviceRepository->findAll()
        ], Response::HTTP_OK);
    }
}
