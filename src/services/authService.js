const jwt = require("jsonwebtoken");
const { uuid } = require("uuidv4");

exports.authenticateUser = (username, password) => {
  // Mock: Replace with actual authentication logic
  const token = jwt.sign(
    { username, id: uuid() },
    process.env.JWT_SECKRET_KEY || "KUMENYAVYOKUGORA_SECKRET_KEY",
    {
      expiresIn: "1day",
    }
  );
  return token;
};
