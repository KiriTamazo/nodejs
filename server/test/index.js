const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
// connect with react
const cors = require("cors");

// follwing function must use bcz frontend return json data and in order to access in node use express.json() function
app.use(express.json());

app.use(cors());

mongoose.set("strictQuery", false);
// to connect with Mongo Db
mongoose.connect(
  "mongodb+srv://tama80:tama80@cluster0.3ifrs0t.mongodb.net/nodejs?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// HTTP Requests
app.get("/getUser", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/addUser", async (req, res) => {
  // data return from frontend
  const data = new UserModel(req.body);
  const user = await data.save();

  res.json(user);
});

app.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  const data = await UserModel.deleteOne(req.params);
  res.json(data);
});
app.put("/:id", async (req, res) => {
  console.log(req.params.id);
  const data = await UserModel.updateOne(req.params, { $set: req.body });
  res.json(data);
});

app.listen(8080, () => {
  console.log("server run perfectly");
});
