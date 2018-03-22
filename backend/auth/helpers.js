
const bcrypt = require('bcryptjs');

const comparePasswords = (password, passwordDiggest) => {
    return bcrypt.compareSync(password, passwordDiggest);
}

const generatePasswordDigest = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

const loginRequired = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Please log in" });
  }
  return next();
}

module.exports = {
  comparePasswords,
  generatePasswordDigest,
  loginRequired
}
