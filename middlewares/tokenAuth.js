const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
  const { account, token } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_CLIENT_SECRET);

    if (decodedToken.account == account) return next();
    else res.status(201).json({ error: 'Auth Fail' });
  } catch (error) {
    res.status(201).json({ error: error.message });
  }
};

module.exports = tokenAuth;
