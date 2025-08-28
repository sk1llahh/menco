# Mentor Challenge API

## Базовая информация
- **Base URL**: `http://localhost:<BACKEND_PORT>/api`
- **Auth**: `Authorization: Bearer <accessToken>`
- **Пагинация**: `?page=<number>&limit=<number>`  
  (по умолчанию `page=1`, `limit=20`, макс `limit=100`)
- **Swagger UI**: `http://localhost:<BACKEND_PORT>/api/docs`

---

## Маршруты

### Auth
- `POST /auth/register` — регистрация
- `POST /auth/login` — логин
- `POST /auth/refresh` — обновить access по refresh (ротация)
- `POST /auth/logout` — инвалидировать конкретный refresh
- `POST /auth/logout-all` — выйти со всех устройств (**Auth**)

### Users
- `GET /users` — список (**Auth**) — фильтры: `q, mode, status`
- `GET /users/:id` — детали (**Auth**)
- `GET /users/me` — свой профиль (**Auth**)
- `PATCH /users/me` — обновить профиль (**Auth**)

### Challenges (+ tasks)
- `GET /challenges` — список (публично) — фильтры: `q, category, level, isPremium`
- `GET /challenges/:id` — детали
- `POST /challenges` — создать (**Auth**)
- `PATCH /challenges/:id` — обновить (**Auth**)
- `DELETE /challenges/:id` — удалить (**Auth**)
- `GET /challenges/:id/tasks` — список задач
- `POST /challenges/:id/tasks` — создать задачу (**Auth**)
- `PATCH /challenges/:id/tasks/:taskId` — обновить (**Auth**)
- `DELETE /challenges/:id/tasks/:taskId` — удалить (**Auth**)

### Enrollments
- `GET /enrollments` — список (**Auth**) — фильтры: `userId, challengeId, isActive`
- `POST /enrollments` — записаться (**Auth**)
- `POST /enrollments/:id/finish` — завершить (**Auth**)

### Progress
- `GET /progress` — список (**Auth**) — фильтры: `userId, taskId, status`
- `PATCH /progress/:id` — обновить статус (**Auth**)

### Chats (+messages, +members)
- `GET /chats` — список (**Auth**) — фильтр: `type=(DIRECT|GROUP)`
- `POST /chats` — создать (**Auth**)
- `GET /chats/:id/messages` — сообщения (**Auth**)
- `POST /chats/:id/messages` — отправить сообщение (**Auth**)
- `GET /chats/:id/members` — участники (**Auth**)
- `POST /chats/:id/members` — добавить участника (**Auth**)

### QnA (questions/answers)
- `GET /qna` — список (фильтры: `q, targetUserId, challengeId, authorId, onlyAnonymous`)
- `GET /qna/:id` — вопрос
- `POST /qna` — создать вопрос (**Auth**)
- `PATCH /qna/:id` — обновить (**Auth**)
- `DELETE /qna/:id` — удалить (**Auth**)
- `GET /qna/:id/answers` — ответы
- `POST /qna/:id/answers` — ответить (**Auth**)
- `PATCH /qna/answers/:answerId` — обновить ответ (**Auth**)
- `DELETE /qna/answers/:answerId` — удалить ответ (**Auth**)

### Sessions (+reviews)
- `GET /sessions` — список (**Auth**) — фильтры: `mentorId, studentId, status, dateFrom, dateTo`
- `POST /sessions` — создать запрос (**Auth**)
- `PATCH /sessions/:id/status` — сменить статус (**Auth**)
- `POST /sessions/:id/review` — отзыв (**Auth**)

### Plans
- `GET /plans` — список — фильтры: `currency, interval, q`
- `GET /plans/:id` — детали
- `POST /plans` — создать (**Auth**)
- `PATCH /plans/:id` — обновить (**Auth**)
- `DELETE /plans/:id` — удалить (**Auth**)

### Subscriptions
- `GET /subscriptions` — список (**Auth**) — фильтры: `userId, isActive`
- `GET /subscriptions/me` — мои активные (**Auth**)
- `POST /subscriptions` — оформить (**Auth**)
- `POST /subscriptions/:id/cancel` — отменить (**Auth**)

### Payments
- `GET /payments` — список (**Auth**) — фильтры: `userId, status, purpose`
- `GET /payments/:id` — детали (**Auth**)
- `POST /payments` — создать (**Auth**)
- `PATCH /payments/:id/status` — обновить статус (**Auth**)

### Notifications
- `GET /notifications` — список (**Auth**) — фильтр: `unreadOnly`
- `POST /notifications/:id/read` — прочитать (**Auth**)
- `POST /notifications/read-all` — прочитать все (**Auth**)

---

## Формат ответа

### Успех (entity)
```json
{
  "success": true,
  "data": { "id": "..." }
}