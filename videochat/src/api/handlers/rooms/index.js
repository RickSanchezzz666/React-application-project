module.exports.RoomsHandler = {
    ...require('./createRoom'),
    ...require('./deleteRoom'),
    ...require('./roomPassVerify'),
    ...require('./roomVerify'),
    ...require('./showAvailableRooms')
}