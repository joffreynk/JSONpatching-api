const authService = require("../services/authService");
const { uuid } = require("uuidv4");

exports.login = async (req, res, next) => {
  try {
    const { username, password } =   req.body;
    const token = await authService.authenticateUser(username, password);
    return res
      .cookie("patchingMicroservice", token, { httpOnly: true })
      .status(200)
      .json({ token, username, userId: uuid() });
  } catch (error) {
    next(error);
  }
};
