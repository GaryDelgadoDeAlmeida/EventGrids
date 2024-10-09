<?php

namespace App\Controller\API\Backoffice;

use App\Entity\Sponsor;
use App\Manager\FileManager;
use App\Manager\SerializeManager;
use App\Repository\SponsorRepository;
use phpDocumentor\Reflection\Types\This;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class SponsorController extends AbstractController
{
    private FileManager $fileManager;
    private SerializeManager $serializeManager;
    private SponsorRepository $sponsorRepository;

    function __construct(
        FileManager $fileManager,
        SerializeManager $serializeManager, 
        SponsorRepository $sponsorRepository
    ) {
        $this->fileManager = $fileManager;
        $this->serializeManager = $serializeManager;
        $this->sponsorRepository = $sponsorRepository;
    }

    #[Route('/sponsor', name: 'post_sponsor', methods: ["POST"])]
    public function post_sponsor(Request $request): JsonResponse {
        $jsonIMG = $request->files->get("sponsorIMG", "");
        if(empty($jsonIMG)) {
            return $this->json([
                "message" => "An image must be send."
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $sponsor = $this->sponsorRepository->findOneBy([], ["id" => "DESC"]);
        $id = $sponsor->getId() + 1;

        try {
            if( !($jsonIMG instanceof UploadedFile) ) {
                throw new \Exception("An error has been encountered with the uplaoded IMG");
            }

            $response = $this->fileManager->uploadFile($jsonIMG, $this->getParameter("sponsor_directory"), "Sponsor ({$id})");
            if(is_bool($response)) {
                throw new \Exception("An error has been encountered during the processing of the image");
            }

            $sponsor = (new Sponsor())
                ->setImgPath($response)
                ->setCreatedAt(new \DateTimeImmutable())
            ;

            $this->sponsorRepository->save($sponsor, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($sponsor, Response::HTTP_CREATED);
    }

    #[Route('/sponsor/{sponsorID}/update', name: 'update_sponsor', requirements: ["sponsorID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_sponsor(int $sponsorID, Request $request) : JsonResponse {
        $sponsor = $this->sponsorRepository->find($sponsorID);
        if(empty($sponsor)) {
            return $this->json([
                "message" => "Sponsor not found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonIMG = $request->files->get("sponsorIMG", "");
        if(empty($jsonIMG)) {
            return $this->json([
                "message" => "An image must be send."
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            if( !($jsonIMG instanceof UploadedFile) ) {
                throw new \Exception("An error has been encountered with the uplaoded IMG");
            }

            $response = $this->fileManager->uploadFile($jsonIMG, $this->getParameter("sponsor_directory"), "Sponsor ({$sponsor->getId()})");
            if(is_bool($response)) {
                throw new \Exception("An error has been encountered during the processing of the image");
            }

            $sponsor
                ->setImgPath($response)
                ->setUpdatedAt(new \DateTimeImmutable())
            ;

            $this->sponsorRepository->save($sponsor, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
    }

    #[Route('/sponsor/{sponsorID}/remove', name: 'remove_sponsor', requirements: ["sponsorID" => "^\d+(?:\d+)?$"], methods: ["DELETE"])]
    public function remove_sponsor(int $sponsorID) : JsonResponse {
        $sponsor = $this->sponsorRepository->find($sponsorID);
        if(empty($sponsor)) {
            return $this->json([
                "message" => "Sponsor not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove the file stored on the server
            $this->fileManager->removeFile($sponsor->getImgPath());

            // Remove the sponsor from database
            $this->sponsorRepository->remove($sponsor, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
