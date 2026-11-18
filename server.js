require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');

const createProductsRouter = require('./routes/products');
const createEmployeesRouter = require('./routes/employees');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_MODE = (process.env.APP_MODE || 'auto').toLowerCase();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbState = {
  mode: 'simulation',
  client: null
};

async function initConnection() {
  if (APP_MODE === 'simulation') {
    console.log('[Mode] Running in forced SIMULATION mode.');
    return;
  }
  try {
    const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    dbState.client = client;
    dbState.mode = 'live';
    console.log(`[MongoDB] Connected at ${MONGO_URI} (LIVE)`);
  } catch (err) {
    if (APP_MODE === 'live') {
      console.error('[MongoDB] Failed to connect in LIVE mode:', err.message);
    } else {
      console.log('[MongoDB] Unavailable; using SIMULATION mode.');
    }
  }
}

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    appMode: APP_MODE,
    mode: dbState.mode,
    uri: MONGO_URI
  });
});

app.use('/api/products', createProductsRouter(dbState));
app.use('/api/employees', createEmployeesRouter(dbState));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

initConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`\nMongoDB Lab (A1 & A3) Server running at http://localhost:${PORT}`);
    console.log(`Active Mode: ${dbState.mode.toUpperCase()}\n`);
  });
});
