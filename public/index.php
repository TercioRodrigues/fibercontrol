<?php
session_start();
require '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

require '../src/routes.php';

$router->run( $router->routes );