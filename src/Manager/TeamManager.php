<?php

namespace App\Manager;

use App\Entity\Team;
use App\Enum\TeamEnum;
use Symfony\Component\HttpFoundation\Response;

class TeamManager {

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = TeamEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == TeamEnum::TEAM_PHOTO) {
                // 
            } elseif($fieldName == TeamEnum::TEAM_FIRSTNAME) {
                if(empty($fieldValue)) {
                    throw new \Exception(
                        printf("The field '%s' must be filled", $fieldName), 
                        Response::HTTP_FORBIDDEN
                    );
                }

                if(strlen($fieldValue) > 255) {
                    throw new \Exception(
                        printf("The field '%s' value can't exceed 255 caracters length", $fieldName),
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($fieldName == TeamEnum::TEAM_LASTNAME) {
                if(empty($fieldValue)) {
                    throw new \Exception(
                        printf("The field '%s' must be filled", $fieldName), 
                        Response::HTTP_FORBIDDEN
                    );
                }

                if(strlen($fieldValue) > 255) {
                    throw new \Exception(
                        printf("The field '%s' value can't exceed 255 caracters length", $fieldName),
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($fieldName == TeamEnum::TEAM_JOB) {
                if(empty($fieldValue)) {
                    throw new \Exception(
                        printf("The field '%s' must be filled", $fieldName), 
                        Response::HTTP_FORBIDDEN
                    );
                }

                if(strlen($fieldValue) > 255) {
                    throw new \Exception(
                        printf("The field '%s' value can't exceed 255 caracters length", $fieldName),
                        Response::HTTP_FORBIDDEN
                    );
                }
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Team team object
     * @return Team|string
     */
    public function fillTeam(array $fields, ?Team $team = new Team()) : Team|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($team->getId()) {
                $team->setUpdatedAt($currentTime);
            } else {
                $team->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == TeamEnum::TEAM_PHOTO) $team->setPhoto($fieldValue);
                elseif($fieldName == TeamEnum::TEAM_FIRSTNAME) $team->setFirstname($fieldValue);
                elseif($fieldName == TeamEnum::TEAM_LASTNAME) $team->setLastname($fieldValue);
                elseif($fieldName == TeamEnum::TEAM_JOB) $team->setJob($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $team;
    }
}