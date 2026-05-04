# Task Manager App
Si tratta di un'applicazione full-stack per la gestione di task con autenticazione utenti, calendario e dashboard.

Il progetto è composto da:
- Frontend: React + Vite
- Backend: Nose.js + Express
- Database: PostgreSQL
- Containerizzazione: Docker + Docker Compose

---

## 1. Architettura del progetto

L'applicazione è strutturata in 3 servizi principali:
- **frontend** -> interfaccia utente (React)
- **backend** -> API REST (Node.js + Express)
- **db** -> database PostgreSQL

La comunicazione avviene tramite API REST tra frontend e backend, mentre il backend si occupa di comunicare con il database.

---

## 2. Tecnologie utilizzate
- React
- Vite
- Node.js
- Express
- PostgreSQL
- Docker
- Docker Compose
- JWT (autenticazione)
- bcrypt (password hashing)

---

## 3. Come avviare il progetto (Docker)

### 1 - Clonare il repository

```bash
git clone <repo-url>
cd task-manager-app
```

### 2 - Avviare i container

```bash
docker compose up --build
```

### 3 - Servizi disponibili

- Frontend → http://localhost:5173
- Backend → http://localhost:3000
- Database → localhost:5432

## 4. Autenticazione

Il backend utilizza JWT per l'autenticazione.
Le route protette richiedono un token nel formato.

```bash
Authorization: Bearer <token>
```

## 5. Funzionalità principali

- Registrazione e login utente
- Creazione task
- Visualizzazione task per giorno
- Calendario mensile con indicatori (puntini)
- Dashboard con riepilogo attività
- Navigazione tramite bottom bar

## 6. Docker
Il progetto è completamente containerizzato.

Servizi:
- PostgreSQL (db)
- Backend Node.js
- Frontend React servito con Nginx

Avvio completo:
```bash
docker compose up --build
```

Stop:
```bash
docker compose down
```

## 7. Struttura Docker Compose

- db -> PostgreSQL 16
- backend -> API Node.js
- frontend -> build React servita con Nginx

## 8. Variabili d'ambiente

Backend: 
```bash
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=taskdb
DB_PORT=5432
JWT_SECRET=your_secret
```