const passport = require('passport');
const User = require('../models/user');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'Email address is already registered' });
    }

    const user = new User({ name, email });
    user.setPassword(password);
    await user.save();

    return res.status(201).json({ token: user.generateJWT() });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to register user' });
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return res.status(500).json({ message: 'Authentication failed' });
    }

    if (!user) {
      return res.status(401).json(info);
    }

    return res.status(200).json({ token: user.generateJWT() });
  })(req, res);
};

module.exports = { register, login };