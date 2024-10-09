<?php

namespace App\Manager;

use App\Entity\Comment;
use App\Enum\CommentEnum;
use App\Repository\BlogRepository;
use Symfony\Component\HttpFoundation\Response;

class CommentManager {

    private BlogRepository $blogRepository;

    function __construct(BlogRepository $blogRepository) {
        $this->blogRepository = $blogRepository;
    }

    /**
     * @param array json content
     * @param bool if is an update context
     * @return array
     */
    public function checkFields(array $jsonContent, bool $updateContext = false) : array {
        $fields = [];
        $allowedFields = CommentEnum::getAvailableChoices();
        $requiredFields = CommentEnum::getRequiredFields();

        foreach($jsonContent as $fieldName => $fieldValue) {
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            if(in_array($fieldName, $requiredFields) && empty($fieldValue)) {
                if($updateContext) {
                    continue;
                }

                throw new \Exception(
                    sprintf("The field '%s' must be filled with a value", $fieldName)
                );
            }

            if($fieldName == CommentEnum::COMMENT_FULLNAME) {
                if(strlen($fieldValue) > 255) {
                    throw new \Exception("The fullname field can't exceed 255 caracters length", Response::HTTP_FORBIDDEN);
                }
            } elseif($fieldName == CommentEnum::COMMENT_EMAIL) {
                if(!filter_var($fieldValue, FILTER_VALIDATE_EMAIL)) {
                    throw new \Exception(
                        sprintf("The email '%s' isn't a valide email", $fieldValue),
                        Response::HTTP_FORBIDDEN
                    );
                }
            } elseif($fieldName == CommentEnum::COMMENT_BLOG) {
                $blog = $this->blogRepository->find($fieldValue);
                if(empty($blog)) {
                    throw new \Exception("The blog couldn't be found", Response::HTTP_NOT_FOUND);
                }

                $fieldValue = $blog;
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param ?Comment
     * @return Comment
     */
    public function fillComment(array $fields, ?Comment $comment = new Comment()) : Comment {
        try {
            if(!$comment->getId()) {
                $comment->setCreatedAt(new \DateTimeImmutable());
            }

            foreach($fields as $fieldName => $fieldValue) {
                if($fieldName == CommentEnum::COMMENT_BLOG) $comment->setBlog($fieldValue);
                elseif($fieldName == CommentEnum::COMMENT_FULLNAME) $comment->setFullname($fieldValue);
                elseif($fieldName == CommentEnum::COMMENT_EMAIL) $comment->setEmail($fieldValue);
                elseif($fieldName == CommentEnum::COMMENT_MESSAGE) $comment->setComment($fieldValue);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $comment;
    }
}