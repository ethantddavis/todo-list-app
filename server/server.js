require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const transactionsRouter = require('./routes/transactions');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to database"));

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use('/transactions', transactionsRouter);

app.listen(3000, () => console.log("Server Started"));