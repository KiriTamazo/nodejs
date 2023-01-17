const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// get all
router.get("/", getWorkouts);

// get single
router.get("/:id", getWorkout);

// post
router.post("/", createWorkout);

// delete
router.delete("/:id", deleteWorkout);

// update
router.patch("/:id", updateWorkout);

module.exports = router;
