const { Router } = require('express');
const { Users } = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = Router();

router.post("/api/login", async (req, res) => {
 try {
  const { user_info: { login, password } } = req.body;
  if (!login) {
   return res.status(400).send({
    message: 'Parameter login is required'
   });
  }

  if (!password) {
   return res.status(400).send({
    message: 'Parameter password is required'
   });
  }

  const user = await Users.findOne({ "user_info.login": login });

  if (!user) {
   return res.status(400).send({
    message: 'We not found any user with combination'
   });
  }

  if (user.user_info.password !== password) {
   return res.status(401).send({
    message: 'Login or password is invalid'
   });
  }

  const token = jwt.sign(
    {
        _id: user._id,
        username: user.user_info.login
    },
   process.env.JWT_TOKEN,
   { expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60 * 60 });

  res.status(200).send({ token });
 } catch (err) {
  console.error(err);
  res.status(500).send({
   message: 'Internal server error'
  });
 }
});

router.get("/api/users", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { email, phone, name, surname, gender, access_level, createdBy, creationTime, birthday, address, city, country, zipcode, blood_type } = req.query;
    const dbQuery = {
    };
    if (req.user.user_info.access_level === 30) {
        if (email) {
            dbQuery["user_info.email"] = email;
        }
        if (phone) {
            dbQuery["user_info.phone"] = phone;
        }
        if (name) {
            dbQuery["user_info.name"] = name;
        }
        if (surname) {
            dbQuery["user_info.surname"] = surname;
        }
        if (gender) {
            dbQuery["user_info.gender"] = gender;
        }
        if (access_level) {
            dbQuery["user_info.access_level"] = access_level;
        }
        if (createdBy) {
            dbQuery["user_info.createdBy"] = createdBy;
        }
        if (creationTime) {
            dbQuery["user_info.creationTime"] = creationTime;
        }
        if (birthday) {
            dbQuery["user_info.birthday"] = birthday;
        }
        if (address) {
            dbQuery["location_info.address"] = { $regex: address, $options: 'i' };
        }
        if (city) {
            dbQuery["location_info.city"] = city;
        }
        if (country) {
            dbQuery["location_info.country"] = country;
        }
        if (zipcode) {
            dbQuery["location_info.zipcode"] = zipcode;
        }
        if (blood_type) {
            dbQuery["patient_info.blood_type"] = blood_type;
        }
        const users = await Users.find(dbQuery);
        return res.status(200).send(users);
    };
    if (req.user.user_info.access_level === 25) {
        const users = await Users.find({ user_info: { email, phone, name, surname, access_level: 20, createdBy, creationTime, birthday }, location_info: { address, city, country, zipcode }, patient_info: { blood_type } });
        return res.status(200).send(users);
    } else {
        return res.status(403).send('Your access level is not enough');
    };
});

router.get("/api/gatekeeper", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { user_info: { name, surname, profile_pic, access_level } } = req.user;
    return res.status(200).json({ name, surname, profile_pic, access_level });
});

router.post("/api/create-new-user", passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.user_info.access_level === 30) {
        const { user_info: { email, phone, name, surname, login, password, profile_pic, access_level, createdBy, creationTime, birthday, gender }, location_info: { address, city, country, zipcode }, patient_info: { overall, blood_type } } = req.body;
        const newUser = new Users({ user_info: { email, phone, name, surname, login, password, profile_pic, access_level, createdBy, creationTime, birthday, gender }, location_info: { address, city, country, zipcode }, patient_info: { overall, blood_type } });
        try {
            await newUser.save();
            return res.status(200).send();
        } catch (err) {
            res.status(500).send({ message: 'Internal server error' });
        };
    } if (req.user.user_info.access_level === 25) {
        const { user_info: { email, phone, name, surname, login, password, profile_pic, createdBy, creationTime, birthday, gender }, location_info: { address, city, country, zipcode }, patient_info: { overall, blood_type } } = req.body;
        const newUser = new Users({ user_info: { email, phone, name, surname, login, password, profile_pic, createdBy, creationTime, birthday, gender }, location_info: { address, city, country, zipcode }, patient_info: { overall, blood_type } });
        try {
            await newUser.save();
            return res.status(200).send();
        } catch (err) {
            res.status(500).send({ message: 'Internal server error' });
        };
    } else {
        return res.status(403).send('Your access level is not enough');
    };
});

module.exports = { router };