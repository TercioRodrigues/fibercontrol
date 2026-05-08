<?php

namespace src\controllers;

use \core\Controller;

class ApiController extends Controller
{
    private bool $UsuarioLogado;

    public function __construct()
    {
        
    }
    public function index()
    {
        $this->render('home', []);
    }
}
