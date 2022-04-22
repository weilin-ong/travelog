const express = require('express');
const cors = require('cors');

const PORT = 3001; //react using default 3000
const hostname = '127.0.0.1';

const app = express();

app.use(cors()).use(express.json());

(() => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://${hostname}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
