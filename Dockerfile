FROM php:8.2-apache

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl

# Extensões PHP
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Habilita rewrite
RUN a2enmod rewrite

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Diretório da aplicação no Render
WORKDIR /opt/render/project/src

# Copia arquivos
COPY . .

# Instala dependências PHP
RUN composer install --no-dev --optimize-autoloader

# DocumentRoot
ENV APACHE_DOCUMENT_ROOT /opt/render/project/src/public

# Ajusta Apache
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf

RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# VirtualHost customizado
COPY docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf