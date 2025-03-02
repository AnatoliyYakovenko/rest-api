const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const { DB_HOST } = process.env;
console.log(process.env);

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error.message));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public/avatars"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
