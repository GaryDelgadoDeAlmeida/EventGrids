<?php

namespace App\Manager;

use App\Entity\Event;
use App\Enum\EventEnum;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

class EventManager {

    private UserRepository $userRepository;

    function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent, bool $updateContext = false) : array {
        $fields = [];
        $allowedFields = EventEnum::getAvailableChoices();
        $requiredFields = EventEnum::getRequiredFields();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if(in_array($fieldName, $requiredFields) && empty($fieldName)) {
                if($updateContext) {
                    continue;
                }

                throw new \Exception(
                    sprintf("The field '%s' must be filled with a value", $fieldName), 
                    Response::HTTP_FORBIDDEN
                );
            }

            if($fieldName == EventEnum::EVENT_AUTHOR) {
                $user = $this->userRepository->find($fieldValue);
                if(empty($user)) {
                    throw new \Exception("The author couldn't be found", Response::HTTP_NOT_FOUND);
                }

                $fieldValue = $user;
            } elseif($fieldName == EventEnum::EVENT_IMG) {
                if( !($fieldValue instanceof UploadedFile) ) {
                    throw new \Exception("The sended file have an unexpected type. The file must be uploaded.", Response::HTTP_FORBIDDEN);
                }
            } elseif($fieldName == EventEnum::EVENT_TITLE) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception("The event title can't exceed 255 caracters length", Response::HTTP_FORBIDDEN);
                }
            } elseif($fieldName == EventEnum::EVENT_DESCRIPTION) {
                if(empty($fieldValue)) {
                    continue;
                }
            } elseif($fieldName == EventEnum::EVENT_START_AT) {
                $value = new \DateTime($fieldValue);
                if($value == new \DateTime()) {
                    throw new \Exception("The event starting date couldn't be interpreted as a date", Response::HTTP_INTERNAL_SERVER_ERROR);
                }

                $fieldValue = $value;
            } elseif($fieldName == EventEnum::EVENT_END_AT) {
                $value = new \DateTime($fieldValue);
                if($value == new \DateTime()) {
                    throw new \Exception("The event ending date couldn't be interpreted as a date", Response::HTTP_INTERNAL_SERVER_ERROR);
                }

                $fieldValue = $value;
            } elseif($fieldName == EventEnum::EVENT_LOCATION) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception("The event location can't exceed 255 caracters length", Response::HTTP_FORBIDDEN);
                }
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Event
     * @return Event|string
     */
    function fillEvent(array $fields, ?Event $event = new Event()) : Event|string {
        try {
            $currentTime = new \DateTimeImmutable();
            if($event->getId()) {
                $event->setUpdatedAt($currentTime);
            } else {
                $event->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == EventEnum::EVENT_AUTHOR) $event->setAuthor($fieldValue);
                elseif($fieldName == EventEnum::EVENT_IMG) $event->setImgPath($fieldValue);
                elseif($fieldName == EventEnum::EVENT_TITLE) $event->setTitle($fieldValue);
                elseif($fieldName == EventEnum::EVENT_DESCRIPTION) $event->setContent($fieldValue);
                elseif($fieldName == EventEnum::EVENT_START_AT) $event->setStartDate($fieldValue);
                elseif($fieldName == EventEnum::EVENT_END_AT) $event->setEndDate($fieldValue);
                elseif($fieldName == EventEnum::EVENT_LOCATION) $event->setLocation($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $event;
    }
}