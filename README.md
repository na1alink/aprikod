# Трекер задач с подзадачами

## Обзор

Это приложение для отслеживания задач, написанное с использованием Vite, TypeScript, React, MobX и SCSS. Приложение позволяет создавать задачи, добавлять к ним подзадачи, помечать их как выполненные, редактировать задачи и удалять их. Все изменения сохраняются локально в хранилище браузера, что обеспечивает сохранение состояния при перезагрузке страницы

## Возможности

- **Создание задач**: Создавайте новые задачи с заголовками.
- **Управление подзадачами**: Добавляйте подзадачи к существующим задачам.
- **Статус выполненных задач**: Помечайте задачи и подзадачи как выполненные.
- **Редактирование задач**: Редактируйте заголовки задач.
- **Удаление задач**: Удаляйте задачи и подзадачи.
- **Сохранение состояния**: Изменения сохраняются в локальном хранилище, поэтому они сохраняются после перезагрузки страницы.

## Используемые технологии

- **Vite**: Быстрый инструмент сборки для современной веб-разработки.
- **TypeScript**: Язык программирования, который добавляет статическую типизацию к JavaScript.
- **React**: Популярная библиотека для создания пользовательских интерфейсов.
- **MobX**: Библиотека для управления состоянием приложения.
- **SCSS**: Расширение CSS с поддержкой переменных, вложенных правил и других удобных функций.

## Установка и запуск

### Требования

- Установленный [Node.js](https://nodejs.org/) версии 14 или выше.
- Установленный [npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/).

### Установка зависимостей

1. Клонирование репозитория

`git clone https://github.com/na1alink/aprikod`

2. Переход в директорию aprikod

`cd aprikod`

3. Установка зависимостей

`npm install`

4. Запуск сервера разработки

`npm run dev`



## Доступные скрипты

### `npm run dev`
Запуск сервера разработки, для локальной разработки

### `npm run build`
Сначала выполняется сборка TypeScript, чтобы убедиться, что все типы правильно проверены и скомпилированы. Затем Vite собирает приложение для продакшена, оптимизируя и минифицируя код

### `npm run preview`
Запускает локальный сервер для предпросмотра собранного приложения
