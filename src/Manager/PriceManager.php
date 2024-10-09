<?php

namespace App\Manager;

use App\Entity\Price;
use App\Entity\PriceDetail;
use App\Enum\PriceEnum;
use Symfony\Component\HttpFoundation\Response;

class PriceManager {

    /**
     * @param array json content
     * @return array fields
     */
    public function checkFields(array $jsonContent, bool $updateContext = false) {
        $fields = [];
        $allowedFields = PriceEnum::getAvailableChoices();
        $requiredFields = PriceEnum::getRequiredFields();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if(in_array($fieldName, $requiredFields) && empty($fieldValue)) {
                if($updateContext) {
                    continue;
                }

                throw new \Exception(
                    sprintf("The field '%s' must be filled", $fieldName), 
                    Response::HTTP_FORBIDDEN
                );
            }

            if($fieldName == PriceEnum::PRICE_OFFER_TYPE) {
                $fieldValue = strtolower($fieldValue);
                
                if(!in_array($fieldValue, PriceEnum::PRICE_ALLOWED_OFFERS_TYPE)) {
                    throw new \Exception(
                        sprintf("The offer type option '%s' isn't allowed", $fieldValue),
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($fieldName == PriceEnum::PRICE_AMOUNT) {
                if(!is_numeric($fieldValue)) {
                    throw new \Exception("The price must be a number", Response::HTTP_FORBIDDEN);
                }

                $fieldValue = floatval($fieldValue);
            } elseif($fieldName == PriceEnum::PRICE_DETAILS) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Price
     * @return Price
     */
    public function fillPrice(array $fields, ?Price $price = new Price()) {
        $currentTime = new \DateTimeImmutable();

        try {
            if($price->getId()) {
                $price->setUpdatedAt($currentTime);
            } else {
                $price->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == PriceEnum::PRICE_OFFER_TYPE) $price->setOfferType($fieldValue);
                elseif($fieldName == PriceEnum::PRICE_AMOUNT) $price->setPrice($fieldValue);
                elseif($fieldName == PriceEnum::PRICE_DETAILS) {
                    // 
                }
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $price;
    }

    /**
     * @param array fields
     * @param ?PriceDetail
     * @return PriceDetail
     */
    public function fillPriceDetail(array $fields, ?PriceDetail $priceDetail = new PriceDetail()) {
        // 
    }
}