import 'dotenv/config';
import { join } from "node:path";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import httpStatus from 'http-status';
import createHttpError from 'http-errors';
import helmet from 'helmet';
import createDebug from 'debug';

const debug = createDebug('bot');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.disable('x-powered-by');

app.use('/api', apiRoutes);

app.get('/', async (req, res) => {
  return res.send('200')
});

app.use(async (req, res, next) => {
  next(createHttpError(httpStatus.NOT_FOUND));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, _req, res, _next) => {
  // @ts-ignore
  const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
  // @ts-ignore
  const message = error.message || httpStatus[statusCode];
// @ts-ignore
  res.status(status).json({
    status,
    message
  });
});


try {
  app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGODB_URL);

    debug(`Server started on port ${process.env.PORT}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}

module.exports = app;