const { client } = require('../line')
const { createChatCompletion, createImageCompletion } = require('../openai')
const commands = require('../commands')

const execute = {
	[commands.HELP]: async (event) => {
		// handle help command
		const helpMessage = `
    您可以使用以下指令來與我互動：

      1. /help: 查看使用教學
      2. /幫畫 [文字]：將輸入的文字生成一張圖片，例如 /幫畫 一隻白色的貓，我會根據您輸入的文字生成一張白色貓的圖片。
      3. /圖片編輯：編輯上一次使用 /幫畫 指令生成的圖片，您可以使用這個指令來對圖片進行一些簡單的編輯，例如添加文字、插入圖片等等。
      
      <---------------------------->
      * 文字圖片生成圖片串接 DALL-E 模型，需要具體描述才可以達到想要效果，可以依照下列幾點建議：
        
      1. 確保 prompt 的語意明確：在 prompt 中使用清晰的語言描述你想要生成的圖像，盡量避免使用模棱兩可的詞語或短語。
      2. 使用具體的提示詞：在 prompt 中使用具體的提示詞，例如顏色、形狀、大小、數量等，以幫助 DALL-E 更好地理解你的要求。
      3. 增加限制條件：在 prompt 中增加限制條件，例如圖像的背景、物體的位置等，以幫助 DALL-E 更好地理解你的要求。

        例如：/幫畫 美麗的海灘風景，包含藍色的海洋、白色的沙灘和綠色的椰樹。(英文版效果比較好)
        <-------------------------------------------------------------------------------->
       
      如若不輸入指令，可使用一般聊天模型進行對話。
    `
		const replyText = await createChatCompletion(helpMessage)
		const answer = { type: 'text', text: replyText || '出現了一些問題，請耐心等候修正。' }
		return client.replyMessage(event.replyToken, answer)
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
		// ignore non-text-message event
		return Promise.resolve(null)
	}

	const messageText = event.message.text
	const command = messageText.split(' ')[0]

	const executor = execute[command] || execute.default

	return executor(event, messageText)
}

module.exports = handleEvents
