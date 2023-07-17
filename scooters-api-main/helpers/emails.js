import sendEmail from "../utils/sendEmail.js";

export const emailForgetPassword = async (datos) => {
  const { firstname, email, token } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: `${email}`,
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Reestablece tu Password",
      text: "Reestablece tu Password",
      html: `<p>Hola: ${firstname} has solicitado reestablecer tu contraseña</p>
      <p>Para poder crear una nueva contraseña solo debes hacer clic en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Reestablecer Password</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailCredentials = async (datos) => {
  const { firstname, email } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: `${email}`,
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Credenciales de seguridad",
      text: "Correo de bienvenida",
      html: `<p>Hola: ${firstname} te han asignado al sistema medico </p>
      <p>Para poder ingresar al sistema debes hacerlo mediante tus credenciale de seguridad </p>
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailCredentialsSpecialists = async (datos) => {
  const { firstname, email, password } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: `${email}`,
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Credenciales de seguridad",
      text: "Correo de bienvenida",
      html: `<p>Hola: ${firstname} te han asignado al sistema medico </p>
      <p>Para poder ingresar al sistema debes hacerlo mediante tus credenciale de seguridad </p>
      <p>Email: ${email}</p> 
      <p>Contraseña: ${password}</p> 
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailDate = async (datos) => {
  const { firstname, email, especialistemail } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: [`${email}`, `${especialistemail}`],
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Credenciales de seguridad",
      text: "Correo de bienvenida",
      html: `<p> te han asignado una cita con un especialista </p>
      <p> Recuerda asistir a tu cita puntualmente</p>
      <p>Para poder ingresar al sistema debes hacerlo mediante tus credenciale de seguridad </p>
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailInfo = async (datos) => {
  const { email, firstname, phone } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: "solicitudesdrbariatrico55@gmail.com",
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Credenciales de seguridad",
      text: "Correo de solicitud de informacion",
      html: `<p> Un Paciente ha solicitado informacion acerca 
      del procedimiento medico</p>
      <p> puedes comunicarte con el mediante la siguiente informacion </p>
      <p>Email: ${email}</p> 
      <p>Email: ${firstname}</p> 
      <p>Email: ${phone}</p> 
      `,
    });
  } catch (error) {
    console.log(error);
  }
};


export const emailWarning = async (datos) => {
  const { email } = datos;
  
  try {
    await sendEmail({
      //the client email
      to: [`${email}`],
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Credenciales de seguridad",
      text: "Correo de advertencia",
      html: `<p> Hola, hemos detectado un problema en tu proceso de pérdida de peso</p>
      <p> Por favor agenda una cita lo más pronto posible!</p>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};

