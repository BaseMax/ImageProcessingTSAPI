import { Router } from "express";
import { login, register } from "../controller/auth.controller";
import { validation } from "../errors/validation.error";
import { loginValidator, registerValidator } from "../validations/auth.validator";

const router = Router()

router.post(
    '/register' , 
    registerValidator() , 
    validation , 
    register
);

router.post(
    '/login',
    loginValidator() ,
    validation ,
    login ,
)

export default router ; 