import getLolChampionData from "../../actions/fetch_apis/getLolChampionData.js"

const lol = {
    name: "lol",
    topic: "others",
    commandFormat: "`!lol [tên tướng] :`",
    description: `*Bot đưa ra các thông tin về tướng chỉ định.*`,
    args: true,
    authorized: "user",
    execute(message, args) {
        /* console.log(args) */
        let championName

        switch (args[0].toLowerCase()) {
            case "lee":
            case "leesin":
                championName = "LeeSin"
                break
            case "xin":
            case "xinzhao":
                championName = "XinZhao"
                break
            case "jarvan":
            case "j4":
                championName = "JarvanIV"
                break
            case "aurelion":
            case "aurelionsol":
            case "aure":
                championName = "AurelionSol"
                break
            case "miss":
            case "miss4tune":
            case "mf":
                championName = "MissFortune"
                break
            case "twisted":
            case "tf":
                championName = "TwistedFate"
                break
            case "tahm":
            case "tahmkench":
                championName = "TahmKench"
                break
            case "mundo":
                championName = "DrMundo"
                break
            case "kogmaw":
                championName = "KogMaw"
                break
            case "reksai":
                championName = "RekSai"
                break
            case "ys":
                championName = "Yasuo"
                break
            default:
                championName = args[0][0].toUpperCase() + args[0].slice(1).toLowerCase()
                break
        }

        getLolChampionData(championName).then(data => {
            /* console.log(data) */
            const name = data.name
            const title = data.title
            const profile = data.lore
            const skins = data.skins.slice(1)
            const splashArt = skins[Math.floor(Math.random() * skins.length)]
            const counterPickName = data.id.toLowerCase()
            const roles = data.tags.map(tag =>{
                switch (tag) {
                    case "Tank":
                        return `:shield: ${tag}`
                    case "Fighter":
                        return `:crossed_swords: ${tag}`
                    case "Assassin":
                        return `:dagger: ${tag}`
                    case "Mage":
                        return `:crystal_ball: ${tag}`
                    case "Marksman":
                        return `:archery: ${tag}`
                    case "Support":
                        return `:ambulance: ${tag}`
                    default:
                        break
                }
            })
            const allytips = data.allytips.length == 0 ? "Chưa có dữ liệu" : data.allytips
            const enemytips = data.enemytips.length == 0 ? "Chưa có dữ liệu" : data.enemytips

            const championEmbed = {
                color: 0x0099ff,
                url: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`,
                author: {
                    name: `COUNTERS CỦA ${name.toUpperCase()}`,
                    icon_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnportal.mobalytics.gg%2Fproduction%2F2021%2F02%2Fb3a6b688-logo.gif&f=1&nofb=1",
                    url: `https://app.mobalytics.gg/lol/champions/${counterPickName}/counters`,
                },
                title: name,
                description: title,
                thumbnail: {
                    url: `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${championName}.png`,
                },
                fields: [
                    {
                        name: "Giới Thiệu",
                        value: profile,
                    },
                    {
                        name: "Vai trò",
                        value: roles,
                    },
                    {
                        name: `Mẹo khi sử dụng ${name}`,
                        value: allytips,
                    },
                    {
                        name: `Mẹo khi đối đầu ${name}`,
                        value: enemytips,
                    },
                    {
                        name: "Hình nền ngẫu nhiên",
                        value: splashArt.name,
                        inline: false
                    },
                ],
                image: {
                    url: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${splashArt.num}.jpg`,
                },
                timestamp: new Date(),
                footer: {
                    text: `${message.author.username} đã yêu cầu`,
                    icon_url: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`,
                },
            }

            message.channel.send({ embed: championEmbed })
        })
        .catch(err =>{
            console.log(`Error: ${err}`)
            message.channel.send("Lỗi cú pháp. Mời bạn nhập lại cho đúng tên tướng")
        })
    },
}

export default lol