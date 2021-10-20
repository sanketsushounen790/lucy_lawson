import { getQuestions, getTopics } from "./questionActions.js"
import { getAnswers } from "./answerActions.js"

const processRespondMessage = (topic, message) => {
    return getQuestions(topic).then(result => {
        if (result.some(word => message.content.toLowerCase().includes(word))) {
            getAnswers(topic).then(result => {
                const replyMessage = result[Math.floor(Math.random() * result.length)]

                /* console.log(`${topic}: ${replyMessage}`) */
                if(replyMessage != undefined){
                    message.reply(replyMessage)
                }
            })
                .catch(err => {
                    console.log(`Error: ${err}`)
                })
        }
    })
        .catch(err => {
            console.log(`Error: ${err}`)
        })
}

const communicates = (message) => {
    getTopics().then(topics => {
        topics.forEach(topic => {
            processRespondMessage(topic, message)
        })
    })
}

export default communicates