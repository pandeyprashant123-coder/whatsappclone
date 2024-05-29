import jwt from "jsonwebtoken";
import { Request,Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';

export const auth = (req:Request,res:Response,next:Function)=>{
    try {
        const authorizationHeaderValue = req.headers.authorization;
        req.body.user = null;
        if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')){
            return next();
        }
        const token = authorizationHeaderValue!.split('Bearer ')[1]
        if(!token) return null
        const user = jwt.verify(token,ACCESS_TOKEN_SECRET);
        req.body.user = user;
        return next();
    } catch (error) {
        console.log(error)
    }
}