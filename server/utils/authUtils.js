
import jwt from "jsonwebtoken";
import {secretKey} from "../configuration/jwtConfig.js";

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, secretKey, {expiresIn: "1h"});
};

function generateRefreshToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, secretKey, {expiresIn: "7h"});
};

function verifyToken(token){
    return jwt.verify(token, secretKey);
}

export {generateToken, generateRefreshToken, verifyToken};
