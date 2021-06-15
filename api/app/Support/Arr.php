<?php

namespace App\Support;

use Illuminate\Support\Arr as SupportArr;
use Illuminate\Support\Str;

class Arr extends SupportArr
{
    /**
     * key名をキャメルケースに変更.
     *
     * @param array $array
     *
     * @return array
     */
    public static function camel_keys(array $array): array
    {
        $results = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $results[Str::camel($key)] = static::camel_keys($value);
            } else {
                $results[Str::camel($key)] = $value;
            }
        }

        return $results;
    }

    /**
     * key名をスネークケースに変更.
     *
     * @param array  $array
     * @param string $delimiter
     *
     * @return array
     */
    public static function snake_keys(array $array, string $delimiter = '_'): array
    {
        $results = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $results[Str::snake($key, $delimiter)] = static::snake_keys($value, $delimiter);
            } else {
                $results[Str::snake($key, $delimiter)] = $value;
            }
        }

        return $results;
    }
}
