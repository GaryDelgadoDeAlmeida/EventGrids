<?php

namespace App\Manager;

use App\Entity\Team;
use App\Enum\TeamEnum;

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
                // 
            } elseif($fieldName == TeamEnum::TEAM_LASTNAME) {
                // 
            } elseif($fieldName == TeamEnum::TEAM_JOB) {
                // 
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