import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

// create application
const app = express();

// midlewares
app.use(cors());
app.use(json());
app.use(rateLimiter);

// static folder
app.use('/files', express.static(uploadConfig.uploadsFolder));

// routes
app.use(routes);

// celebrate validation errors
app.use(errors());

// global errors
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server Error',
  });
});

// run
app.listen(process.env.PORT, () =>
  console.log(`🚀 => server running in: localhost:${process.env.PORT}`),
);
