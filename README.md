# MongoDB Lab Practicals (Set A: A1 & A3) — Fullstack JavaScript Project

A unified **Node.js + Express + MongoDB + Vanilla JS** fullstack web application covering:

1. **Scenario A1 — Online Store Inventory Update (`shopDB.products`)**: `$set`, `$inc`, `$unset`, `replaceOne`, `deleteOne`, `deleteMany`, and `$match` / `$group` / `$sort` aggregation pipeline.
2. **Scenario A3 — Employee Directory: Speeding up Searches with Indexes (`companyDB.employees`)**: `explain("executionStats")` (`COLLSCAN` vs `IXSCAN`), single-field index (`dept_1`), compound index (`dept_1_salary_-1`), multikey index (`skills_1`), `hideIndex` / `unhideIndex`, unique index error (`E11000` on `city`) & valid unique index (`name_1`), and `getIndexes()`.

---

## Project Structure

```text
mongodb-lab-a1-a3-fullstack/
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── server.js                              # Express server (Live MongoDB + Simulation fallback)
├── routes/
│   ├── products.js                        # Scenario A1 API endpoints (Tasks 1–7 + reset + custom add)
│   └── employees.js                       # Scenario A3 API endpoints (Tasks 1–7 + reset)
├── scripts/
│   ├── scenario-a1-products.mongosh.js    # Standalone mongosh script for Scenario A1
│   └── scenario-a3-employees.mongosh.js   # Standalone mongosh script for Scenario A3
└── public/
    ├── index.html                         # Fullstack interactive lab dashboard
    ├── styles.css                         # UI styling
    └── app.js                             # Frontend controller
```

---

## Quick Start

```bash
npm install
cp .env.example .env
npm start
```

Open **http://localhost:3000** in your browser.

- **Auto Mode (default)**: If local MongoDB (`mongodb://127.0.0.1:27017`) is running, the backend executes real queries via the official `mongodb` Node.js driver. If MongoDB is not running, it automatically runs in **Simulation / Preview Mode** so every task and `explain` plan can be tested immediately.

### Standalone `mongosh` Scripts
```bash
mongosh < scripts/scenario-a1-products.mongosh.js
mongosh < scripts/scenario-a3-employees.mongosh.js
```
