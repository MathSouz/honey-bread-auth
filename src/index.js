const express = require("express");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} = require("./constants/StatusCode");
const app = express();

const { User } = require("./model/user");

app.use(express.json());
app.use(function (err, req, res, next) {
  res.status(INTERNAL_SERVER_ERROR).json({ message: "An error occurred..." });
});

app.get("/", (req, res) => {
  return res.json(new Date());
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(BAD_REQUEST).json({ message: "Missing username" });
  }

  if (!email) {
    return res.status(BAD_REQUEST).json({ message: "Missing email" });
  }

  if (!password) {
    return res.status(BAD_REQUEST).json({ message: "Missing password" });
  }

  try {
    User.create({ username, email, password });
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("at " + PORT);
});
