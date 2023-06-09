// PACKAGE
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

// MODULE
import { httpLogStream } from './utils/index.js';
import { userRouter, productRouter, orderRouter, authRouter, viewRouter } from './routers/index.js';
import { errorHandler } from './middlewares/index.js';

const app = express();

// ENV
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

process.chdir(rootDir);
dotenv.config();
process.chdir(__dirname);

const port = process.env.PORT || 3000;

// DB
mongoose.connect(process.env.DB_KEY);
const db = mongoose.connection;

db.on('connected', () => console.log('Connecting DB Success'));
db.on('error', (err) => console.error(err));

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(rootDir + '/public')); // public 폴더 접근
app.use(morgan('dev', { stream: httpLogStream })); // Log 생성기

// ROUTER
app.use(viewRouter);
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', authRouter);
app.use(errorHandler);

// app.listen(port, process.env.HOST, () => {
app.listen(port, () => {
  console.log(`Connected to ${port}...`);
});

export { app, __dirname as srcPath };
