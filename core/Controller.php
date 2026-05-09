<?php

namespace core;

use \src\Config;

class Controller
{

    protected function redirect(string $url)
    {
        header("Location: " . $this->getBaseUrl() . $url);
        exit;
    }

    private function getBaseUrl()
    {
        $base = (isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) == 'on') ? 'https://' : 'http://';
        $base .= $_SERVER['HTTP_HOST'];
        $base .= Config::BASE_DIR;

        return $base;
    }

    private function _render(string $folder, string $viewName, array $viewData = [])
    {
        if (file_exists('../src/views/' . $folder . '/' . $viewName . '.php')) {
            extract($viewData);
            $render = fn($vN, $vD = []) => $this->renderPartial($vN, $vD);
            $base = $this->getBaseUrl();
            require dirname(__DIR__) . '/src/views/' . $folder . '/' . $viewName . '.php';
        }
    }

    private function renderPartial(string $viewName, $viewData = [])
    {
        $this->_render('partials', $viewName, $viewData);
    }

    public function render(string $viewName, $viewData = [])
    {
        $this->_render('pages', $viewName, $viewData);
    }
}
