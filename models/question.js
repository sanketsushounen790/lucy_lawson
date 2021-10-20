import mongoose from "mongoose"

const Schema = mongoose.Schema

const questionSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Question = mongoose.model('Questions', questionSchema)

export default Question