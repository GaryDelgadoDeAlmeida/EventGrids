<?php

namespace App\Controller\API\Backoffice;

use App\Manager\SerializeManager;
use App\Manager\TestimonialManager;
use App\Repository\TestimonialRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class TestimonialController extends AbstractController
{
    private SerializeManager $serializeManager;
    private TestimonialManager $testimonialManager;
    private TestimonialRepository $testimonialRepository;

    function __construct(
        SerializeManager $serializeManager, 
        TestimonialManager $testimonialManager,
        TestimonialRepository $testimonialRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->testimonialManager = $testimonialManager;
        $this->testimonialRepository = $testimonialRepository;
    }

    #[Route('/testimonial', name: 'post_testimonial', methods: ["POST"])]
    public function post_testimonial(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->testimonialManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $testimonial = $this->testimonialManager->fillTestimonial($fields);
            if(is_string($testimonial)) {
                throw new \Exception($testimonial);
            }

            $this->testimonialRepository->save($testimonial, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($testimonial, Response::HTTP_CREATED);
    }

    #[Route('/testimonial/{testimonialID}/update', name: 'update_testimonial', requirements: ["testimonialID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_testimonial(int $testimonialID, Request $request) : JsonResponse {
        $testimonial = $this->testimonialRepository->find($testimonialID);
        if(empty($testimonial)) {
            return $this->json([
                "message" => "The testimonial couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->testimonialManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $testimonial = $this->testimonialManager->fillTestimonial($fields, $testimonial);
            if(is_string($testimonial)) {
                throw new \Exception($testimonial);
            }

            $this->testimonialRepository->save($testimonial, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($testimonial, Response::HTTP_ACCEPTED);
    }

    #[Route('/testimonial/{testimonialID}/photo/update', name: 'update_testimonial_photo', requirements: ["testimonialID" => "^\d+(?:\d+)?$"], methods: ["POST"])]
    public function update_testimonial_photo(int $testimonialID, Request $request) : JsonResponse {
        $testimonial = $this->testimonialRepository->find($testimonialID);
        if(empty($testimonial)) {
            return $this->json([
                "message" => "The testimonial couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = [
            "photo" => $request->files->get("photo")
        ];

        return $this->json("", Response::HTTP_OK);
    }

    #[Route('/testimonial/{testimonialID}/remove', name: 'remove_testominial', requirements: ["testimonialID" => "^\d+(?:\d+)?$"], methods: ["POST"])]
    public function remove_testominial(int $testimonialID) : JsonResponse {
        $testimonial = $this->testimonialRepository->find($testimonialID);
        if(empty($testimonial)) {
            return $this->json([
                "message" => "The testimonial couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // TODO: Remove img

            // TODO: Remove testimonial object
            $this->testimonialRepository->remove($testimonial, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
