<?php

namespace App\Controller\API\Backoffice;

use App\Entity\User;
use App\Manager\SerializeManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class ProfileController extends AbstractController
{
    private User $user;
    private SerializeManager $serializeManager;

    function __construct(Security $security, SerializeManager $serializeManager) {
        $this->user = $security->getUser();
        $this->serializeManager = $serializeManager;
    }

    #[Route('/profile', name: 'get_profile', methods: ["GET"])]
    public function get_profile(): JsonResponse {
        return $this->json("");
    }
}
