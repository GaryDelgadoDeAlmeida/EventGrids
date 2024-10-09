<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\TeamRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class TeamController extends AbstractController
{
    private SerializeManager $serializeManager;
    private TeamRepository $teamRepository;

    function __construct(SerializeManager $serializeManager, TeamRepository $teamRepository) {
        $this->serializeManager = $serializeManager;
        $this->teamRepository = $teamRepository;
    }

    #[Route('/teams', name: 'get_teams', methods: ["GET"])]
    public function get_teams(): JsonResponse {
        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->teamRepository->findAll()
            )
        ], Response::HTTP_OK);
    }
}
