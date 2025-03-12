import Event from "../models/events.model.js";

export const getAllEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find({});
    res.status(200).json(allEvents);
  } catch (err) {
    next(err);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundEvent = await Event.findById(id);
    res.status(200).json(foundEvent);
  } catch (err) {
    next(err);
  }
};

export const deleteEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      res.status(404).json({ message: "Event does not exist" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const createdEvent = await Event.create(req.body);
    res.status(201).json(createdEvent);
  } catch (err) {
    next(err);
  }
};

export const updateEventById = async (req, res, next) => {
  try {
    const event = await Payments.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!event) {
      res.status(404).json({ message: "Event does not exist" });
    }
    const updatedEvent = await Event.findById(id);
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    }
  } catch (err) {
    next(err);
  }
};
