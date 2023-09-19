import { Request, Response } from "express";
import { StatusResult } from "../utils/status-result/status-result";

const profile = async (req:Request,res:Response) => {
    StatusResult(res , 200 , req.user)
}




export {profile}