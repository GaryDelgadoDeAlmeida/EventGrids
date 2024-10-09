<?php

namespace App\Controller\API\Backoffice;

use App\Entity\Category;
use App\Repository\BlogRepository;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class CategoryController extends AbstractController
{
    private BlogRepository $blogRepository;
    private CategoryRepository $categoryRepository;
    
    function __construct(
        BlogRepository $blogRepository, 
        CategoryRepository $categoryRepository
    ) {
        $this->blogRepository = $blogRepository;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/category', name: 'post_category', methods: ["POST"])]
    public function post_category(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            if(empty($jsonContent["label"])) {
                throw new \Exception("The category must have a name", Response::HTTP_FORBIDDEN);
            }

            if(strlen($jsonContent["label"]) > 255) {
                throw new \Exception("The category name can't exceed 255 caracters length", Response::HTTP_FORBIDDEN);
            }

            $category = (new Category())
                ->setLabel($jsonContent["label"])
                ->setCreatedAt(new \DateTimeImmutable())
            ;

            $this->categoryRepository->save($category, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_CREATED);
    }

    #[Route('/category/{categoryID}/update', name: 'update_category', requirements: ["categoryID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_category(int $categoryID, Request $request) : JsonResponse {
        $category = $this->categoryRepository->find($categoryID);
        if(empty($category)) {
            return $this->json([
                "message" => "The category couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            if(empty($jsonContent["label"])) {
                throw new \Exception("The category must have a name", Response::HTTP_FORBIDDEN);
            }

            if(strlen($jsonContent["label"]) > 255) {
                throw new \Exception("The category name can't exceed 255 caracters length", Response::HTTP_FORBIDDEN);
            }

            $category->setLabel($jsonContent["label"]);

            $this->categoryRepository->save($category, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_OK);
    }

    #[Route('/category/{categoryID}/remove', name: 'remove_category', requirements: ["categoryID" => "^\d+(?:\d+)?$"], methods: ["DELETE"])]
    public function remove_category(int $categoryID) : JsonResponse {
        $category = $this->categoryRepository->find($categoryID);
        if(empty($category)) {
            return $this->json([
                "message" => "The category couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            foreach($category->getBlogs() as $blog) {
                $blog->removeCategory($category);
                $this->blogRepository->save($blog, true);
            }

            $this->categoryRepository->remove($category, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
