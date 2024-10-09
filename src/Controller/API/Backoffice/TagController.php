<?php

namespace App\Controller\API\Backoffice;

use App\Entity\Tag;
use App\Repository\BlogRepository;
use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class TagController extends AbstractController
{
    private TagRepository $tagRepository;
    private BlogRepository $blogRepository;

    function __construct(
        TagRepository $tagRepository, 
        BlogRepository $blogRepository
    ) {
        $this->tagRepository = $tagRepository;
        $this->blogRepository = $blogRepository;
    }

    #[Route('/tags', name: 'post_tag', methods: ["POST"])]
    public function post_tag(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            if(empty($jsonContent["label"])) {
                throw new \Exception("The tag must have a name", Response::HTTP_FORBIDDEN);
            }

            if(strlen($jsonContent["label"]) > 255) {
                throw new \Exception("The tag name can't exceed 255 caracters length", Response::HTTP_FORBIDDEN);
            }

            $tag = (new Tag())
                ->setLabel($jsonContent["label"])
                ->setCreatedAt(new \DateTimeImmutable())
            ;

            $this->tagRepository->save($tag, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_CREATED);
    }

    #[Route('/tag/{tagID}/update', name: 'update_tag', requirements: ["tagID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_tag(int $tagID, Request $request) : JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        $tag = $this->tagRepository->find($tagID);
        if(empty($tag)) {
            return $this->json([
                "message" => "The tag couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            if(empty($jsonContent["label"])) {
                throw new \Exception("The tag must have a name", Response::HTTP_FORBIDDEN);
            }

            if(strlen($jsonContent["label"]) > 255) {
                throw new \Exception("The tag name can't exceed 255 caracters length", Response::HTTP_FORBIDDEN);
            }

            $tag->setLabel($jsonContent["label"]);

            $this->tagRepository->save($tag, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
    }

    #[Route('/tag/{tagID}/remove', name: 'remove_tag', requirements: ["tagID" => "^\d+(?:\d+)?$"], methods: ["DELETE"])]
    public function remove_tag(int $tagID) : JsonResponse {
        $tag = $this->tagRepository->find($tagID);
        if(empty($tag)) {
            return $this->json([
                "message" => "The tag couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            foreach($tag->getBlogs() as $blog) {
                $blog->removeTag($tag);
                $this->blogRepository->save($blog, true);
            }

            $this->tagRepository->remove($tag, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], isset(Response::$statusTexts[$code]) && $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
