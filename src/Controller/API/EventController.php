<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
    public function get_events(Request $request): JsonResponse {
        $limit = 10;
        $offset = !empty($request->get("offset")) && is_numeric($request->get("offset")) && $request->get("offset") > 1 ? $request->get("offset") : 1;

        return $this->json([
            "results" => $this->serializeManager->serializeContent(
                $this->eventRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route('/event/{eventID}', name: 'get_event', requirements: ["eventID" => "^\d+(?:\d+)?$"], methods: ["GET"])]
    public function get_event(int $eventID) : JsonResponse {
        $event = $this->eventRepository->find($eventID);
        if(empty($event)) {
            return $this->json([
                "message" => "Event not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json(
            $this->serializeManager->serializeContent($event), 
            Response::HTTP_OK
        );
    }
}
