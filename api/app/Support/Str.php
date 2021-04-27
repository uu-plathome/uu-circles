<?php

namespace App\Support;

class Str extends \Illuminate\Support\Str
{
    /**
     * 文字数の超過をした時、...に自動で置き換える
     *
     * @param string|null $text
     * @param int $limit
     * @return string
     */
    public static function limitCharacters(?string $text, int $limit): string
    {
        if (!$text) {
            return '';
        }

        if (mb_strlen($text) > $limit) {
            return mb_substr($text, 0, $limit) . '...' ;
        }

        return $text;
    }
}
