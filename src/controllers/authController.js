const { v4: uuid } = require('uuid');

const authService = require('../services/authService');
const { logger } = require('../utils/logger');
const { authValidation } = require('../validation/authValidation');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    authValidation(username, password, res);
    const token = await authService.authenticateUser(username);
    return res
      .cookie('patchingMicroservice', token, { httpOnly: true })
      .status(200)
      .json({ token, username, userId: uuid() });
  } catch (error) {
    logger.log('debug', error);
    return next(error);
  }
};
