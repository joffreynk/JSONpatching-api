const express = require("express");
const cors = require("cors");
const authController = require("./controllers/authController");
const jsonPatchController = require("./controllers/jsonPatchController");
const authMiddleware = require("./middleware/authMiddleware");
const { requestLogger, logger } = require("./utils/logger");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(requestLogger);

app.post("/login", authController.login);;
app.post(
  "/patchjson",
  authMiddleware.authenticateJWT,
  jsonPatchController.applyJsonPatch
);;

// app.use(errorHandlers.handleValidationError);
// app.use(errorHandlers.handleNotFoundError);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.log("debug", `Server is running on port ${PORT}`);
});
