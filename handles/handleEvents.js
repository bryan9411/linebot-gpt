const { client } = require('../line')
const { createChatCompletion } = require('../openai')

const handleEvents = async (event) => {
	if (event.type !== 'message' || event.message.type !== 'text') {
		// ignore non-text-message event
		return Promise.resolve(null)
	}

	const replyText = await createChatCompletion(event.message.text)

	const answer = { type: 'text', text: replyText || '抱歉，我沒有話可說了。' }

	// use reply API
	return client.replyMessage(event.replyToken, answer)
}

module.exports = handleEvents
