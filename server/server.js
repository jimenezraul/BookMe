const path = require("path");
const express = require("express");
const port = process.env.PORT || 3001;
const cors = require("cors");

require("dotenv").config();

// Initialize the app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use(require("./routes"));

// Serve static files
app.use(express.static(path.resolve(__dirname, "public")));

// Production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
