# FiberControl

Sistema inteligente de monitoramento preventivo para redes GPON desenvolvido como Projeto Integrador do curso de Redes de Computadores.

---

# Sobre o Projeto

O FiberControl é uma plataforma web desenvolvida para auxiliar provedores de internet no monitoramento preventivo de redes FTTH/GPON.

O sistema foi criado com o objetivo de identificar degradações e falhas ópticas antes que o cliente final perceba o problema, reduzindo chamados técnicos e melhorando a qualidade do serviço prestado.

A plataforma realiza monitoramento em tempo real das ONUs conectadas às OLTs, exibindo:

* status das ONUs;
* potência óptica RX/TX;
* alertas automáticos;
* dashboard operacional;
* histórico de sinal;
* simulação de falhas.

---

# Objetivo

Desenvolver uma solução inteligente para monitoramento preventivo de redes GPON, permitindo que provedores de internet identifiquem problemas de sinal óptico de forma proativa.

---

# Funcionalidades

* Dashboard em tempo real
* Monitoramento de ONUs
* Alertas automáticos
* Classificação de status
* Monitoramento de sinal óptico
* Simulação de falhas
* Arquitetura modular
* Sistema multi-provedor
* Interface responsiva
* Preparado para integração SNMP
* Preparado para integração WhatsApp
* Configuração de thresholds

---

# Tecnologias Utilizadas

## Frontend

* HTML5
* CSS3
* JavaScript
* Chart.js

## Backend

* PHP

## Infraestrutura

* Docker
* Apache
* Render.com

## Versionamento

* Git
* GitHub

---

# Arquitetura do Projeto

```text
/assets
 ├── css
 ├── js
 │   ├── core
 │   ├── modules
 │   ├── pages
 │   └── simulacao
 └── imagens
```

O sistema utiliza arquitetura modular para facilitar:

* manutenção;
* escalabilidade;
* separação de responsabilidades;
* futuras integrações.

---

# Conteinerização com Docker

O sistema foi adaptado para execução em container Docker devido à limitação de suporte nativo ao PHP tradicional na plataforma Render.com.

A utilização de Docker permitiu:

* padronização do ambiente;
* facilidade de deploy;
* portabilidade;
* compatibilidade entre ambientes;
* execução em nuvem.

---

# Deploy Online

Sistema hospedado em nuvem utilizando Render.com.

```text
https://SEU-LINK-RENDER.onrender.com
```

---

# Repositório

```text
https://github.com/TercioRodrigues/fibercontrol
```

---

# Prints do Sistema

## Tela de Login

<img width="580" height="679" alt="Captura de tela de 2026-05-08 14-50-22" src="https://github.com/user-attachments/assets/6f53c4d1-3e0f-4b87-b9fe-27700f92a2fa" />


---

## Dashboard Principal

<img width="1337" height="952" alt="Captura de tela de 2026-05-08 15-36-22" src="https://github.com/user-attachments/assets/a4192390-e7ca-4ca1-8e42-f3f69aff8748" />


---

## Monitoramento de ONUs

<img width="1324" height="787" alt="Captura de tela de 2026-05-08 15-39-58" src="https://github.com/user-attachments/assets/e1940b6d-6425-40c4-9e6a-ffbda739ebf5" />


---

## Sistema de Alertas

<img width="1334" height="664" alt="Captura de tela de 2026-05-08 15-39-16" src="https://github.com/user-attachments/assets/4e833522-6a00-4e7e-b0a7-0491fbb51659" />


---

## Configurações

<img width="777" height="375" alt="Captura de tela de 2026-05-08 19-50-45" src="https://github.com/user-attachments/assets/cf125895-1a44-407f-86cc-049846e28d6f" />


---

# Futuras Implementações

* Integração SNMP real
* Integração com OLTs
* Integração WhatsApp
* Notificações automáticas
* Histórico avançado
* Aplicativo mobile
* Sistema de tickets
* Integração com banco de dados real

---

# Objetivos Acadêmicos

Este projeto foi desenvolvido para aplicação prática dos conhecimentos adquiridos nas disciplinas:

* Redes Convergentes
* Redes Sem Fio
* Segurança da Informação
* Sistemas Distribuídos
* Computação em Nuvem
* Roteadores e Roteamento

---

# Autor

Tércio Rodrigues Feitosa

Projeto Integrador III – Redes de Computadores

---

# Licença

Projeto desenvolvido para fins acadêmicos.
