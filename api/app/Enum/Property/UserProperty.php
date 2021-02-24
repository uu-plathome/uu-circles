<?php

namespace App\Enum\Property;

use App\Enum\Property\BaseProperty;

class UserProperty extends BaseProperty
{
    const username = 'username';
    const display_name = 'display_name';
    const email = 'email';
    const email_verified_at = 'email_verified_at';
    const password = 'password';
    const active = 'active';
    const api_token = 'api_token';
    const remember_token = 'remember_token';
}
