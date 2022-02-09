const mysql = require('mysql');
// const config = require('../../config.js')

// process.env.MONGODB_URL = config.database.host;
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'olympic_api',
    debug: false
});

// host: 'localhost',
//     user: 'yktxatjm_olympic_api',
//     password: 'olympic_api',
//     database: 'yktxatjm_olympic_api',

module.exports = pool;