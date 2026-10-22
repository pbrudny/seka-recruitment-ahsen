#!/bin/sh
set -e

php artisan config:clear
php artisan migrate --force

# Fictional demo data (idempotent: firstOrCreate). Needs APP_ENV=local and database seka_laravel_dev.
if [ "${SEED_DEMO_DATA:-true}" = "true" ]; then
    php artisan db:seed --class=RecruitmentDemoSeeder --force || echo "Demo seed skipped."
fi

exec "$@"
