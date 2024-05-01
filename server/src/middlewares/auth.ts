import jwt from "jsonwebtoken";
import { Request,Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';

export const auth = async(req:Request,res:Response,next:Function)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const isCostumAuth = token.length<500;
        let decodedData;
        if(token && isCostumAuth){
            decodedData = jwt.verify(token,ACCESS_TOKEN_SECRET);
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
    } catch (error) {
        
    }
}