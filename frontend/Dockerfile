# Dev-режим: React + Tailwind + hot-reload
FROM node:18-alpine

# Створюємо робочу директорію
WORKDIR /app

# Копіюємо лише package файли для кешу
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо все (код, стилі)
COPY . .

# Відкриваємо порт для React dev-сервера
EXPOSE 3000

# Запускаємо npm start
CMD ["npm", "start"]