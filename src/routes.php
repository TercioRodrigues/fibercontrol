<?php
use core\Router;

$router = new Router();

$router->get('/home', 'HomeController@index');
$router->get('/', 'HomeController@index');
$router->get('/login', 'LoginController@login');
$router->get('/logout', 'LoginController@logout');