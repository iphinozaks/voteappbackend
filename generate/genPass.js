import hash from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const genCode = (length) => {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var code = "";
    for (var i = 0; i <= length; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    code += chars.substring(randomNumber, randomNumber +1);
    }
    return code;
 }

export const genPass = (password) => {
    let salt = hash.genSaltSync();
    let hashPassword = hash.hashSync(password,salt);
    return hashPassword;
}

export const verifyPass = (hashPass,reqPass) => {
    const secure = hash.compareSync(reqPass,hashPass)
    if (secure) {
        return true;
    } else {
        return false;
    }
}

export const genToken = (_id) => {
    let secret = process.env.SECRET;
    let token = jwt.sign({id: _id,time: new Date().getTime()},secret);
    return token;
} 