<?php

namespace App\Manager;

use App\Entity\Service;
use App\Enum\ServiceEnum;
use Symfony\Component\HttpFoundation\Response;

class ServiceManager {

    /**
     * @param array json content
     * @return array fields
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = ServiceEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == ServiceEnum::SERVICE_IMG) {
                // 
            } elseif($fieldName == ServiceEnum::SERVICE_TITLE) {
                if(empty($fieldValue)) {
                    throw new \Exception(
                        printf("The field '%d' must be filled", $fieldName), 
                        Response::HTTP_FORBIDDEN
                    );
                }

                if(strlen($fieldValue) > 255) {
                    throw new \Exception(
                        printf("The field '%s' value can't exceed 255 caracters length", $fieldName),
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($fieldName == ServiceEnum::SERVICE_DESCRIPTION) {
                if(empty($fieldValue)) {
                    continue;
                }
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Service
     * @return Service|string
     */
    public function fillService(array $fields, ?Service $service = new Service()) : Service|string {
        try {
            if(!$service->getId()) {
                $service
                    ->setImgPath("")
                    ->setCreatedAt(new \DateTimeImmutable());
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == ServiceEnum::SERVICE_IMG) {}
                elseif($fieldName == ServiceEnum::SERVICE_TITLE) $service->setTitle($fieldValue);
                elseif($fieldName == ServiceEnum::SERVICE_DESCRIPTION) $service->setDescription($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $service;
    }
}