<?php

namespace App\Enum;

abstract class PriceEnum {

    public const PRICE_OFFER_TYPE = "offerType";
    public const PRICE_AMOUNT = "price";
    public const PRICE_DETAILS = "details";

    public const PRICE_ALLOWED_OFFERS_TYPE = [
        "regular",
        "business",
        "premium"
    ];

    protected static array $typename = [
        self::PRICE_OFFER_TYPE => "Offer type",
        self::PRICE_AMOUNT => "Price",
        self::PRICE_DETAILS => "Details",
    ];

    public static function getRequiredFields() : array {
        return [
            self::PRICE_OFFER_TYPE,
            self::PRICE_AMOUNT,
            self::PRICE_DETAILS
        ];
    }

    public static function getAvailableChoices() : array {
        return [
            self::PRICE_OFFER_TYPE,
            self::PRICE_AMOUNT,
            self::PRICE_DETAILS
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