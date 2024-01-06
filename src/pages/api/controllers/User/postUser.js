import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND);

export const postUser = async (req, res) => {
  try {
    const data = req.body;
    const { password, confirmPassword } = data;

    const userFind = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!password || !confirmPassword) return res.json(mensagess.errors.onePassword)
    if (password !== confirmPassword) return res.json(mensagess.errors.diffPasword)
    if (userFind) return res.json(mensagess.errors.verifyEmail);
    if (!process.env.JWT_SECRET) return res.json('JWT secret is not defined');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    };

    const createUser = await prisma.user.create({ data: newUser });
 
    const { password: _unused, ...userWithoutPassword } = createUser;
  
  

    // Generar un token asociado con el usuario recién creado
    const token = jwt.sign({ userId: createUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Construir la URL con el token generado
    const confirmEmailURL = `http://localhost:3000/ConfirmEmail?token=${token}`;
    // Enviar correo de confirmación
    const resendEmail = resend.emails.send({
      from: 'onboarding@resend.dev',
      to: data.email,
      subject: 'Confirmar email',
      html: `<a href=${confirmEmailURL}>Confirmar email</a>`,
    });
    // Establecer la cookie con el token
    // res.setHeader("Set-Cookie", `auth_cookies=${token}; Secure; SameSite=Strict; Max-Age=86400; Path=/`);

    return res.status(200).json({
      user: userWithoutPassword,
      message: mensagess.success.postUser,
    });
  } catch (error) {
    throw new Error('Failed to create User');
  }
};
