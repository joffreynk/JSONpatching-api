const express = require("express");
const cors = require("cors");
const authController = require("./controllers/authController");
const jsonPatchController = require("./controllers/jsonPatchController");
const authMiddleware = require("./middleware/authMiddleware");
const { requestLogger } = require("./utils/logger");

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

// Error Handling Middleware
// app.use(errorHandlers.handleValidationError);
// app.use(errorHandlers.handleNotFoundError);
// app.use(errorHandlers.handleServerError);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
