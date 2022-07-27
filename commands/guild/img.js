import getPhotosData from "../../actions/fetch_apis/getPhotosData.js"

const img = {
    name: "img",
    topic: "others_genesis",
    commandFormat: "`!img [từ khóa] :`",
    description: `*Bot đưa ra 10 tấm ảnh liên quan đến từ khóa của bạn.*`,
    args: true,
    authorized: "user",
    execute(message, args) {
        getPhotosData(args).then(data => {
            data.map(e => {
                message.channel.send(e.url)
            })
        })
    },
}

export default img