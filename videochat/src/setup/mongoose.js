const mongoose = require('mongoose');


const setupDb = async (mongoURL) => {
    switch (process.env.MONGO_DB_AUTH) {
     case 'link': {
        const connect = await mongoose.connect(mongoURL);
        connect.connection.addListener('connect', () => {
            console.log('MongoDB was connected')
        });
    
        connect.connection.addListener('error', (err) => {
            console.error('Error on mongo connection', err);
           });
    
        return connect;
     }
     case 'login': {
      await mongoose.connect(mongoURL, {
       auth: {
        username: process.env.MONGO_DB_LOGIN,
        password: process.env.MONGO_DB_PASSWORD,
       }
      });
      console.log('mongoose was connected');
      break;
     }
     default: {
      throw new Error(`Can not to connection to mongoDB by MONGO_DB_AUTH:${process.env.MONGO_DB_AUTH}`);
     }
    }
};

module.exports = { setupDb };