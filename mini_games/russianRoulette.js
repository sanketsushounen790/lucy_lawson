//russian roulette props
const russianRouletteProps = {
    shoots: -1,
    gameStatus: false,
    count: 0,
    chances: [0, 1, 2, 3, 4, 5],
    killShoot: 7,
}

export const runRussianRoulette = (message) => {
    if (russianRouletteProps.gameStatus) {
        russianRouletteProps.shoots -= 1
        russianRouletteProps.count += 1
        if (russianRouletteProps.shoots >= 0) {
            if (russianRouletteProps.shoots == russianRouletteProps.killShoot) {
                message.reply(`Phát thứ ${russianRouletteProps.count}: O - RIP (End Game)`)
                message.reply(`Xong game gõ lệnh "!init rr" hoặc "!init russian-roulette" để tiếp tục`)
                russianRouletteProps.gameStatus = false
                russianRouletteProps.shoots -= 5
            } else {
                message.reply(`Phát thứ ${russianRouletteProps.count}: X - Không có đạn`)
                message.reply(`Còn ${russianRouletteProps.shoots} lượt`)
                russianRouletteProps.gameStatus = true
            }
        }
    } else if (!russianRouletteProps.gameStatus) {
        message.reply(`Hãy gõ lệnh "!init rr" hoặc "!init russian-roulette" để khởi tạo trò chơi`)
    }
}

export const initRussianRoulette = (message) => {
    russianRouletteProps.killShoot = russianRouletteProps.chances[Math.floor(Math.random() * russianRouletteProps.chances.length)]
    russianRouletteProps.gameStatus = true
    russianRouletteProps.shoots = 5
    russianRouletteProps.count = 0

    message.reply(`Súng đã lên nòng: ${russianRouletteProps.shoots += 1} lượt bắn - 1 viên đạn`)
    message.reply("Cho coi tỉ lệ 1 lần test nè: ")

    for (let i = 0; i <= russianRouletteProps.killShoot; i++) {
        if (i == russianRouletteProps.killShoot) {
            message.channel.send(`Phát số ${i + 1} : O - RIP (End Game)`)
        } else {
            message.channel.send(`Phát số ${i + 1} : X - Không có đạn`)
        }
    }

    message.reply(`Dám chơi thì gõ "click"`)
}


