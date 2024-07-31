<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class EventController extends AbstractController
{
    private SerializeManager $serializeManager;
    private EventRepository $eventRepository;
    function __construct(
        SerializeManager $serializeManager, 
        EventRepository $eventRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->eventRepository = $eventRepository;
    }

    #[Route('/events', name: 'get_events', methods: ["GET"])]
    public function get_events(): JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }

    #[Route('/event/{eventID}', name: 'get_event', requirements: ["eventID" => "^\d+(?:\d+)?$"], methods: ["GET"])]
    public function get_event(int $eventID) : JsonResponse {
        return $this->json([
            "message" => "Route under construction"
        ], Response::HTTP_OK);
    }
}
