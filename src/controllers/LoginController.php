<?php

namespace src\controllers;

use \core\Controller;

class LoginController extends Controller
{
    public function login()
    {
        $this->render('login', []);
    }

    public function logout()
    {
        session_destroy();
        session_reset();
        $this->redirect('/login');
    }
}
