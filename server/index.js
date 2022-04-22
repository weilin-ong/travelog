const express = require('express');
const cors = require('cors');
const router = require('./router');
const PORT = 3001;
const { connectDB } = require('./models/index');
const hostname = '127.0.0.1';

const app = express();

app.use(cors()).use(express.json()).use(router);

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
