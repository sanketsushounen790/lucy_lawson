const kick = {
    name: "kick",
    description: "Kick users",
    args: false,
    authorized: "admin",
    execute(message) {
        const member = message.mentions.users.first()
        if(member){
            const memeberTarget = message.guild.members.cache.get(member.id)
            memeberTarget.kick()
            message.channel.send("User have been kicked")
        } else {
            message.channel.send("U couldn't kick that member")
        }
    },
}

export default kick