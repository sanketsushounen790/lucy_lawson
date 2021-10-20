const ava = {
    name: "ava",
    topic: "others",
    commandFormat : "`!ava @[tên người dùng 1] @[tên người dùng 2] ... @[tên người dùng n] :`",
    description: "*Hiển thị avatar người dùng được nhắc tới.*",
    args: false,
    authorized: "user",
    execute(message) {
        if (!message.mentions.users.size) {
            const authorAvatarEmbed = {
                color: 0x009ff,
                title: "Your avatar: ",
                image: {
                    url: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`
                }
            }

            message.channel.send({embed: authorAvatarEmbed})
        }
        
        const avatarList = message.mentions.users.map(user => {
            const userAvatarEmbed = {
                color: 0x009ff,
                title: `${user.username}'s avatar:`,
                image: {
                    url: `${user.displayAvatarURL({ format: 'png', dynamic: true })}`
                }
            }

            return {embed: userAvatarEmbed}
        })
        
        // Send the entire array of strings as a message
        // By default, discord.js will `.join()` the array with `\n`
        console.log(avatarList)
        avatarList.map(a =>{
            message.channel.send(a)
        })
    },
}

export default ava