<?php

namespace App\Enum;

abstract class TeamEnum {

    public const TEAM_PHOTO = "photo";
    public const TEAM_FIRSTNAME = "firstname";
    public const TEAM_LASTNAME = "lastname";
    public const TEAM_JOB = "job";

    protected array $typeName = [
        self::TEAM_PHOTO => "photo",
        self::TEAM_FIRSTNAME => "firstname",
        self::TEAM_LASTNAME => "lastname",
        self::TEAM_JOB => "job"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::TEAM_PHOTO,
            self::TEAM_FIRSTNAME,
            self::TEAM_LASTNAME,
            self::TEAM_JOB
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