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

## 9. Architettura del sistema
# Struttura generale
L'applicazione è composta da una classica architettura a 3 livelli (3-tier architecture), containerizzata tramite Docker:
- Frontend -> interfaccia utente
- Backend -> logica applicativa e API REST
- Database -> persistenza dei dati

# Diagramma architetturale

```mermaid
flowchart LR

U[Utente] --> F[Frontend React + Vite (Nginx)]

F -->|HTTP REST API| B[Backend Node.js + Express]

B -->|SQL queries| D[(PostgreSQL)]

```

# Descrizione dei componenti
1. Frontend (React + Vite + Nginx)
Il frontend è sviluppato in React e costruito tramite Vite. In fase di produzione viene servito tramite un container Nginx statico.

Responsabilità principali:
- gestione dell'interfaccia utente
- navigazione tra le pagine (Dashboard, Calendario, Profilo)
- comunicazione con il backend tramite chiamate HTTP (fetch/axios)

Il frontend non comunica mai direttamente con il database ma passa sempre dal backend.

2. Backend (Node.js + Express)
Il backend implementa un'API REST sviluppata in Node.js con Express.

Responsabilità principali:
- gestione logica dell'applicazione
- autenticazione (token JWT)
- gestione task (CRUD)
- comunicazione con PostgreSQL

Il backend espone endpoint come:
- /tasks
- /login
- eventuali endpoint protetti tramite token

3. Database (PostgreSQL)
Il database PostgreSQL è utilizzato per la persistenza dei dati.

Contiene principalmente:
- utenti
- task
- eventuali relazioni tra entità

Il database è isolato in un container Docker e non è esposto direttamente al client, ma solo al backend.

# Flusso dei dati
Il flusso principale dell’applicazione è il seguente:

1 - L’utente interagisce con il frontend
2 - Il frontend invia richieste HTTP al backend
3 - Il backend valida e processa la richiesta
4 - Il backend esegue query SQL sul database
5 - Il database restituisce i dati al backend
6 - Il backend invia la risposta al frontend
7 - Il frontend aggiorna l’interfaccia utente

# Containerizzazione
Lintero sistema è orchestrato tramite Docker Compose, che definisce 3 servizi: 
- frontend -> container Nginx con build React
- backend -> container Node.js
- db -> container PostgreSQL

I container comunicano tra di loro tramite una rete interna Docker. Il backend accede al database usando il nome del servizio db come host.

## 10. Nota progettuale
E' stata scelta questa architettura poichè separa chiaramente: 
- presentazione (frontend)
- logica (backend)
- dati (database)

Utilizzando questo approccio avremo dei miglioramenti riguardo:
- scalabilità
- manutenibilità
- isolamento dai servizi