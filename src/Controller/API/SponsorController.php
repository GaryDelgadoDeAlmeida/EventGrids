<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\SponsorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class SponsorController extends AbstractController
{
    private SerializeManager $serializeManager;
    private SponsorRepository $sponsorRepository;

    function __construct(SerializeManager $serializeManager, SponsorRepository $sponsorRepository) {
        $this->serializeManager = $serializeManager;
        $this->sponsorRepository = $sponsorRepository;
    }

    #[Route('/sponsors', name: 'get_sponsors', methods: ["GET"])]
    public function get_sponsors(): JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->sponsorRepository->findAll()
            )
        ], Response::HTTP_OK);
    }
}
