module.exports.UsersHandler = {
    ...require('./createNewUser'),
    ...require('./gatekeeper'),
    ...require('./login'),
    ...require('./getUsers')
}