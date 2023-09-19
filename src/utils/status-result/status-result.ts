import { Response } from "express"


export const StatusResult = (res:Response , status:number = 500 , data:object) => {
    return res.status(status).json(data)
}