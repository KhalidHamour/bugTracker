import jwt from "jsonwebtoken";
import "dotenv/config";

export const auth = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(403).json({ message: "auth token missing" });
    }

    const isGoogleToken = token.length > 500;
    let decodedData;

    if (isGoogleToken) {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    } else {
      decodedData = jwt.verify(token, process.env.SECRET);
      req.userId = decodedData.id;
    }

    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
