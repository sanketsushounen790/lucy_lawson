//commands
import loichua from "./loichua.js"
import nuoc from "./nuoc.js"
import img from "./img.js"
import lol from "./lol.js"
import pick from "./pick.js"
import advise from "./advise.js"
import ava from "./ava.js"
import init from "./init.js"

const commands = [
	loichua,
	nuoc,
	img,
	lol,
	pick,
	advise,
	ava,
	init
]

const miniGames = [
	{
		index: 1,
		name: "russian_roulette (rr)"
	},
	{
		index: 2,
		name: "bai_cao (bc)"
	}
]

const guildInstructions = commands.map(command => {
	switch (command.topic) {
		case "God_worship":
			return (
				`**KINH THÁNH CÔNG GIÁO**\n${command.commandFormat} ${command.description}\n\n`
			)
			break
		case "others_genesis":
			return (
				`**CÁC LỆNH CỦA SERVER**\n${command.commandFormat} ${command.description}\n`
			)
			break
		case "mini_games":
			return miniGames.map(miniGame => { 
				if(miniGame.name === "russian_roulette (rr)") {
					return `**MINI GAMES**\n${command.commandFormat} ${command.description}\n\n***Danh sách tên các trò chơi:***\n${miniGame.index}: ${miniGame.name}`
				} else {
					return `\n${miniGame.index}: ${miniGame.name}`
				}
			})
			break
		default:
			return `${command.commandFormat} ${command.description}\n`
			break
	}
})

const help = {
	name: "help",
	topic: "instruction",
	commandFormat : "`!help :`",
	description: "*Hiển thị bảng hướng dẫn sử các lệnh*",
	args: false,
    authorized: "user",
	execute(message) {
		/* console.log(guildInstructions) */
		message.channel.send(guildInstructions)
	},
}

export default help