#!/bin/bash

# Проверка наличия аргументов
if [ $# -lt 1 ]; then
  echo "Нужно передать параметры port, domain, db_name, db_user и db_password"
  exit 1
fi

# Генерация случайного токена
generate_token() {
  openssl rand -base64 16
}

# Создание файла .env и запись значений
echo "# NODE_ENV=production" > .env

# Объявление переменных
port=""
domain=""
db_name=""
db_user=""
db_password=""

# Парсинг и установка переданных параметров
for param in "$@"; do
  # Разделение ключа и значения
  IFS='=' read -r -a keyValue <<< "$param"

  # Проверка наличия ключа и значения
  if [ ${#keyValue[@]} -eq 2 ]; then
    key=${keyValue[0]}
    value=${keyValue[1]}

    # Обработка специфичных ключей
    case $key in
      port)
        port=$value
        ;;
      domain)
        domain=$value
        ;;
      db_name)
        db_name=$value
        ;;
      db_user)
        db_user=$value
        ;;
      db_password)
        db_password=$value
        ;;
      *)
        # Если ключ не является специфичным, просто добавляем его и значение в файл .env
        echo "$key=$value" >> .env
        ;;
    esac
  fi
done

# Запись специфичных значений в файл .env
if [ -n "$port" ]; then
  echo "# PORT=$port" >> .env
fi

if [ -n "$domain" ]; then
  echo "# DOMAIN=$domain" >> .env
  echo "# ADMIN_URL=https://$domain/octo" >> .env
  echo "# SERVER_URL=https://$domain/strapi" >> .env
  echo "" >> .env
  echo "CORS_ORIGIN=http://localhost:1337,http://localhost:3000,https://$domain" >> .env
fi

if [ -n "$db_name" ]; then
  echo "" >> .env
  echo "# Database" >> .env
  echo "DATABASE_NAME=$db_name" >> .env
  echo "DATABASE_USERNAME=$db_user" >> .env
  echo "DATABASE_PASSWORD=$db_password" >> .env
fi

echo "" >> .env

# Генерация токенов
APP_KEYS=$(generate_token),$(generate_token),$(generate_token),$(generate_token)
JWT_SECRET=$(generate_token)
ADMIN_JWT_SECRET=$(generate_token)
API_TOKEN_SALT=$(generate_token)
TRANSFER_TOKEN_SALT=$(generate_token)

# Запись сгенерированных токенов в файл .env
echo "APP_KEYS=$APP_KEYS" >> .env
echo "JWT_SECRET=$JWT_SECRET" >> .env
echo "ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET" >> .env
echo "API_TOKEN_SALT=$API_TOKEN_SALT" >> .env
echo "TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT" >> .env

echo "The .env file has been created successfully."
