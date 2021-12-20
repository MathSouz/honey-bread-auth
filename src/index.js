const express = require("express");
const app = express();

const { User } = require("./model/user");

app.use(express.json());

app.get("/", (req, res) => {
  return res.json(new Date());
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("at " + PORT);
});
