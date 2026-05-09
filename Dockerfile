FROM php:8.2-apache

# Instala extensões
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Habilita rewrite
RUN a2enmod rewrite

# Define public como raiz
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Atualiza Apache
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf

RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Copia config personalizada
COPY docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html