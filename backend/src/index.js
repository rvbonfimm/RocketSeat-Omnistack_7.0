const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

const server = require("http").Server(app); // Http protocol support
const io = require("socket.io")(server); // Web socket protocol support - Send/Receive requests to all connected users

mongoose.connect(
  "mongodb+srv://rvbonfimm:rogerioo4265416@@mongodbtestcluster-ebeim.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Allow all applications (mobile, front-end - react, react-native) to access this backend services
app.use(cors());

// Set static path for the resized files
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes.js"));

server.listen(3333);
