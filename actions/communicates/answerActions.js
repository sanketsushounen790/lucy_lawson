import Answer from "../../models/answer.js"

export const getAnswers = (topic) =>{
    return Answer.find({"topic": topic})
    .then(answers => {
        return answers.map(answer => {
            return answer.content
        })
    })
    .catch(err =>{
        console.log(`Error: ${err}`)
    })
}

export const newAnswer = (topic, content) => {
    const newAnswer = new Answer({
        topic,
        content
    })

    newAnswer.save()
    .then(()=>{
        console.log("New answer adding succeeded !")
    })
    .catch(err =>{
        console.log(`Error: ${err}`)
    })
}

export const deleteAnswer = (topic, content) => {
    Answer.deleteOne({
        "topic": topic,
        "content": content
    })
    .then(() => {
        console.log("Answer deleting succeeded !")
    })
    .catch(err => {
        console.log(`Err: ${err}`)
    })
}