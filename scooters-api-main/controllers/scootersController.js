import Scooter from "../models/Scooters.js";

const getAllScooters = async (req, res) => {
    try {
        const justActive = req.query.justActive === "true";

        let scooters;

        if (justActive) {
          scooters = await Scooter.find({ active: true });
        } else {
          scooters = await Scooter.find();
        }

        res.status(200).json({ data: scooters, status: true });
    } catch (error) {
        res.status(400).json({ msg: error.message, status: false });
    }
};


const createScooter = async (req, res) => {
    try {
        const scooter = new Scooter(req.body);
        await scooter.save()
        res.status(200).json({ msg: "Scooter creado correctamente", status: true });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ msg: error.message, status: false });
    }
};

const updateScooter = async (req, res) => {
    const { id } = req.params;

    try {
        const scooterExist = await Scooter.findById(id);
        if (!scooterExist) {
          return res.status(404).json({ error: "Scooter no encontrado" });
        }
      
        const { name, price, picture, active, autonomy, ratings } = req.body;
      
        scooterExist.name = name || scooterExist.name;
        scooterExist.price = price || scooterExist.price;
        scooterExist.picture = picture || scooterExist.picture;
        scooterExist.active = active !== undefined ? active : scooterExist.active;
        scooterExist.autonomy = autonomy || scooterExist.autonomy;
      
        if (ratings && Array.isArray(ratings)) {
          ratings.forEach((element) => {
            const ratingExist = scooterExist.ratings.findIndex(
              (rating) => rating.userId === element.userId
            );
      
            if (ratingExist !== -1) {
              scooterExist.ratings[ratingExist] = element;
            } else {
              scooterExist.ratings.push(element);
            }
          });
        }
      
        const scooterStored = await scooterExist.save();
        res.status(200).json({ data: scooterStored, status: true });

    } catch (error) {
        console.log('err', error)
        res.status(404).json({ msg: "El id que ingresaste no es valido" });
    }
}


const getScooter = async (req, res) => {
    const { id } = req.params;

    try {
        const scooterExist = await Scooter.findById(id);
        if (!scooterExist) {
            const error = new Error("Pregunta no encontrada");
            return res.status(401).json({ msg: error.message });
        }

        res.status(200).json({ data: scooterExist, status: true });

    } catch (error) {
        console.log('err', error)
        res.status(404).json({ msg: "El id que ingresaste no es valido" });
    }
}

export {
    getAllScooters,
    createScooter,
    updateScooter,
    getScooter
}