<?php

namespace App\Enum;

abstract class InboxEnum {

    public const INBOX_FULLNAME = "fullname";
    public const INBOX_EMAIL = "email_address";
    public const INBOX_MESSAGE = "message";
    public const INBOX_IS_READ = "is_read";

    protected array $typeName = [
        self::INBOX_FULLNAME => "Fullname",
        self::INBOX_EMAIL => "Email address",
        self::INBOX_MESSAGE => "Message",
        self::INBOX_IS_READ => "Is read"
    ];

    public static function getRequiredFields() : array {
        return [
            self::INBOX_FULLNAME,
            self::INBOX_EMAIL,
            self::INBOX_MESSAGE
        ];
    }

    public static function getAvailableChoices() : array {
        return [
            self::INBOX_FULLNAME,
            self::INBOX_EMAIL,
            self::INBOX_MESSAGE,
            self::INBOX_IS_READ
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