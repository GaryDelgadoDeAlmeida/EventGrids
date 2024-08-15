<?php

namespace App\Enum;

abstract class ServiceEnum {

    public const SERVICE_IMG = "imgPath";
    public const SERVICE_TITLE = "title";
    public const SERVICE_DESCRIPTION = "description";

    protected static array $typeName = [
        self::SERVICE_IMG => "Img",
        self::SERVICE_TITLE => "Title",
        self::SERVICE_DESCRIPTION => "Description",
    ];

    public static function getAvailableChoices() : array {
        return [
            self::SERVICE_IMG,
            self::SERVICE_TITLE,
            self::SERVICE_DESCRIPTION,
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