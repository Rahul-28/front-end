import Participant from "../models/participants.model.js";

export const getAllParticipants = async (req, res, next) => {
  try {
    const allParticipants = await Participant.find({});
    res.status(200).json(allParticipants);
  } catch (err) {
    next(err);
  }
};

export const createParticipant = async (req, res, next) => {
  try {
    const createdParticipant = await Participant.create(req.body);
    res.status(201).json(createdParticipant);
  } catch (err) {
    next(err);
  }
};

export const getParticipantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundParticipant = await Participant.findById(id);
    res.status(200).json(foundParticipant);
  } catch (err) {
    next(err);
  }
};

export const deleteParticipantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedParticipant = await Participant.findByIdAndDelete(id);
    if (!deletedParticipant) {
      res.status(404).json({ message: "Participant does not exist" });
    }
    res.status(200).json({ message: "Participant Removed successfully" });
  } catch (err) {
    next(err);
  }
};

export const updateParticipantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const participant = await Participants.findByIdAndUpdate(id, req.body);
    if (!participant) {
      res.status(404).json({ message: "Participant does not exist" });
    }
    const updatedParticipant = await Participant.findById(id);
    if (updatedParticipant) {
      res.status(200).json(updatedParticipant);
    }
  } catch (err) {
    next(err);
  }
};
