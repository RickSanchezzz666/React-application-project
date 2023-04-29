const { Users } = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
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
}