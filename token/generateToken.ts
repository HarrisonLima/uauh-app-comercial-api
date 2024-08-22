import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateToken = (user: any) => {
  dotenv.config();

  return jwt.sign(
    { id: user.id, usuario: user.usuario, nome: user.nome },
    process.env.JWT_SECRET as string,
    { expiresIn: "12h" }
  );
};

export default generateToken;
