import jwt from "jsonwebtoken";

export const generateJwtToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    return token;
  } catch (error) {
    return error;
  }
};
