const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, 'secret-token');
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
}

module.exports = auth;