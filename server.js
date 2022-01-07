const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const connectToDb = require("./db");

const usersRoutes = require("./routes/users");
const authRouts = require("./routes/auth");

dotenv.config({ path: "./.env" }); // Load config
connectToDb(); // db connection

const app = express();

//#region Middleware
app.use(cors());
app.use(logger); // Init logger

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRouts);

//#endregion

app.get("/", function (req, res) {
  res.send("Hello world!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
