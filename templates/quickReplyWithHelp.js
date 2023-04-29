// 快速回覆模板
const quickReplyWithHelp = () => {
	return {
		type: 'text',
		text: '點選下方範例嘗試 ！',
		quickReply: {
			items: [
				{
					type: 'action',
					action: {
						type: 'message',
						label: '/幫畫 美麗的海灘風景',
						text: '/幫畫 美麗的海灘風景',
					},
				},
				{
					type: 'action',
					action: {
						type: 'message',
						label: '/編輯圖片',
						text: '/編輯圖片',
					},
				},
				{
					type: 'action',
					action: {
						type: 'message',
						label: '/退出',
						text: '/退出',
					},
				},
			],
		},
	}
}

module.exports = quickReplyWithHelp
