<?php

namespace App\Enum;

abstract class InboxEnum {

    public const INBOX_FULLNAME = "fullname";
    public const INBOX_EMAIL = "email_address";
    public const INBOX_MESSAGE = "message";

    protected array $typeName = [
        self::INBOX_FULLNAME => "fullname",
        self::INBOX_EMAIL => "email_address",
        self::INBOX_MESSAGE => "message"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::INBOX_FULLNAME,
            self::INBOX_EMAIL,
            self::INBOX_MESSAGE
        ];
    }

    public function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}