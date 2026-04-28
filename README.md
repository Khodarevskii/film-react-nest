# FILM!

Сервис афиши кинотеатра: просмотр расписания сеансов, выбор мест и бронирование билетов.

## Ссылки

- **Фронтенд:** http://newdom.nomorepartiessite.ru
- **Бэкенд (API):** http://newdom.nomorepartiessite.ru/api/afisha

## Стек

- **Frontend:** React 18, TypeScript, Vite, SCSS
- **Backend:** NestJS, TypeScript, TypeORM
- **Database:** PostgreSQL 16
- **Proxy:** nginx
- **Deploy:** Docker, GitHub Actions

## Запуск через Docker Compose

1. Скопируйте `.env.example` в `.env` и заполните значения:

```bash
cp .env.example .env
```

2. Запустите все сервисы:

```bash
docker compose up -d --build
```

После старта доступны:
- Приложение: http://localhost
- pgAdmin: http://localhost:8080

3. Заполните базу данных через pgAdmin, выполнив SQL-скрипты из `backend/test/`:
   - `prac.init.sql` — создание таблиц
   - `prac.films.sql` — данные о фильмах
   - `prac.shedules.sql` — расписание сеансов

## Локальная разработка

### Бэкенд

```bash
cd backend
cp .env.example .env   # указать данные локальной БД
npm ci
npm run start:dev
```

### Фронтенд

```bash
cd frontend
npm ci
npm run dev
```

## Тесты

```bash
cd backend
npm test
```

## Переменные окружения

Все переменные описаны в `.env.example`. Ключевые параметры:

| Переменная | Описание | Пример |
|---|---|---|
| `DATABASE_HOST` | Хост PostgreSQL | `db` (в Docker) |
| `DATABASE_NAME` | Имя базы данных | `prac` |
| `DATABASE_USERNAME` | Пользователь БД | `practicum` |
| `DATABASE_PASSWORD` | Пароль БД | — |
| `LOGGER` | Формат логов | `dev` / `json` / `tskv` |
| `PGADMIN_DEFAULT_EMAIL` | Email для pgAdmin | `admin@admin.com` |
| `PGADMIN_DEFAULT_PASSWORD` | Пароль pgAdmin | — |
