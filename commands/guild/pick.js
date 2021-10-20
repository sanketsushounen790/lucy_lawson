const randomPick = (args) => {
    if(args.includes("hay")){
        const arr = args.join(" ").split(" hay ")
        return arr[Math.floor(Math.random() * arr.length)]
        
    } else {
        const arr = args.join(" ").split(" or ")
        return arr[Math.floor(Math.random() * arr.length)]
    }
}

const pick = {
    name: "pick",
    topic: "others",
    commandFormat : "`!pick [lựa chọn 1] hay [lựa chọn 2]... hay [lựa chọn n] :`",
    description: `*Bot chọn ngẫu nhiên giữa các lựa chọn được đưa ra. Các lựa chọn phân cách nhau bằng chữ "hay".*`,
    args: true,
    authorized: "user",
    execute(message, args) {
        const botAnswers = [
            {
                prefix: "Dĩ nhiên là",
                suffix: "rồi !"
            },
            {
                prefix: "Of course",
                suffix: "my friend !"
            },
            {
                prefix: "Đương nhiên là",
                suffix: "rồi còn gì nữa !"
            },
        ]
        const randomBotAnswer = botAnswers[Math.floor(Math.random() * botAnswers.length)]
        message.reply(`${randomBotAnswer.prefix} ${randomPick(args)} ${randomBotAnswer.suffix}`)
    },
}

export default pick