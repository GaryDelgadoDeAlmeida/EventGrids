<?php

namespace App\Enum;

abstract class CommentEnum {

    public const COMMENT_BLOG = "blog";
    public const COMMENT_FULLNAME = "fullname";
    public const COMMENT_EMAIL = "email";
    public const COMMENT_MESSAGE = "content";

    protected array $typename = [
        self::COMMENT_BLOG => "Blog",
        self::COMMENT_FULLNAME => "Fullname",
        self::COMMENT_EMAIL => "Email",
        self::COMMENT_MESSAGE => "Content",
    ];

    public static function getRequiredFields() : array {
        return [
            self::COMMENT_BLOG,
            self::COMMENT_FULLNAME,
            self::COMMENT_EMAIL,
            self::COMMENT_MESSAGE,
        ];
    }

    public static function getAvailableChoices() : array {
        return [
            self::COMMENT_BLOG,
            self::COMMENT_FULLNAME,
            self::COMMENT_EMAIL,
            self::COMMENT_MESSAGE,
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typename[$choice]] = $choice;
        }

        return $choices;
    }
}