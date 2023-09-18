import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"


const validationBody =(req:Request ,res:Response):boolean=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400)
            .json({
                message : 'Validation error' ,
                data : errors.array().map(err=>err.msg) ,
            })
        

        return false ; 
    }

    return true ; 
}


export const validation = (req:Request , res:Response , next:NextFunction) =>{
    if(!validationBody(req,res)){
        return ; 
    }

    next()
}