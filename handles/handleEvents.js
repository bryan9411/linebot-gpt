const { client } = require('../line')
const { createChatCompletion, createImageCompletion } = require('../openai')
const commands = require('../commands')
const { quickReplyWithHelp } = require('.././templates')
const { menuReplyWithHelp } = require('../menuReplyMessages')

const execute = {
	[commands.HELP]: async (event) => {
		const replyText = menuReplyWithHelp
		const message = quickReplyWithHelp()

		await client.replyMessage(event.replyToken, [{ type: 'text', text: replyText }, message])
	},
	[commands.DRAW_IMAGE]: async (event, messageText) => {
		// handle draw image command
		const imageData = await createImageCompletion(messageText.slice(commands.DRAW_IMAGE.length))
		const imageUrl = { type: 'image', originalContentUrl: imageData, previewImageUrl: imageData }

		return client.replyMessage(event.replyToken, imageUrl)
	},
	[commands.EDIT_IMAGE]: async (event) => {
		// handle edit image command
	},
	default: async (event, messageText) => {
		const replyText = await createChatCompletion(messageText)
		const answer = { type: 'text', text: replyText || '出現了一些問題，請耐心等候修正。' }

		return client.replyMessage(event.replyToken, answer)
	},
}

const handleEvents = async (event) => {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null)
	}

	const messageText = event.message.text
	const command = messageText.split(' ')[0]

	const executor = execute[command] || execute.default

	return executor(event, messageText)
}

module.exports = handleEvents
