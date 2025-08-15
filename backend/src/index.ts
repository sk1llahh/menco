import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import createHttpError from 'http-errors';
import helmet from 'helmet';
import createDebug from 'debug';
import apiRoutes from './routes';

interface ExpressError extends Error {
  status?: number;
}

const debug = createDebug('bot');
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.disable('x-powered-by');

app.use('/api', apiRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(httpStatus.NOT_FOUND));
});

app.use(
  (error: ExpressError, _req: Request, res: Response, _next: NextFunction) => {
    const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[status];
    res.status(status).json({
      status,
      message,
    });
  },
);

app.listen(process.env.PORT, () => {
  debug(`Server started on port ${process.env.PORT}`);
})

export default app;
