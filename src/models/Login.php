<?php

namespace src\models;

use \core\Model;
use src\models\Usuarios;

class Login extends Model
{
    public static function verificarLogin(): bool
    {
        if (!empty($_SESSION['usuarioLogado'])) {
            return true;
            exit;
        }
        return false;
    }

    public static function fazerLogin(string $email, string $senha, string $dominio): bool
    {
        $resultado = false;
        $usuario = Usuarios::select([
            'usuarios.id',
            'usuarios.nome',
            'usuarios.empresa_id',
            'usuarios.senha',
            'empresas.dominio'
        ])
            ->join('empresas', 'usuarios.empresa_id', '=', 'empresas.id')
            ->where('usuarios.email', $email)
            ->where('empresas.dominio', $dominio)
            ->where('usuarios.ativo', 'sim')->execute();
        if (count($usuario) > 0) {
            if (password_verify($senha, $usuario[0]['senha'])) {
                $_SESSION['usuarioLogado'] = $usuario[0]['id'];
                $_SESSION['usuario_nome'] = $usuario[0]['nome'];
                $_SESSION['empresa_id'] = $usuario[0]['empresa_id'];
                $_SESSION['avisos'] = [];
                $resultado = true;
            }
        }
        return $resultado;
    }
}
