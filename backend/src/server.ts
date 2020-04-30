import 'reflect-metadata';

import express, { json, Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import routes from './routes';

import './database';

const app = express();

app.use(json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

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

app.listen(3333, () => console.log('🚀 => server running in: localhost:3333'));

