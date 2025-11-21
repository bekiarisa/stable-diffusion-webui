import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import apiRouter from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers.js';

export function createServer() {
  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: false
    })
  );
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : '*';
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true
    })
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 180,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Blue Ocean Grid backend operational' });
  });

  app.use('/api', apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  const app = createServer();
  app.listen(PORT, () => {
    console.log(`B.O.G backend listening on port ${PORT}`);
  });
}
