const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
// get all
const getWorkouts = async (req, res) => {
  // find all data and sort latest date to show first
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

// get one
const getWorkout = async (req, res) => {
  const { id } = req.params;
  //   default mongodb id must be 32bit or otherwise
  // it will cause internal error(in the terminal )

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  const workout = await Workout.findById(id);

  //   return error if not found
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// post
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyField = [];
  if (!title) {
    emptyField.push("title");
  }
  if (!load) {
    emptyField.push("load");
  }
  if (!reps) {
    emptyField.push("reps");
  }
  if (emptyField.length > 0) {
    return res
      .status(404)
      .json({ error: "Please fill in all the fields", emptyField });
  }

  //add doc to db
  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such workout" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No Such workout" });
  }
  res.status(200).json(workout);
};

// update
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
