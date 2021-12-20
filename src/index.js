const express = require("express");
const app = express();

const { User } = require("./model/user");

app.use(express.json());

app.get("/", (req, res) => {
  return res.json(new Date());
});

app.listen(4000, () => {
  console.log("aaa");
});
