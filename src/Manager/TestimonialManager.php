<?php

namespace App\Manager;

use App\Entity\Testimonial;
use App\Enum\TestimonialEnum;

class TestimonialManager {

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = TestimonialEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == TestimonialEnum::TESTIMONIAL_PHOTO) {
                // 
            } elseif($fieldName == TestimonialEnum::TESTIMONIAL_FIRSTNAME) {
                // 
            } elseif($fieldName == TestimonialEnum::TESTIMONIAL_LASTNAME) {
                // 
            } elseif($fieldName == TestimonialEnum::TESTIMONIAL_JOB) {
                // 
            } elseif($fieldName == TestimonialEnum::TESTIMONIAL_NOTE) {
                // 
            } elseif($fieldName == TestimonialEnum::TESTIMONIAL_COMMENT) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Testimonial testimonial object
     * @return Testimonial
     */
    public function fillTestimonial(array $fields, ?Testimonial $testimonial = new Testimonial()) : Testimonial {
        try {
            if(!$testimonial->getId()) {
                $testimonial->setCreatedAt(new \DateTimeImmutable());
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == TestimonialEnum::TESTIMONIAL_PHOTO) $testimonial->setPhoto($fieldValue);
                elseif($fieldName == TestimonialEnum::TESTIMONIAL_FIRSTNAME) $testimonial->setFirstname($fieldValue);
                elseif($fieldName == TestimonialEnum::TESTIMONIAL_LASTNAME) $testimonial->setLastname($fieldValue);
                elseif($fieldName == TestimonialEnum::TESTIMONIAL_JOB) $testimonial->setJob($fieldValue);
                elseif($fieldName == TestimonialEnum::TESTIMONIAL_NOTE) $testimonial->setNote($fieldValue);
                elseif($fieldName == TestimonialEnum::TESTIMONIAL_COMMENT) $testimonial->setComment($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $testimonial;
    }
}