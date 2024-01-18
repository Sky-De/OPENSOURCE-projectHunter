import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/auth.js';
import 'dotenv/config.js';

const port = process.env.PORT;

const corsOptions = {
  AccessControlAllowOrigin: '*',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', authRouter);

function makeServer() {
  return app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export { makeServer };
