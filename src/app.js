require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5005;
const logPath = require("./middlewares/logs_path");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const roomsRoutes = require("./routes/rooms");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});

app.use(logPath);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/rooms", roomsRoutes);

app.use((req, res) => {
  res.status(200).json({
    message: "Server Ok",
  });
});
