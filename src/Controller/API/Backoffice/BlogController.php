<?php

namespace App\Controller\API\Backoffice;

use App\Manager\BlogManager;
use App\Manager\FileManager;
use App\Manager\SerializeManager;
use App\Repository\BlogRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class BlogController extends AbstractController
{
    private BlogManager $blogManager;
    private FileManager $fileManager;
    private SerializeManager $serializeManager;
    private BlogRepository $blogRepository;

    function __construct(
        BlogManager $blogManager, 
        FileManager $fileManager,
        SerializeManager $serializeManager, 
        BlogRepository $blogRepository
    ) {
        $this->blogManager = $blogManager;
        $this->fileManager = $fileManager;
        $this->serializeManager = $serializeManager;
        $this->blogRepository = $blogRepository;
    }

    #[Route('/blog', name: 'post_blog', methods: ["POST"])]
    public function post_blog(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->blogManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $response = $this->blogManager->fillBlog($fields);
            if(is_string($response)) {
                throw new \Exception($response, Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $this->blogRepository->save($response, true);
        } catch(\Exception $e) {
            $code = $e->getCode();
            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_CREATED);
    }

    #[Route('/blog/{blogID}', name: 'update_blog', requirements: ["blogID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    function update_blog(int $blogID, Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        $blog = $this->blogRepository->find($blogID);
        if(empty($blog)) {
            return $this->json([
                "message" => "Blog not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $fields = $this->blogManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $blog = $this->blogManager->fillBlog($fields, $blog);
            if(is_string($blog)) {
                throw new \Exception($blog, Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $this->blogRepository->save($blog, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($this->serializeManager->serializeContent($blog), Response::HTTP_ACCEPTED);
    }

    #[Route('/blog/{blogID}', name: 'update_blog_image', requirements: ["blogID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_blog_image(int $blogID, Request $request) : JsonResponse {
        $blog = $this->blogRepository->find($blogID);
        if(empty($blog)) {
            return $this->json([
                "message" => "The article couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // 
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([], Response::HTTP_OK);
    }

    #[Route('/blog/{blogID}/remove', name: 'remove_blog', requirements: ["blogID" => "^\d+(?:\d+)?$"], methods: ["DELETE"])]
    public function remove_blog(int $blogID) : JsonResponse {
        $blog = $this->blogRepository->find($blogID);
        if(empty($blog)) {
            return $this->json([
                "message" => "Blog not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $this->blogRepository->remove($blog, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code != 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
