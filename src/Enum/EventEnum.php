<?php

namespace App\Enum;

abstract class EventEnum {

    public const EVENT_AUTHOR = "author";
    public const EVENT_IMG = "img_path";
    public const EVENT_TITLE = "title";
    public const EVENT_DESCRIPTION = "description";
    public const EVENT_START_AT = "start_date";
    public const EVENT_END_AT = "end_date";
    public const EVENT_LOCATION = "location";

    protected static array $typename = [
        self::EVENT_AUTHOR => "Author",
        self::EVENT_IMG => "IMG",
        self::EVENT_TITLE => "Title",
        self::EVENT_DESCRIPTION => "Description",
        self::EVENT_START_AT => "Start at",
        self::EVENT_END_AT => "End at",
        self::EVENT_LOCATION => "Event location"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::EVENT_AUTHOR,
            self::EVENT_IMG,
            self::EVENT_TITLE,
            self::EVENT_DESCRIPTION,
            self::EVENT_START_AT,
            self::EVENT_END_AT,
            self::EVENT_LOCATION,
        ];
    }

    public static function getRequiredFields() {
        return [
            self::EVENT_AUTHOR,
            self::EVENT_TITLE,
            self::EVENT_START_AT,
            self::EVENT_END_AT,
            self::EVENT_LOCATION,
        ];
    }

    public static function getChoices() {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typename[$choice]] = $choice;
        }

        return $choices;
    }
}