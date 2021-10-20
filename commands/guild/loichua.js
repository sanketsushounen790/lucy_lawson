import getGodWords from "../../actions/fetch_apis/getGodWords.js"

const loichua = {
    name: "loichua",
    topic: "God_worship",
    commandFormat: "`!loichua :`",
    description: `*Bot gửi bạn lời Chúa tốt lành ngày hôm nay.* :dove:`,
    args: false,
    authorized: "user",
    execute(message) {
        getGodWords().then(result => {
            const loiChuaChosen = result[Math.floor(Math.random() * result.length)]
            const regex = /'/g
            const loiChua = loiChuaChosen.replace(regex, `"`)

            message.channel.send("🕊" + "`" + loiChua + "`" + "🕊")
        })
    },
}

export default loichua