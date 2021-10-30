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
		name: "russian_roulette (rr)",
		syntax: ""
	},
	{
		index: 2,
		name: "bai_cao (bc)",
		syntax: `@[tên người chơi 1] @[tên người chơi 2]... @[tên người chơi n]`
	}
]

const guildInstructions = commands.map(command => {
	switch (command.topic) {
		case "God_worship":
			return (
				`**KINH THÁNH CÔNG GIÁO**\n${command.commandFormat} ${command.description}\n\n`
			)
		case "others_genesis":
			return (
				`**CÁC LỆNH CỦA SERVER**\n${command.commandFormat} ${command.description}\n`
			)
		case "mini_games":
			return miniGames.map(miniGame => { 
				if(miniGame.name === "russian_roulette (rr)") {
					return `**MINI GAMES**\n${command.commandFormat} ${command.description}\n\n***Danh sách tên các trò chơi:***\n${miniGame.index}: ${miniGame.name}`
				} else {
					return `\n${miniGame.index}: ${miniGame.name} ${miniGame.syntax}`
				}
			})
		default:
			return `${command.commandFormat} ${command.description}\n`
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