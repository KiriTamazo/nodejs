const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// find this middleware before other request
// require auth for all other routes
router.use(requireAuth);

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
