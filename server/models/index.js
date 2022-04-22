const mongoose = require('mongoose');

function connectDB() {
  mongoose
    .connect('mongodb://127.0.0.1:27017/travkerdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('🏃🏻‍♂️ mongoose is connected');
    })
    .catch((err) => console.log(err));
}

module.exports = { mongoose, connectDB };
