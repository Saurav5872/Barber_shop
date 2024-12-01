const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser()
);

//Imported Routes
app.use("/api", userRoutes);
app.use("/api", serviceRoutes);
app.use("/api", appointmentRoutes);

//Deployment
// if (process.env.NODE_ENV === "development") {
// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// Catch-all handler for all other routes, returning the React index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
// }
//  else {
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

//Connect To Database
connectDB()
  .then(() => {
    // Start server after successfully connecting to the database
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Terminates the process if the database connection fails
  });
