import Question from "../../models/question.js"

export const getTopics = () =>{
    return Question.distinct("topic")
}

export const getQuestions = (topic) =>{
    return Question.find({"topic": topic})
    .then(questions => {
        return questions.map(question => {
            return question.content
        })
    })
    .catch(err =>{
        console.log(`Error: ${err}`)
    })
}

export const newQuestion = (topic, content) => {
    const newQuestion = new Question({
        topic,
        content
    })

    newQuestion.save()
    .then(()=>{
        console.log("New question adding succeeded !")
    })
    .catch(err =>{
        console.log(`Error: ${err}`)
    })
}

export const deleteQuestion = (topic, content) => {
    Question.deleteOne({
        "topic": topic,
        "content": content
    })
    .then(() => {
        console.log("Question deleting succeeded !")
    })
    .catch(err => {
        console.log(`Err: ${err}`)
    })
}

