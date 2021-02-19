<?php

namespace Tests\Feature\Traits;

use Lang;

trait HasLang
{
    protected string $fakeKey = 'fakeKey';

    protected array $locales = ['ja'];

    protected function setUpHasLang()
    {
        Lang::setLocale($this->fakeKey);
        Lang::setFallback($this->fakeKey);
    }

    protected function assertHasLang(string $key, string $locale, ?string $message)
    {
        $this->assertTrue(
            Lang::has(
                $key,
                $locale,
                false
            ),
            $message ?? $this->defaultAssertMessage($key, $locale)
        );
    }

    protected function assertHasLangMultipleLocales(string $key, array $locales, ?string $message)
    {
        foreach ($locales as $locale) {
            $this->assertHasLang($key, $locale, $message);
        }
    }

    protected function defaultAssertMessage(string $key, string $locale): string
    {
        return "$locale で $key が存在しません。";
    }
}
