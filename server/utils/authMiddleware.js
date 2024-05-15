import jwt from "jsonwebtoken";
import { secretKey } from "../configuration/jwtConfig.js";

function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing Token" });
    }

    const [Bearer, token] = authHeader.split(" ");
    if (Bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized : Invalid token format" });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        req.user = user;
        next();
    });
}

export { authenticateToken };
