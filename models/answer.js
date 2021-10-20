import mongoose from "mongoose"

const Schema = mongoose.Schema

const answerSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Answer = mongoose.model('answers', answerSchema)

export default Answer