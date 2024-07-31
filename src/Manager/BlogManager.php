<?php

namespace App\Manager;

use App\Entity\Blog;
use App\Enum\BlogEnum;

class BlogManager {

    /**
     * @param array json content
     * @return array
     */
    public function checkFields(array $jsonContent) : array {
        $fields = [];
        $allowedFields = BlogEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if($fieldName == BlogEnum::BLOG_AUTHOR) {
                // 
            } elseif($fieldName == BlogEnum::BLOG_TITLE) {
                // 
            } elseif($fieldName == BlogEnum::BLOG_CONTENT) {
                // 
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Blog
     * @return Blog|string
     */
    public function fillBlog(array $fields, ?Blog $blog = new Blog()) : Blog|string {
        $currentTime = new \DateTimeImmutable();
        
        try {
            if($blog->getId()) {
                $blog->setUpdatedAt($currentTime);
            } else {
                $blog->setCreatedAt($currentTime);
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == BlogEnum::BLOG_AUTHOR) $blog->setAuthor($fieldValue);
                elseif($fieldName == BlogEnum::BLOG_TITLE) $blog->setTitle($fieldValue);
                elseif($fieldName == BlogEnum::BLOG_CONTENT) $blog->setContent($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $blog;
    }
}