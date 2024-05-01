import User from "../models/user";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


import { UserId,UserLogin } from "../models/user.types";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';

export const signup = async (req: Request, res: Response) => {
    const {name, email,password,confirmPassword}:UserId = req.body;
    console.log(name, email, password, confirmPassword)
    try {
        if(await User.findOne({email})){
            return res.status(400).json({message:"User alreasy exists"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"Password do not match"});
        }
        const hashedPassword  = await bcrypt.hash(password,12);
        const result = await User.create({email,password:hashedPassword,name});
        const token = jwt.sign({email:result.email,id:result._id},ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
        res.status(200).json({result,token,message:"User Created Successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
        
    }
}


export const signin = async (req:Request, res:Response)=>{
    const {email,password}:UserLogin =req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:"user does not exist"});
        }
        const isPasswordCorrect = await bcrypt.compareSync(password,existingUser.password);
        if(!isPasswordCorrect){
            res.status(400).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
        res.status(200).json({result:existingUser,token,message:"User Signed In Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}