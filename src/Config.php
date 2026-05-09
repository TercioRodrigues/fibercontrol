<?php

namespace src;

class Config
{

    const ERROR_CONTROLLER = 'ErrorController';
    const DEFAULT_ACTION = 'index';

    public static function env($key, $default = null)
    {
        return $_ENV[$key] ?? $default;
    }
}
