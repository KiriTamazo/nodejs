const express = require("express");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
// format the data return from react into json format
app.use(express.json());

// Https request routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose.set("strictQuery", false);
// connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // Listener
    app.listen(process.env.PORT, () => {
      console.log(`connect to the db & listening on port `, process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
