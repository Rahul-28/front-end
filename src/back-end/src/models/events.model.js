import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (coords) => coords.length === 2,
        message: "Coordinates must be an array of [longitude, latitude]",
      },
    },
  },
  adminClearence: { type: Boolean, required: true, default: false },
  category: { type: String, required: true },
  ticketsAvailable: { type: Number, required: true },
  price: { type: Number, required: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
