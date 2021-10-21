import Discord from "discord.js"
//server
import { keepAlive } from "./server.js"
//communicates
import { getQuestions, newQuestion, deleteQuestion} from "./actions/communicates/questionActions.js"
import { getAnswers, newAnswer, deleteAnswer } from "./actions/communicates/answerActions.js"
import communicates from "./actions/communicates/communicates.js"
//commands
import loichua from "./commands/guild/loichua.js"
import nuoc from "./commands/guild/nuoc.js"
import img from "./commands/guild/img.js"
import argsInfo from "./commands/guild/args-info.js"
import help from "./commands/guild/help.js"
import pick from "./commands/guild/pick.js"
import advise from "./commands/guild/advise.js"
import ava from "./commands/guild/ava.js"
import lol from "./commands/guild/lol.js"

//moderator commands
import kick from "./commands/moderator/kick.js"
import ban from "./commands/moderator/ban.js"

//mini games
import init from "./commands/guild/init.js"
import { runRussianRoulette } from "./mini_games/russianRoulette.js"
import { dropBaiCao, runBaiCao } from "./mini_games/baiCao.js"

const myToken = process.env.LUCY_LAWSON_TOKEN
const client = new Discord.Client()

//Bot logged in notification
client.on("ready", () => {
  console.log(`Logged in at ${client.user.tag}`)
})

//Text manages
client.on("message", message => {
  //Bot don't answer itself
  if (message.author.bot) return

  const prefix = message.content.charAt(0)

  if (prefix === "!") {
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (command == argsInfo.name) {
      argsInfo.execute(message, args)
    } else if (command == help.name) {
      help.execute(message)
    } else if (command == loichua.name) {
      loichua.execute(message)
    } else if (command == nuoc.name) {
      nuoc.execute(message, args)
    } else if (command == img.name) {
      img.execute(message, args)
    } else if (command == pick.name) {
      pick.execute(message, args)
    } else if (command == advise.name) {
      advise.execute(message)
    } else if (command == init.name) {
      init.execute(message, args, client)
    } else if (command == ava.name) {
      ava.execute(message, args)
    } else if (command == lol.name) {
      lol.execute(message, args)
    } else if (command == kick.name) {
      kick.execute(message)
    } else if (command == ban.name) {
      ban.execute(message)
    }

  } else if (prefix === "$") {
    //show list of question - answer
    if (message.content.startsWith("$list")) {
      const type = message.content.split(" ")[1]
      const topic = message.content.split(" ")[2]

      switch (type) {
        case "q":
          getQuestions(topic)
            .then(result => {
              message.channel.send(result)
            })
          break
        case "a":
          getAnswers(topic)
            .then(result => {
              message.channel.send(result)
            })
          break
        default:
          message.channel.send("Sai cú pháp rồi")
          break
      }
    }

    // adding new question - answer
    if (message.content.startsWith("$new")) {
      const type = message.content.split(" ")[1]
      const topic = message.content.split(" ")[2]
      const content = message.content.split(" ").slice(3).join(" ")
      const contents = message.content.split(" ").slice(3).join(" ").split("&")

      switch (type) {
        case "q":
          newQuestion(topic, content)

          message.channel.send(`New "${topic} - quesiton" ADDED`)
          break
        case "q_many":
          contents.map(content => {
            newQuestion(topic, content)

            message.channel.send(`New "${topic} - quesiton" ADDED`)
          })
          break
        case "a":
          newAnswer(topic, content)

          message.channel.send(`New "${topic} - answer" ADDED`)
          break
        case "a_many":
          contents.map(content => {
            newAnswer(topic, content)

            message.channel.send(`New "${topic} - answer" ADDED`)
          })
          break
        default:
          message.channel.send("Sai cú pháp rồi")
          break
      }
    }

    //delete question - answer
    if (message.content.startsWith("$del")) {
      const type = message.content.split(" ")[1]
      const topic = message.content.split(" ")[2]
      const content = message.content.split(" ").slice(3).join(" ")
      /* const contents = message.content.split(" ").slice(3).join(" ").split("&") */

      switch (type) {
        case "q":
          deleteQuestion(topic, content)

          message.channel.send(`"${topic} - question": ${content} DELETED`)
          break
        case "a":
          deleteAnswer(topic, content)

          message.channel.send(`"${topic} - answer": ${content} DELETED`)
          break
        default:
          message.channel.send("Sai cú pháp rồi")
          break
      }
    }
  }


  /* if(message.content == "!myinfo"){
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`)
    message.channel.send(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    console.log(message.guild.roles)
   
  }  */

  //Russian roulette
  if (message.content.toLowerCase() === "click"){
    runRussianRoulette(message)
  }

  //Bai Cao
  if(message.content.toLowerCase() === "%bc check"){
    runBaiCao(message)
  }
  if(message.content.toLowerCase() === "%bc drop"){
    dropBaiCao(message)
  }

  //bot communicates 
  communicates(message)

  //bot reacts
  switch (message.content.toLowerCase()) {
    case "huy đẹp trai":
      message.author.send("Chính xác luôn 😍")
      message.react("💖")
      message.react("😍")
      message.react("😘")
      message.react("👍")
      message.react("💯")
      break
    case "duy đẹp trai":
      message.author.send("Có cc ý 🤮")
      message.react("🤮")
      message.react("🤢")
      message.react("👎")
      message.react("👊")
      break
    case "huy pro":
      message.react("💯")
      message.react("👍")
      message.channel.send(`<:fekar:889425501360373831> <:fekar:889425501360373831> <:fekar:889425501360373831>`)

      break
    case "duy pro":
    case "hiếu pro":
      message.react("🐔")
      message.react("🐓")
      message.channel.send(`<:chick:889425502031450112> <:chick:889425502031450112> <:chick:889425502031450112>`)
      break
    default:
      break
  }

})

//start server
keepAlive()
//login Bot
client.login(myToken)