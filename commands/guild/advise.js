const advise = {
    name: "advise",
    topic: "others",
    commandFormat : "`!advise [câu hỏi] :`",
    description: `*Bot đưa ra lời khuyên "có" hoặc "không" cho câu hỏi.*`,
    args: false,
    authorized: "user",
    execute(message) {
        const ans = ["Có", "Không", "Có cực mạnh", "Éo"]
        message.reply(ans[Math.floor(Math.random() * ans.length)])
    },
}

export default advise