const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name to the event"],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating for an event"],
  },
  description: {
    type: String,
    required: [true, "Please provide event with description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide event with price"],
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;