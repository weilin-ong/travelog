const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
const PORT = 3001;
const { connectDB } = require('./models/index');
const hostname = '127.0.0.1';

const app = express();
const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

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
