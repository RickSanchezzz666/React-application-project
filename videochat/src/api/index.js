const { Router } = require('express')

const UsersAPI = require('./users.api');                         // Авторизація користувачів
const RoomsAPI = require('./rooms.api');
const AppointmentsAPI = require('./appointments.api');

const router = Router();

router.use(UsersAPI.router);
router.use(RoomsAPI.router);
router.use(AppointmentsAPI.router);

module.exports = { router };