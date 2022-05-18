import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';
import router from './router';

let PORT: string | number | undefined = process.env.PORT; //env from heroku
if (PORT == null || PORT == '') {
  PORT = 3001;
}

const { connectDB } = require('./models/index');
const hostname = '127.0.0.1';

const app: Application = express();
const corsConfig = {
  origin: process.env.CLIENT_URL || 'http://127.0.0.1:3000',
  credentials: true,
  methods: ['GET,PUT,PATCH,POST,DELETE'],
};

app.get('/', (req, res) => {
  res.send('App is running');
});

app
  .use(cors(corsConfig))
  .use(express.json())
  .use(router)
  .get('*', (req, res) => {
    res.status(404).send('Sorry, page not found');
  });

(() => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://${hostname}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
