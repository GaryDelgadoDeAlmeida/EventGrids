<?php

namespace App\Controller\API\Backoffice;

use App\Entity\User;
use App\Manager\SerializeManager;
use App\Manager\UserManager;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class ProfileController extends AbstractController
{
    private User $user;
    private UserManager $userManager;
    private SerializeManager $serializeManager;
    private UserRepository $userRepository;

    function __construct(
        Security $security, 
        UserManager $userManager,
        SerializeManager $serializeManager,
        UserRepository $userRepository
    ) {
        $this->user = $security->getUser();
        $this->userManager = $userManager;
        $this->serializeManager = $serializeManager;
        $this->userRepository = $userRepository;
    }

    #[Route('/profile', name: 'get_profile', methods: ["GET"])]
    public function get_profile(): JsonResponse {
        return $this->json($this->serializeManager->serializeContent($this->user), Response::HTTP_OK);
    }

    #[Route('/profile', name: 'update_profile', methods: ["UPDATE", "PUT"])]
    public function update_profile(Request $request) : JsonResponse {
        return $this->json("");
    }
}
