<?php

namespace App\Controller\API\Backoffice;

use App\Manager\SerializeManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class EventController extends AbstractController
{
    private SerializeManager $serializeManager;
    function __construct(SerializeManager $serializeManager) {
        $this->serializeManager = $serializeManager;
    }

    #[Route('/event', name: 'post_event')]
    public function post_event(Request $request): JsonResponse {
        return $this->json("");
    }
}
