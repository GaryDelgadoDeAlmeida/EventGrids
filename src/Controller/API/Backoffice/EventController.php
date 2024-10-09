<?php

namespace App\Controller\API\Backoffice;

use App\Enum\EventEnum;
use App\Manager\EventManager;
use App\Manager\FileManager;
use App\Manager\SerializeManager;
use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class EventController extends AbstractController
{
    private FileManager $fileManager;
    private EventManager $eventManager;
    private SerializeManager $serializeManager;
    private EventRepository $eventRepository;

    function __construct(
        FileManager $fileManager,
        EventManager $eventManager,
        SerializeManager $serializeManager, 
        EventRepository $eventRepository
    ) {
        $this->fileManager = $fileManager;
        $this->eventManager = $eventManager;
        $this->serializeManager = $serializeManager;
        $this->eventRepository = $eventRepository;
    }

    #[Route('/event', name: 'post_event', methods: ["POST"])]
    public function post_event(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->eventManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $event = $this->eventManager->fillEvent($fields);
            if(is_string($event)) {
                throw new \Exception($event);
            }

            $this->eventRepository->save($event, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(
            $this->serializeManager->serializeContent($event), 
            Response::HTTP_CREATED
        );
    }

    #[Route('/event/{eventID}/update', name: 'udpate_event', requirements: ["eventID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_event(int $eventID, Request $request) : JsonResponse {
        $event = $this->eventRepository->find($eventID);
        if(empty($event)) {
            return $this->json([
                "message" => "The event couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->eventManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $event = $this->eventManager->fillEvent($fields, $event);
            if(is_string($event)) {
                throw new \Exception($event);
            }

            $this->eventRepository->save($event, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        return $this->json(null, Response::HTTP_ACCEPTED);
    }

    #[Route('/event/{eventID}/update/img', name: "update_event_img", requirements: ["eventID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_event_img(int $eventID, Request $request) : JsonResponse {
        $event = $this->eventRepository->find($eventID);
        if(empty($event)) {
            return $this->json([
                "message" => "The event couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $fields = $this->eventManager->checkFields([
                EventEnum::EVENT_IMG => $request->get("img_path")
            ]);

            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $fields[EventEnum::EVENT_IMG] = $this->fileManager->uploadFile(
                $fields[EventEnum::EVENT_IMG], 
                $this->getParameter("sponsor_directory"), 
                "Sponsor ({$event->getId()})"
            );

            $event = $this->eventManager->fillEvent($fields, $event);
            if(is_string($event)) {
                throw new \Exception($event);
            }

            $this->eventRepository->save($event, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([], Response::HTTP_ACCEPTED);
    }

    #[Route('/event/{eventID}/remove', name: 'remove_event', requirements: ["eventID" => "^\d+(?:\d+)?$"], methods: ["DELETE"])]
    public function remove_event(int $eventID) : JsonResponse {
        $event = $this->eventRepository->find($eventID);
        if(empty($event)) {
            return $this->json([
                "message" => "The event couldn't be foud"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove link between event group
            $event->setEventGroup(null);

            // Remove IMG file
            $this->fileManager->removeFile($event->getImgPath());

            // Finally, remove the event object
            $this->eventRepository->remove($event, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
