<?php

namespace core;

use \src\Config;

class Database
{
    private static \PDO $_pdo;
    public static function getInstance()
    {
        if (!isset(self::$_pdo)) {
            self::$_pdo = new \PDO(Config::env('DB_DRIVER') . ":dbname=" . Config::env('DB_DATABASE') . ";host=" . Config::env('DB_HOST'), Config::env('DB_USER'), Config::env('DB_PASS'));
        }
        return self::$_pdo;
    }

    private function __construct() {}
    private function __clone() {}
    public function __wakeup() {}
}
