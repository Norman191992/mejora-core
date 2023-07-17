import mongoose from "mongoose";

const FrequentQuestionSchema = mongoose.Schema(
    {
        active: {
            type: Boolean,
            trim: true,
            default: true,
        },
        question: {
            type: String,
            required: true,
            trim: true,
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

const FrequentQuestion = mongoose.model("FrequentQuestion", FrequentQuestionSchema);

export default FrequentQuestion;
