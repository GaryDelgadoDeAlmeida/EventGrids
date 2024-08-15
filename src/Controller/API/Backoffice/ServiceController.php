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
            dd($e->getCode(), $e->getMessage());
            $code = $e->getCode();
            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return $this->json($service, Response::HTTP_CREATED);
    }
}
