<?php

namespace App\Controller\API\Backoffice;

use App\Manager\PriceManager;
use App\Manager\SerializeManager;
use App\Repository\PriceDetailRepository;
use App\Repository\PriceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class PriceController extends AbstractController
{
    private PriceManager $priceManager;
    private SerializeManager $serializeManager;
    private PriceRepository $priceRepository;
    private PriceDetailRepository $priceDetailRepository;

    function __construct(
        PriceManager $priceManager, 
        SerializeManager $serializeManager,
        PriceRepository $priceRepository,
        PriceDetailRepository $priceDetailRepository
    ) {
        $this->priceManager = $priceManager;
        $this->serializeManager = $serializeManager;
        $this->priceRepository = $priceRepository;
        $this->priceDetailRepository = $priceDetailRepository;
    }

    #[Route('/price', name: 'post_price', methods: ["POST"])]
    public function post_price(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->priceManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $response = $this->priceManager->fillPrice($fields);
            if(is_string($response)) {
                throw new \Exception($response);
            }

            $this->priceRepository->save($response, true);

            // Add price details
            // 
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code != 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($response, Response::HTTP_CREATED);
    }

    #[Route('/price/{priceID}/update', name: 'update_price', requirements: ["priceID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_price(int $priceID, Request $request) : JsonResponse {
        $price = $this->priceRepository->find($priceID);
        if(empty($price)) {
            return $this->json([
                "message" => "The price couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            // 
        } catch(\Exception $e) {}

        return $this->json(null, Response::HTTP_ACCEPTED);
    }

    #[Route('/price/{priceID}/remove', name: 'remove_price', requirements: ["priceID" => "^\d+(?:\d+)?$"], methods: ["DELETE"])]
    public function remove_price(int $priceID) : JsonResponse {
        $price = $this->priceRepository->find($priceID);
        if(empty($price)) {
            return $this->json([
                "message" => "The price couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove all details of the price 
            foreach($price->getPriceDetails() as $priceDetail) {
                $this->priceDetailRepository->remove($priceDetail, true);
            }

            $this->priceRepository->remove($price, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code != 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
