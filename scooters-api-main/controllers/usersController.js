import createId from "../helpers/createId.js";
import createJWT from "../helpers/createJWT.js";
import {
  emailCredentials,
  emailCredentialsSpecialists,
  emailForgetPassword,
  emailInfo,
  emailWarning,
} from "../helpers/emails.js";
import User from "../models/Users.js";

const registerCustomers = async (req, res) => {
  const { email, isAdmin, isCustomer } = req.body;

  const UserExist = await User.findOne({ email: email });

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isAdmin) {
      const error = new Error("El usuario debe ser un cliente!");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      await user.save();

      emailCredentials({
        firstname: user.firstname,
        email: user.email,
      });
    }
    res.status(200).json({ msg: "Usuario creado Correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const registerAdmins = async (req, res) => {
  const { email, isAdmin, isCustomer } = req.body;

  const UserExist = await User.findOne({ email: email });

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isCustomer || !isAdmin) {
      const error = new Error("El usuario debe ser un admin");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      await user.save();
    }
    res.status(200).json({ msg: "Usuario creado Correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const editUsers = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const userExist = await User.findById(id);

    if (!userExist) {
      const error = new Error("Usuario no encontrado");
      return res.status(401).json({ msg: error.message });
    }

    userExist.firstname = req.body.firstname || userExist.firstname;
    userExist.lastname = req.body.lastname || userExist.lastname;
    const userstored = await userExist.save();
    res.status(200).json({ msg: userstored, status: true });

  } catch (error) {
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const ChangeState = async (req, res) => {
  const { id } = req.body;
  const { user } = req;
  try {
    const userExist = await User.findById(id);

    if (!userExist) {
      const error = new Error("Usuario no encontrado");
      return res.status(401).json({ msg: error.message });
    }
    if (!user.isAdmin) {
      const error = new Error("Usuario no autorizado para esta accion");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      userExist.active = !userExist.active;
      const userstored = await userExist.save();
      res.status(200).json({ msg: userstored, status: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const editProfile = async (req, res) => {
  const { user } = req;
  try {
    const userExist = await User.findById(user._id);

    if (!userExist) {
      const error = new Error("Usuario no encontrado");
      return res.status(400).json({ msg: error.message, status: false });
    }

    userExist.firstname = req.body.firstname || userExist.firstname;
    userExist.lastname = req.body.lastname || userExist.lastname;
    userExist.password = req.body.password || userExist.password;
    const userstored = await userExist.save();
    res.status(200).json({ msg: userstored, status: true });
  } catch (error) {
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const registerNutri = async (req, res) => {
  const { email, isPatient, isPychologist, isNutri, isDoctor } = req.body;

  const UserExist = await User.findOne({ email: email });
  const AutoPassword = createId();

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isPatient || isPychologist || !isNutri || isDoctor) {
      const error = new Error("El usuario debe ser un Nutriologo");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      user.password = AutoPassword;
      const storedUser = await user.save();

      emailCredentialsSpecialists({
        firstname: user.firstname,
        email: user.email,
        password: AutoPassword,
      });
      res.status(200).json({ msg: storedUser, status: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const registerPsicologist = async (req, res) => {
  const { email, isPatient, isPychologist, isNutri, isDoctor } = req.body;

  const UserExist = await User.findOne({ email: email });
  const AutoPassword = createId();

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isPatient || !isPychologist || isNutri || isDoctor) {
      const error = new Error("El usuario debe ser un Psicologo");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      user.password = AutoPassword;
      const storedUser = await user.save();

      emailCredentialsSpecialists({
        firstname: user.firstname,
        email: user.email,
        password: AutoPassword,
      });

      res.status(200).json({ msg: storedUser, status: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message, status: false });
  }

  if (user.email != email) {
    const error = new Error("El email es incorrecto");
    return res.status(400).json({ msg: error.message, status: false });
  }

  if ((await user.comprobarPassword(password)) && user.email != email) {
    const error = new Error("El email y contraseña son incorrectos");
    return res.status(400).json({ msg: error.message, status: false });
  }

  if (!user.active) {
    const error = new Error("El usuario se encuentra desactivado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  if (await user.comprobarPassword(password)) {
    const time = Date.now();
    const today = new Date(time);
    user.lastLoginDate = today;

    res.status(200).json({
      _id: user._id,
      token: createJWT(user._id),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isCustomer: user.isCustomer,
      isAdmin: user.isAdmin,
      lastLoginDate: user.lastLoginDate,
      status: true,
    });
    user.save();
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message, status: false });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    user.token = createId();
    await user.save();
    emailForgetPassword({
      email: user.email,
      firstname: user.firstname,
      token: user.token,
    });
    res.status(200).json({
      msg: "Hemos enviado un email a su correo con las istrucciones para recuperar su contraseña",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const findoutToken = async (req, res) => {
  const { token } = req.params;
  const ValidToken = await User.findOne({ token });
  if (ValidToken) {
    res
      .status(200)
      .json({ msg: "Token valido y el usuario existe", status: true });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message, status: false });
  }
};

const NewPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });
  if (user) {
    try {
      user.password = password;
      user.token = "";

      await user.save();
      res.json({ msg: "Contraseña Modificado Correctamente", status: true });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message, status: false });
  }
};

const getCustomers = async (req, res) => {  
  try {
    const customers = await User.find({ isCustomer: true })
    res.status(200).json({ data: customers, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getCustomer = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  if (!user.isAdmin) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const customers = await User.find({ _id: id, isPatient: true });

    if (!customers[0]) {
      const error = new Error("el usuario no es un cliente");
      return res.status(400).json({ msg: error.message, status: false });
    }

    res.status(200).json({ data: customers, status: true });
    console.log(customers);
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getDateSpecialists = async (req, res) => {
  const { user } = req;
  try {
    if (!user.dates || user.dates.length === 0) {
      const specialists = await User.find({ isDoctor: true });
      res.status(200).json({ data: specialists, status: true });
    } else if (user.dates.length > 0) {
      const specialists = await User.find({
        $or: [{ isDoctor: true }, { isNutri: true }, { isPychologist: true }],
      });
      res.status(200).json({ data: specialists, status: true });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getAdmins = async (req, res) => {
  try {
    const specialists = await User.find({
      $or: [{ isAdmin: true }],
    })
    res.status(200).json({ data: specialists, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getAdmin = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  if (!user.isAdmin) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const admins = await User.find({
      _id: id,
      $or: [{ isAdmin: true }],
    })

    if (!admins[0]) {
      const error = new Error("el usuario no es un especialista");
      return res.status(400).json({ msg: error.message, status: false });
    }

    res.status(200).json({ data: admins, status: true });
    console.log(admins);
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const profile = async (req, res) => {
  const { user } = req;
  res.status(200).json({ data: user, status: true });
};

const getUsersRecent = async (req, res) => {
  const { user } = req;

  if (!user.isDoctor) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const users = await User.where("lastLoginDate").ne(null);

    users.sort((date1, date2) => date2.lastLoginDate - date1.lastLoginDate);

    res.status(200).json({ data: users, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getUsersRegisterRecent = async (req, res) => {
  const { user } = req;

  if (!user.isDoctor) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const users = await User.find();

    users.sort((date1, date2) => date2.createdAt - date1.createdAt);

    res.status(200).json({ data: users, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const Info = async (req, res) => {
  const { email, firstname, phone } = req.body;
  console.log(email);
  try {
    emailInfo({
      firstname: firstname,
      email: email,
      phone: phone,
    });
    res.status(200).json({ msg: "Correo enviado correctamente", status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};


const sendWarning = async (req, res) => {
  const { email } = req.body;

  try {
    emailWarning({
      email: email,
    });
    res.status(200).json({ msg: "Correo enviado exitosamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};



export {
  registerCustomers,
  registerAdmins,
  login,
  forgetPassword,
  findoutToken,
  NewPassword,
  getCustomers,
  getDateSpecialists,
  getAdmins,
  registerNutri,
  profile,
  editUsers,
  editProfile,
  getCustomer,
  getAdmin,
  getUsersRecent,
  getUsersRegisterRecent,
  Info,
  registerPsicologist,
  ChangeState,
  sendWarning
};
