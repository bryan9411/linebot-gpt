const openai = require('./api')

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
	// console.log('data', data)
	console.log('choices', choices)
	return choices.message.content.trim()
}

module.exports = createChatCompletion
