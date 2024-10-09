<?php

namespace App\Manager;

use App\Entity\Inbox;
use App\Enum\InboxEnum;
use Symfony\Component\HttpFoundation\Response;

class InboxManager {

    /**
     * @param array sended json body
     * @return array
     */
    public function checkFields(array $jsonContent, bool $updateContext = false) : array {
        $fields = [];
        $allowedFields = InboxEnum::getAvailableChoices();
        $requiredFields = InboxEnum::getRequiredFields();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if(in_array($fieldName, $requiredFields) && empty($fieldValue)) {
                if($updateContext) {
                    continue;
                }

                throw new \Exception(
                    sprintf("The field '%s' can't be empty. It must be filled with a value", $fieldName),
                    Response::HTTP_FORBIDDEN
                );
            }

            if($fieldName == InboxEnum::INBOX_FULLNAME) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception(
                        sprintf("The '%s' field can't exceed 255 caracters length", $fieldName), 
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($fieldName == InboxEnum::INBOX_EMAIL) {
                if(!filter_var($fieldValue, FILTER_VALIDATE_EMAIL)) {
                    throw new \Exception(
                        sprintf("The email '%s' isn't a valide email", $fieldValue),
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($fieldName == InboxEnum::INBOX_MESSAGE) {
                // 
            } elseif($fieldName == InboxEnum::INBOX_IS_READ) {
                if($fieldValue !== 0 && $fieldValue !== 1) {
                    continue;
                }

                $fieldValue = boolval($fieldValue);
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Inbox
     * @return Inbox
     */
    public function fillInbox(array $fields, ?Inbox $inbox = new Inbox()) : Inbox {
        try {
            if(!$inbox->getId()) {
                $inbox->setCreatedAt(new \DateTimeImmutable());
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == InboxEnum::INBOX_FULLNAME) $inbox->setFullname($fieldValue);
                elseif($fieldName == InboxEnum::INBOX_EMAIL) $inbox->setEmailAddress($fieldValue);
                elseif($fieldName == InboxEnum::INBOX_MESSAGE) $inbox->setMessage($fieldValue);
                elseif($fieldName == InboxEnum::INBOX_IS_READ) $inbox->setRead($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $inbox;
    }
}