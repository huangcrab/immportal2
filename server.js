"use strict";

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");

// 1. Create main express intance
const router = express();

// 2. Require utility function for adding middleware
const { applyMiddleware } = require("./utils");

// 3a. Require general middleware
const middleWare = require("./middleware");
// 3b. Require error handling middleware
const errorHandlers = require("./middleware/errorHandlers");

// 4. Require routes
const { router: userRoutes } = require("./routes/users/userRoutes");
const { router: profileRoutes } = require("./routes/profiles/profileRoutes");
const {
  router: employmentRoutes
} = require("./routes/employments/employmentRoutes");
const {
  router: educationRoutes
} = require("./routes/educations/educationRoutes");

const {
  router: applicationRoutes
} = require("./routes/applications/applicationRoutes");

const {
  router: applicationFormRoutes
} = require("./routes/applicationForms/applicationFormRoutes");

// 5. Require conatants
const { PORT } = require("./utils/constants");

// 6. Apply general middleware
applyMiddleware(middleWare, router);

// 7. Utilise routes
router.use("/api/users", userRoutes);
router.use("/api/profiles", profileRoutes);
router.use("/api/employments", employmentRoutes);
router.use("/api/educations", educationRoutes);
router.use("/api/applications", applicationRoutes);
router.use("/api/applicationForms", applicationFormRoutes);

// 8. Apply error handling middleware (meaningfully last)
applyMiddleware(errorHandlers, router);

// 9. Create a server from express instance
const server = http.createServer(router);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// 10. Start server
const { mongoUri } = require("./utils/constants");
mongoose.connect(mongoUri, { useNewUrlParser: true }).then(() => {
  mongoose.set("useFindAndModify", false);
  console.log("Monngodb is connected");
  server.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
    if (process.send) {
      // NOTE: process is being run by pm2
      process.send("ready");
    }
  });
});
