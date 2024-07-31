<?php

namespace App\Manager;

use App\Entity\Inbox;
use App\Enum\InboxEnum;

class InboxManager {

    /**
     * @param array sended json body
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = InboxEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == InboxEnum::INBOX_FULLNAME) {
                // 
            } elseif($fieldName == InboxEnum::INBOX_EMAIL) {
                // 
            } elseif($fieldName == InboxEnum::INBOX_MESSAGE) {
                // 
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
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $inbox;
    }
}