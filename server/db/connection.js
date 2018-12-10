const monk = require('monk')

const db = monk('localhost:27017/app')

module.exports = db