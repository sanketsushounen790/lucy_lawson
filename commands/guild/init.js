import { initRussianRoulette } from "../../mini_games/russianRoulette.js" 
import { initBaiCao } from "../../mini_games/baiCao.js"

const init = {
    name: "init",
    topic: "mini_games",
    commandFormat : "`!init [tên trò chơi]/[tên viết tắt] :`",
    description: "*Khởi tạo mới trò chơi mà người dùng yêu cầu.*",
    args: true,
    authorized: "user",
    execute(message, args, client) {
        switch (args[0]) {
            case "rr":
            case "russian-roulette":
                initRussianRoulette(message)
                break
            case "bc":
            case "bai_cao":
                initBaiCao(message, client)
            default:
                break
        }
    },
}

export default init