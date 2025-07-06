import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import NotFound from './app/middleware/notFound';

export const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Router
app.use('/api', router);

app.use(globalErrorHandler);

app.use(NotFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
