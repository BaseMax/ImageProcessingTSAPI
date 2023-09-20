import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { StatusResult } from "../utils/status-result/status-result";

const auth = (req:Request, res:Response, next:NextFunction)=>{
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return StatusResult(res , 401 , { message: 'Unauthorized' })
      }
      if (!user) {
        return StatusResult(res , 401 , { message: 'Unauthorized' })
      }

      req.user = user;
      return next();
    })(req, res, next);
}

export {auth}  