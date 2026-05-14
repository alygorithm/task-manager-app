# Task Manager App
Si tratta di un'applicazione full-stack minimal per la gestione di task con autenticazione utenti, calendario e dashboard.

# Obiettivo del progetto
Realizzare una web app containerizzata composta da:
- Interfaccia utente (React)
- Backend REST (Node.js + Express)
- Database relazionale (PostgreSQL)
- Autenticazione JWT
- Orchestrazione tramite Docker Compose

---

## 1. Architettura del progetto

L'applicazione segue una 3-tier architecture:
- **frontend** -> React + Vite (servito da Nginx in profuzione)
- **backend** -> Node.js + Express (API REST)
- **db** -> database PostgreSQL

La comunicazione avviene tramite API REST tra frontend e backend, mentre il backend si occupa di comunicare con il database.

#Diagramma Architetturale
...

---

## 2. Componenti principali
**Frontend (React + Vite + Nginx)**
Responsabilità:
- UI (Dashboard, Calendario, Profilo, Login/Registrazione)
- Gestione stato e chiamate API
- Routing client-side
- Interfaccia responsive

**Backend (Node.js + Express)**
Responsabilità:
- Autenticazione JWT
- Gestione CRUD task
- Validazione input
- Comunicazione con PostgreSQL

Endpoint principali:
- POST /auth/login
- POST /auth/register
...

**Database (PostgreSQL)**
Tabelle:
- users
- tasks

---

## 3. Scelte progettuali
- **React + Vite** -> sviluppo veloce, HMR, build ottimizzata
- **Node.js + Express** -> API REST semplice e modulare
- **PostgreSQL** -> affidabile, relazionale
- **JWT** -> autenticazione stateless
- **Docker Compose** -> ambiente replicabile e portabile
- **Nginx** -> serve la build frontend in produzione

---

# Nota progettuale
L'applicazione è stata progettata come una **minimal web app**, implementa solo le funzionalità essenziali per mostrare un'architettura completa e containerizzata, mantenendo però un design semplice e facilmente estendibile.
L'obiettivo non è la complessità ma la chiarezza, la manutenibilità e la coerenza dell'architetttura, in linea con i requisiti del corso.

---

## 5. Come avviare il progetto con Docker (consigliato)

### 1. Clona il repository

```bash
git clone <repo-url>
cd task-manager-app
```

### 2. Avvia i servizi

```bash
docker compose up --build
```

### 3. Servizi disponibili

- Frontend → http://localhost:5173
- Backend → http://localhost:3000
- Database → localhost:5432

---



