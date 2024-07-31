<?php

namespace App\Controller\API\Backoffice;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CategoryController extends AbstractController
{
    #[Route('/a/p/i/backoffice/category', name: 'app_a_p_i_backoffice_category')]
    public function index(): Response
    {
        return $this->render('api/backoffice/category/index.html.twig', [
            'controller_name' => 'CategoryController',
        ]);
    }
}
