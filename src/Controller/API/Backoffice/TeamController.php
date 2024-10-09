<?php

namespace App\Controller\API\Backoffice;

use App\Manager\FileManager;
use App\Manager\SerializeManager;
use App\Manager\TeamManager;
use App\Repository\TeamRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/backoffice', name: 'api_backoffice_')]
class TeamController extends AbstractController
{
    private TeamManager $teamManager;
    private FileManager $fileManager;
    private SerializeManager $serializeManager;
    private TeamRepository $teamRepository;

    function __construct(
        TeamManager $teamManager,
        FileManager $fileManager,
        SerializeManager $serializeManager, 
        TeamRepository $teamRepository
    ) {
        $this->teamManager = $teamManager;
        $this->fileManager = $fileManager;
        $this->serializeManager = $serializeManager;
        $this->teamRepository = $teamRepository;
    }

    #[Route('/teams', name: 'get_teams', methods: ["GET"])]
    public function get_teams(Request $request): JsonResponse {
        $limit = 10;
        $offset = !empty($request->get("offset")) && is_numeric($request->get("offset")) && $request->get("offset") > 1 ? intval($request->get("offset")) : 1;

        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->teamRepository->countTeams() / $limit),
            "results" => $this->serializeManager->serializeContent(
                $this->teamRepository->findBy([], ["id" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_OK);
    }

    #[Route('/team', name: 'post_team', methods: ["POST"])]
    public function post_team(Request $request): JsonResponse {
        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->teamManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $team = $this->teamManager->fillTeam($fields);
            if(is_string($team)) {
                throw new \Exception($team);
            }

            $this->teamRepository->save($team, true);
        } catch(\Exception $e) {
            $code = $e->getCode();
            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($team, Response::HTTP_CREATED);
    }

    #[Route('/team/{teamID}/update', name: 'update_team', requirements: ["teamID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_team(int $teamID, Request $request): JsonResponse {
        $team = $this->teamRepository->find($teamID);
        if(empty($team)) {
            return $this->json([
                "message" => "The team member couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = json_decode($request->getContent(), true);
        if(empty($jsonContent)) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->teamManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_PRECONDITION_FAILED);
            }

            $team = $this->teamManager->fillTeam($fields, $team);
            if(is_string($team)) {
                throw new \Exception($team);
            }

            $this->teamRepository->save($team, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($team, Response::HTTP_ACCEPTED);
    }

    #[Route("/team/{teamID}/photo/update", name: "update_team_photo", requirements: ["teamID" => "^\d+(?:\d+)?$"], methods: ["UPDATE", "PUT"])]
    public function update_team_photo(int $teamID, Request $request) : JsonResponse {
        $team = $this->teamRepository->find($teamID);
        if(empty($team)) {
            return $this->json([
                "message" => "The team member couldn't be found"
            ], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = [
            "photo" => $request->files->get("photo")
        ];

        try {
            $fields = $this->teamManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended image", Response::HTTP_PRECONDITION_FAILED);
            }

            $team = $this->teamManager->fillTeam($fields, $team);
            if(is_string($team)) {
                throw new \Exception($team);
            }

            $this->teamRepository->save($team, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 && isset(Response::$statusTexts[$code]) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/team/{teamID}/remove', name: 'remove_team', requirements: ["teamID" => "^\d+(?:\d+)?$"], methods: ["DELETE"])]
    public function remove_team(int $teamID, Request $request): JsonResponse {
        $team = $this->teamRepository->find($teamID);
        if(empty($team)) {
            return $this->json([
                "message" => "Team not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Remove team member photo
            $this->fileManager->removeFile($team->getImgPath());
            
            // Remove team object
            $this->teamRepository->remove($team, true);
        } catch(\Exception $e) {
            $code = $e->getCode();

            return $this->json([
                "message" => $e->getMessage()
            ], $code !== 200 ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
