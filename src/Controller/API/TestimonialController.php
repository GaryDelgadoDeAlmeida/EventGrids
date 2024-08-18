<?php

namespace App\Controller\API;

use App\Manager\SerializeManager;
use App\Repository\TestimonialRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class TestimonialController extends AbstractController
{
    private SerializeManager $serializeManager;
    private TestimonialRepository $testimonialRepository;
    
    function __construct(
        SerializeManager $serializeManager,
        TestimonialRepository $testimonialRepository
    ) {
        $this->serializeManager = $serializeManager;
        $this->testimonialRepository = $testimonialRepository;
    }
    
    #[Route('/testimonials', name: 'get_testimonials', methods: ["GET"])]
    public function get_testimonials(Request $request): JsonResponse {
        $limit = is_numeric($request->get("limit")) && $request->get("limit") > 0 ? $request->get("limit") : 10;
        $offset = is_numeric($request->get("offset")) && $request->get("offset") > 1 ? $request->get("offset") : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->testimonialRepository->countTestimonials() / $limit),
            "results" => $this->testimonialRepository->findBy([], ["createdAt" => "DESC"], $limit, ($offset - 1) * $limit)
        ], Response::HTTP_OK);
    }
}
