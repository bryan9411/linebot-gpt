require('dotenv').config()

const line = require('@line/bot-sdk')
const config = require('./config')

const client = new line.Client(config)

module.exports = client
