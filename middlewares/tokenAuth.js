const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
  const { account, token } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_CLIENT_SECRET);

    if (decodedToken.account == account) return next();
    else res.status(400).json({ message: 'Auth Fail' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = tokenAuth;
