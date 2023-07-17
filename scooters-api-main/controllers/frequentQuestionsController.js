import FrequentQuestion from "../models/FrequentQuestions.js";


const getAllQuestions = async (req, res) => {
    try {
        const justActive = req.query.justActive;
        if (justActive==="true") {
            const questions = await FrequentQuestion.find({ active: true })
            res.status(200).json({ data: questions, status: true });
        } else {
            const questions = await FrequentQuestion.find()
            res.status(200).json({ data: questions, status: true });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message, status: false });
    }
};


const createQuestion = async (req, res) => {
    try {
        const frequentQuestion = new FrequentQuestion(req.body);
        await frequentQuestion.save()
        res.status(200).json({ msg: "Pregunta creada correctamente", status: true });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ msg: error.message, status: false });
    }
};

const updateQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const questionExist = await FrequentQuestion.findById(id);
        if (!questionExist) {
            const error = new Error("Pregunta no encontrada");
            return res.status(401).json({ msg: error.message });
        }

        
        questionExist.question = req.body.question || questionExist.question
        questionExist.answer = req.body.answer || questionExist.answer
        questionExist.active = 'active' in req.body ? req.body.active : questionExist.active

        const questionStored = await questionExist.save();
        res.status(200).json({ msg: questionStored, status: true });

    } catch (error) {
        console.log('err', error)
        res.status(404).json({ msg: "El id que ingresaste no es valido" });
    }
}


const getQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const questionExist = await FrequentQuestion.findById(id);
        if (!questionExist) {
            const error = new Error("Pregunta no encontrada");
            return res.status(401).json({ msg: error.message });
        }

        res.status(200).json({ data: questionExist, status: true });

    } catch (error) {
        console.log('err', error)
        res.status(404).json({ msg: "El id que ingresaste no es valido" });
    }
}

export {
    getAllQuestions,
    createQuestion,
    updateQuestion,
    getQuestion
}