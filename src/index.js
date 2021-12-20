const express = require("express");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
} = require("./constants/status_code");
const { ROUNDS } = require("./constants/encrypt");
const app = express();

const { User } = require("./model/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./constants/environment_variables");

app.use(express.json());
app.use(function (err, req, res, next) {
  res.status(INTERNAL_SERVER_ERROR).json({ message: "An error occurred..." });
});

app.get("/", (req, res) => {
  return res.json(new Date());
});

app.get("/user", async (req, res) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(NOT_FOUND).json({ message: "Token not found" });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    return res.json({ userId: payload.userId });
  } catch (err) {
    return res.status(BAD_REQUEST).json({ message: "Invalid token" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(BAD_REQUEST).json({ message: "Missing email" });
  }

  if (!password) {
    return res.status(BAD_REQUEST).json({ message: "Missing password" });
  }

  try {
    const foundUser = await User.findOne({ where: { email } });

    if (bcrypt.compareSync(password, foundUser.password)) {
      const generatedToken = jwt.sign({ userId: foundUser.id }, jwtSecret);
      return res.json({ token: generatedToken });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    return res.status(403).json({ message: "Invalid credentials" });
  }
});

app.post("/register", async (req, res) => {
  let { username, email, password } = req.body;

  if (!username) {
    return res.status(BAD_REQUEST).json({ message: "Missing username" });
  }

  if (!email) {
    return res.status(BAD_REQUEST).json({ message: "Missing email" });
  }

  if (!password) {
    return res.status(BAD_REQUEST).json({ message: "Missing password" });
  }

  password = await bcrypt.hash(password, ROUNDS);

  try {
    const newUser = await User.create({ username, email, password });
    const generatedToken = jwt.sign({ userId: newUser.id }, jwtSecret);
    return res.json({ token: generatedToken });
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("at " + PORT);
});
