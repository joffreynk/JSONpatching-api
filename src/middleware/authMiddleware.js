const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: please login.' });
  }

  jwt.verify(
    token,
    process.env.JWT_SECKRET_KEY || 'KUMENYAVYOKUGORA_SECKRET_KEY',
    (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ error: 'Unauthorized user: wrong authentication' });
      }
      req.user = user;
      return next();
    },
  );
};
