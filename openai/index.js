const openai = require('./api')

// 基本聊天模型
const createChatCompletion = async (question) => {
	const { data } = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: question,
			},
		],
		max_tokens: process.env.MAX_TOKENS,
	})
	const [choices] = data.choices

	console.log('生成回答%:', choices)
	return choices.message.content.trim()
}

// 文字生成圖像 串接 DALL
const createImageCompletion = async (question) => {
	const response = await openai.createImage({
		prompt: question,
		n: 1,
		size: '1024x1024',
	})

	console.log('文字生成圖片%:', response.data.data)
	const imageUrl = response.data.data[0].url

	return imageUrl
}
module.exports = { createChatCompletion, createImageCompletion }
