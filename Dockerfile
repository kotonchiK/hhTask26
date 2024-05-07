# Используем образ Node.js для сборки приложения
FROM node:14 AS builder

# Установка рабочей директории для этапа сборки
WORKDIR /src/app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN yarn install

# Копируем исходные файлы приложения
COPY . .

# Компиляция TypeScript в JavaScript и сохранение в папку dist
RUN yarn run build

# Второй этап для запуска приложения
FROM node:14

# Установка рабочей директории для этапа запуска
WORKDIR /app

# Копируем скомпилированные JavaScript файлы из предыдущего этапа (dist)
COPY --from=builder /src/app/dist ./dist

# Копируем файлы зависимостей (необходимо только для продакшн сборки)
COPY --from=builder /src/app/node_modules ./node_modules

# Экспортируем порт, на котором работает ваше приложение
EXPOSE 3000

# Команда для запуска вашего приложения из скомпилированного JavaScript
CMD ["node", "dist/index.js"]
