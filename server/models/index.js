const mongoose = require('mongoose');

function connectDB() {
  mongoose
    .connect(process.env.MONGO_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('🏃🏻‍♂️ mongoose is connected');
    })
    .catch((err) => console.log(err));
}

module.exports = { mongoose, connectDB };
