require('dotenv').config()

const express = require('express')
const line = require('@line/bot-sdk')

const handleEvents = require('./handles')
const { config } = require('./line')

const app = express()

// 使用 line 中間件
app.post('/webhook', line.middleware(config), (req, res) => {
	Promise.all(req.body.events.map(handleEvents))
		.then((result) => res.json(result))
		.catch((err) => {
			console.error(err)
			res.status(500).end()
		})
})

// listen on port
const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`listening on ${port}`)
})
