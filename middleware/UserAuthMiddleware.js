import jwt from "jsonwebtoken";

export const UserAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const jwttoken = token.replace("Bearer ", "").trim();

  jwt.verify(jwttoken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;

    next();
  });
};
