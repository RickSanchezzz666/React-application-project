const { Router } = require('express');
const { Docs } = require('../models/docs');
const { Clients } = require('../models/clients');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = Router();

router.get("/api/login", async (req, res) => {
 const { username, password } = req.query;
 if (!username) {
  return res.status(400).send({
   message: 'Parameter username is required'
  });
 }

 if (!password) {
  return res.status(400).send({
   message: 'Parameter password is required'
  });
 }

 const user = await Docs.findOne({ username });

 if (!user) {
  return res.status(400).send({
   message: 'We not found any user with combination'
  });
 }

 if (user.password !== password) {
  return res.status(401).send({
   message: 'Login or password is invalid'
  });
 }

 const jwtPayload = {
  _id: user._id,
  username: user.username
 };

 const token = jwt.sign(
  jwtPayload,
  process.env.JWT_TOKEN,
  { expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60 * 60 });

 res.status(200).send({ token });
});

router.get("/api/clients", passport.authenticate('jwt', { session: false }), async (req, res) => {

    const dbQuery = {};

    const clients = await Clients.find(dbQuery);
    return res.status(200).send(clients);
});

module.exports = { router };