<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FiberControl — Login</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/fibercontrol.css">
</head>

<body class="login-page">

  <div class="login-card">
    <div class="login-logo">
      <div class="login-logo-badge">🔷</div>
      <h1>FiberControl</h1>
      <p>Monitoramento inteligente de redes PON</p>
    </div>

    <div class="login-hint">
      <strong>Credenciais de teste:</strong><br>
      provedor1 / provedor123<br>
      provedor2 / provedor123<br>
      provedor3 / provedor123
    </div>

    <div class="form-grupo">
      <label for="usuario">Usuário</label>
      <input type="text" id="usuario" placeholder="ex: provedor1" autocomplete="username">
    </div>

    <div class="form-grupo">
      <label for="senha">Senha</label>
      <input type="password" id="senha" placeholder="••••••••••" autocomplete="current-password">
    </div>

    <button class="btn-primario" id="btn-login">Entrar</button>
    <div class="login-erro" id="login-erro"></div>
  </div>

  <?= $render('scripts') ?>
  <script src="/assets/js/pages/login.page.js"></script>
</body>

</html>