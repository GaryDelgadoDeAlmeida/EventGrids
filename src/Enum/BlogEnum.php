<?php

namespace App\Enum;

abstract class BlogEnum {

    public const BLOG_AUTHOR = "author";
    public const BLOG_TITLE = "title";
    public const BLOG_CONTENT = "content";

    protected array $typeName = [
        self::BLOG_AUTHOR => "Author",
        self::BLOG_TITLE => "Title",
        self::BLOG_CONTENT => "Content",
    ];

    public static function getAvailableChoices() : array {
        return [
            self::BLOG_AUTHOR,
            self::BLOG_TITLE,
            self::BLOG_CONTENT
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}