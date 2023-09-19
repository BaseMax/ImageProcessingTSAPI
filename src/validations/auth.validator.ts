import { ValidationChain, check } from "express-validator";

const loginValidator = ():ValidationChain[] =>{
    return [
        check('username')   
            .notEmpty().withMessage('Username is required')
        ,
        check('password')   
            .notEmpty().withMessage('Password is required')
    ]
}


const registerValidator = ():ValidationChain[]=>{
    return [
        check('firstName')   
            .notEmpty().withMessage('firstName is required')
        ,
        check('lastName')   
            .notEmpty().withMessage('lastName is required')    
        
        ,
        check('email')   
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Email is isnvalid')
        ,
        check('username')   
            .notEmpty().withMessage('Username is required')
        ,
        check('password')   
            .notEmpty().withMessage('Password is required')
    ]
}


export {loginValidator , registerValidator}