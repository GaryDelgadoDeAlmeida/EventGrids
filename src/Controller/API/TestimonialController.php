<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class TestimonialController extends AbstractController
{
    private SerializeManager $serializeManager;
    function __construct(SerializeManager $serializeManager) {
        $this->serializeManager = $serializeManager;
    }
    
    #[Route('/testimonials', name: 'get_testimonials', methods: ["GET"])]
    public function get_testimonials(): JsonResponse {
        return $this->json([], Response::HTTP_OK);
    }
}
