# Laravel API for the SEKA demo. Served with the PHP built-in server (several workers), port 8001.
FROM php:8.4-cli-bookworm

COPY --from=mlocati/php-extension-installer:2 /usr/bin/install-php-extensions /usr/local/bin/
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
RUN install-php-extensions pdo_pgsql intl zip opcache \
    && printf 'upload_max_filesize=10M\npost_max_size=12M\nmemory_limit=256M\n' > /usr/local/etc/php/conf.d/uploads.ini

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-scripts --no-autoloader --prefer-dist

COPY . .
RUN composer dump-autoload --optimize --no-dev \
    && mkdir -p storage/app/private storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod +x docker/entrypoint.sh

USER www-data
ENV PHP_CLI_SERVER_WORKERS=4
EXPOSE 8001
ENTRYPOINT ["docker/entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8001", "--no-reload"]
