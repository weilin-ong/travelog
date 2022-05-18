import mongoose from 'mongoose'


const dbURL =
  process.env.MONGO_ATLAS_URL || 'mongodb://127.0.0.1:27017/travkerdb';

function connectDB() {
  mongoose
    .connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('🏃🏻‍♂️ mongoose is connected');
    })
    .catch((err) => console.log(err));
}

export default { mongoose, connectDB };
