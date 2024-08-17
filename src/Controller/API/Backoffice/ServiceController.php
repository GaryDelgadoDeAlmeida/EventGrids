<?php

namespace App\Controller\API\Backoffice;

use App\Manager\ServiceManager;
use App\Manager\SerializeManager;
use App\Repository\ServiceRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class ServiceController extends AbstractController
{
    private ServiceManager $serviceManager;
    private SerializeManager $serializeManager;
    private ServiceRepository $serviceRepository;
    
    function __construct(
        ServiceManager $serviceManager, 
        SerializeManager $serializeManager, 
        ServiceRepository $serviceRepository
    ) {
        $this->serviceManager = $serviceManager;
        $this->serializeManager = $serializeManager;
        $this->serviceRepository = $serviceRepository;
    }

    #[Route('/service', name: 'post_service', methods: ["POST"])]
    public function post_service(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->serviceManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $service = $this->serviceManager->fillService($fields);
            if(is_string($service)) {
                throw new \Exception($service);
            }

            $this->serviceRepository->save($service, true);
        } catch(\Exception $e) {
            $code = $e->getCode();
            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        return $this->json($service, Response::HTTP_CREATED);
    }

    #[Route('/service/{serviceID}/update', name: 'update_service', methods: ["UPDATE", "PUT"])]
    public function update_service(int $serviceID, Request $request) : JsonResponse {
        $service = $this->serviceRepository->find($serviceID);
        if(empty($service)) {
            return $this->json([], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->serviceManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $service = $this->serviceManager->fillService($fields, $service);
            if(is_string($service)) {
                throw new \Exception($service);
            }

            $this->serviceRepository->save($service, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($service, Response::HTTP_ACCEPTED);
    }

    #[Route('/service/{serviceID}/remove', name: 'remove_service', methods: ["DELETE"])]
    public function remove_service(int $serviceID) : JsonResponse {
        $service = $this->serviceRepository->find($serviceID);
        if(empty($service)) {
            return $this->json([
                "message" => "Service not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // TODO:: Remove service
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
