const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

let serviceAccount;

// For deployment: use environment variable
// For local dev: fall back to the JSON file
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = require('../serviceAccountKey.json');
}

const app = initializeApp({
  credential: cert(serviceAccount)
});

// We explicitly tell it to look for the named database 'default'
const db = getFirestore(app, 'default'); 

module.exports = db;