<?php

namespace App\Manager;

use App\Entity\User;

class UserManager {

    /**
     * @param array json content
     * @param bool Is an update context
     * @return array
     */
    public function checkFields(array $jsonContent, bool $updateContext = false) : array {
        $fields = [];

        return $fields;
    }

    /**
     * @param array fields
     * @param ?User user
     * @return User
     */
    public function fillUser(array $fields, ?User $user = new User()) : User {
        try {
            if(!$user->getId()) {
                $user->setCreatedAt(new \DateTimeImmutable());
            }

            foreach($fields as $fieldName => $fieldValue) {
                // 
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $user;
    }
}