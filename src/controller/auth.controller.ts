import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { IUser, User } from "../models/user.model";
import { StatusResult } from "../utils/status-result/status-result";


const _signToken = (payload:JwtPayload) => {
    const env = {
        option : {expiresIn : process.env.EXPIRE_TIME} ,
        key : process.env.JWT_SECRET_KEY , 
    }

    return sign(payload , env.key , env.option);
}

const register = async (req:Request , res:Response)=>{
    const {
        email , 
        firstName , 
        lastName , 
        username , 
        password
    } : IUser = req.body ;


    // check user email exist
    const emailInDb = await User.findOne({email});
    // check username exist 
    const usernameInDb = await User.findOne({username});

    if(emailInDb){
        return StatusResult(res , 400 , {message : 'This email alredy used'})
    }

    if(usernameInDb){
        return StatusResult(res , 400 , {message : 'This username alredy used'})
    }

    const newUser = await User.create({
        username , 
        password ,
        email ,
        firstName , 
        lastName , 
    });

    const payload:JwtPayload = {
        sub : newUser.id , 
        username : newUser.username , 
    }

    const token = _signToken(payload);

    StatusResult(res , 200 , {access_token : token});
}


const login = async (req:Request , res:Response)=>{
    const {
        username ,
        password , 
    } = req.body ; 


    const user = await User.findOne({username});

    if(!user){
        return StatusResult(res , 400 ,{message : 'Username is invalid'})
    }

    const comparePassword = compareSync(password , user.password);

    if(!comparePassword){
        return StatusResult(res , 400 , {message : 'Password is invalid'}) 
    }

    const payload:JwtPayload = {
        sub : user.id , 
        username , 
    }

    const token = _signToken(payload) ;

    StatusResult(res , 200 , {access_token : token})
}


export {
    register , 
    login , 
}