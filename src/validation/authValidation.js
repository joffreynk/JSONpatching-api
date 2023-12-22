exports.authValidation = (username, password, res) => {
  if (!username || !password) {
    return res
      .status(401)
      .json({ error: 'Username and password are required.' });
  }

  if (!/(?=(.*[a-zA-Z]){2,})(?=(.*\d){2,})^[a-zA-Z\d]+$/.test(password)) {
    return res.status(401).json({
      error:
            'Password must contain at least two letters, two numbers, and no special characters.',
    });
  }

  if (username.length < 4) {
    return res
      .status(401)
      .json({ error: 'Username must be at least 4 characters long.' });
  }

  if (!/^[a-zA-Z]+$/.test(username)) {
    return res
      .status(401)
      .json({ error: 'Username must contain only alphabetic letters.' });
  }
};
