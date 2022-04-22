const { mongoose } = require('.');

const pinSchema = new mongoose.Schema({
  place_id: {
    type: String,
    required: true,
  },
  place_name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  images: [String],
  comment: String,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  pins: [pinSchema],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
