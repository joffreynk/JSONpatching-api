const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

exports.authenticateUser = (username) => {
  const token = jwt.sign(
    { username, id: uuid() },
    process.env.JWT_SECKRET_KEY || 'KUMENYAVYOKUGORA_SECKRET_KEY',
    {
      expiresIn: '1day',
    },
  );
  return token;
};
