<?php

namespace App\Controller\API\Backoffice;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TagController extends AbstractController
{
    #[Route('/a/p/i/backoffice/tag', name: 'app_a_p_i_backoffice_tag')]
    public function index(): Response
    {
        return $this->render('api/backoffice/tag/index.html.twig', [
            'controller_name' => 'TagController',
        ]);
    }
}
