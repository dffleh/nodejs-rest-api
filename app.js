const express = require("express");
const logger = require("morgan");

const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const { authRouter } = require("./routes/api/auth");
const userRouter = require("./routes/api/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("hfhfjdjd", err);
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({ message: err.message });
});

module.exports = app;
