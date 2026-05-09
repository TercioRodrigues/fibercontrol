<?php
session_start();
require '../vendor/autoload.php';

$envPath = dirname(__DIR__) . '/.env';

if (file_exists($envPath)) {
    $dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
    $dotenv->load();
}

require '../src/routes.php';

$router->run( $router->routes );