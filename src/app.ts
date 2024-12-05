import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHanlder';
import notFoundErrorHandler from './app/middleware/notFoundErrorHandler';
import router from './app/routes';
import { frontendUrl } from './app/configs';

const app = express();

app.use(
  cors({
    origin: [frontendUrl],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes are here in routes/index.ts
app.use('/api/v1', router);

// 404 Not found errors
app.use(notFoundErrorHandler);

// Global error handler
app.use(globalErrorHandler);

export default app;
