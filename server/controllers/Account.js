/* eslint-disable no-unused-vars */
const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
// eslint-disable-next-line no-unused-vars

//makes sure all fields have been filled out
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(400).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.toAPI(account);
    return res.json({ redirect: '/books' });
  });
};

//makes sure entries match
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({});
  }
  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/books' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username is already in use' });
    }
    return res.status(500).json({ error: 'an error occurred' });
  }
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
};
