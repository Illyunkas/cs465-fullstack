var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Trip name is required'],
      trim: true,
      minlength: [3, 'Trip name must be at least 3 characters'],
    },
    image: {
      type: String,
      required: [true, 'Trip image path is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Trip description is required'],
      trim: true,
      minlength: [10, 'Trip description must be at least 10 characters'],
    },
    tags: {
      type: String,
      required: [true, 'Trip tags are required'],
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Trip price is required'],
      trim: true,
      match: [/^\$\d+/, 'Trip price must start with $ and include a number'],
    },
    date: {
      type: String,
      required: [true, 'Trip date is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Trip', tripSchema);
