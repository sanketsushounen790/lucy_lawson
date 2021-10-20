const ban = {
    name: "ban",
    description: "ban users",
    args: false,
    authorized: "admin",
    execute(message) {
        const member = message.mentions.users.first()
        if(member){
            const memeberTarget = message.guild.members.cache.get(member.id)
            memeberTarget.ban()
            message.channel.send("User have been baned")
        } else {
            message.channel.send("U couldn't ban that member")
        }
    },
}

export default ban