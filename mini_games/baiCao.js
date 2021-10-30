import cards, {shuffleCards} from "./cardsInit.js"

//a: [0, 2, 4]
//b: [1, 3, 5]

//a: [0, 3, 6]
//b: [1, 4, 7]
//c: [2, 5, 8]

//a: [0, 4, 8]
//b: [1, 5, 9]
//c: [2, 6, 10]
//d: [3, 7, 11]

//a: [0, 5, 10]
//b: [1, 6, 11]
//c: [2, 7, 12]
//d: [3, 8, 13]
//e: [4, 9, 14]

const baiCaoProps = {
    status: false,
    initedAuthor : {
        name: "",
        id: 0,
    },
    players : [], //collect mentions users data(name and id)
    playersInfo: null, 
    cardsImagePath : "./cards/",
    instruction: 
    `-----------------------------------------------------------\nNgười được tag đầu tiên sẽ là người làm Cái !\nChỉ có người làm Cái mới được quyền gõ lệnh "%bc check" để check bài mọi người\nGõ lại lệnh "!init bc" hoặc "!init bai_cao" nếu muốn chọn lại người làm cái !`
}

export const runBaiCao = (message) => {
    /* console.log(message.author.id)
    console.log(baiCaoProps.initedAuthor.id) */

    if(message.author.id === baiCaoProps.initedAuthor.id && baiCaoProps.status) {
        baiCaoProps.players.map(player => {
            //Get player info: id, name, new draft(not empty)
            const playerName = player.name //name
            const playerDraft = baiCaoProps.playersInfo.get(player.name).draft //[card_1, card_2, card_3]
            
            //convert 3 cards to .png image
            const playerDraftCovertedToImage = playerDraft.map(card => {
                return `${baiCaoProps.cardsImagePath}${card}.png`
            }) 
    
            //Bot annouces drafted
            const playerEmbed = {
                title: `Bài của ${playerName} :point_up:`,
            }
            
            message.channel.send({embed: playerEmbed, files: playerDraftCovertedToImage})
        })

        //reset the game props
       baiCaoProps.status = false
    } else if(!baiCaoProps.status) {
        message.reply(`Vui lòng gõ lệnh "!init bc" hoặc "!init bai_cao" để khởi tạo trò chơi !`)
    }
    else {
        message.reply("Bạn không phải là Cái ván chơi này")
    }
}

export const dropBaiCao = (message) => {
    const dropAuthor = {
        name: message.author.username,
        id: message.author.id
    }

    message.channel.send(`${dropAuthor.name} đã bỏ bài`)
}

export const initBaiCao = (message, client) => {
    console.log(message.mentions.users.size)
    if (!message.mentions.users.size || message.mentions.users.size < 2) {
        return message.reply("Trò chơi cần tag tên 2 người trở lên. Hãy rủ thêm bạn đi nào !")
    }

    baiCaoProps.status = true

    //find the author player (Cái)
    baiCaoProps.initedAuthor.id = message.mentions.users.first().id
    baiCaoProps.initedAuthor.name = message.mentions.users.first().username

    console.log(baiCaoProps.initedAuthor.id)
    //init players info
    baiCaoProps.players = message.mentions.users.map(user => {
        return {name: user.username, id: user.id}
    })
    
    baiCaoProps.playersInfo = new Map()

    baiCaoProps.players.map(player => {
        baiCaoProps.playersInfo
        .set
        (
            player.name, //key
            //values
            {
                id: player.id,
                number: baiCaoProps.players.indexOf(player),
                draft: []
            }
        ) 
    })

    //init cards and deck
    const newCards = shuffleCards(cards)
    const deck = newCards.slice(0, baiCaoProps.players.length * 3)
    
    //drafting cards function
    const draftingCard = (playerNumber, playerDraft) => {
        for(let i = playerNumber; i < deck.length; i += baiCaoProps.players.length){
            playerDraft.push(deck[i])
        }

        return playerDraft
    }

    //drafting new cards for each player
    baiCaoProps.players.map(player => {
        //get player info: id, number, empty draft at begining
        const id = baiCaoProps.playersInfo.get(player.name).id //player id
        const number = baiCaoProps.playersInfo.get(player.name).number //player number
        const emptyDraft = baiCaoProps.playersInfo.get(player.name).draft //player empty draft at begining

        const draft = draftingCard(number, emptyDraft) //init new craft with 3 cards for player
        
        baiCaoProps.playersInfo.set(player.name, {id, number, draft}) //updating draft after drafting new cards
    })
    /* console.log(playersInfo) */

    //convert to png and direct send to each player
    baiCaoProps.players.map(player => {
        //Get player info: id, name, new draft(not empty)
        const playerName = player.name //name
        const playerId = baiCaoProps.playersInfo.get(player.name).id //id
        const playerDraft = baiCaoProps.playersInfo.get(player.name).draft //[card_1, card_2, card_3]
        

        //convert 3 cards to .png image
        const playerDraftCovertedToImage = playerDraft.map(card => {
            return `${baiCaoProps.cardsImagePath}${card}.png`
        }) 

        //Bot annouces drafted
        message.channel.send(`Đã chia bài cho **${playerName}**`)

        //direct message player by thier id 3 .png cards just converted
        client.users.cache.get(playerId).send({files: playerDraftCovertedToImage})
        
    })

    message.channel.send(`Người làm Cái ván này: **${baiCaoProps.initedAuthor.name}**`)
    message.channel.send(baiCaoProps.instruction)
}

/* const id = baiCaoProps.playersInfo.get(player.name).id

        if(id == dropAuthor.id){
            baiCaoProps.playersInfo.delete(player.name)
            message.channel.send(`${dropAuthor.name} đã bỏ bài`)
        } */
