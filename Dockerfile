FROM php:8.2-apache

# Instala extensões necessárias
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Habilita mod_rewrite
RUN a2enmod rewrite

# Define diretório da aplicação no Render
WORKDIR /opt/render/project/src

# Ajusta DocumentRoot para a pasta public
ENV APACHE_DOCUMENT_ROOT /opt/render/project/src/public

# Atualiza configuração do Apache
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf

RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Configuração customizada do Apache
COPY docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf