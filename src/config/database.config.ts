import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string ;


const databaseConnection = ():Promise<boolean | Error>=>{
    return new Promise(async resolve=>{
        try {
            await mongoose.connect(uri)
            console.log('connect to database')
            resolve(true)
        } catch (error) {
            console.error(error)
            resolve(error)
        }
    })
}



export {
    databaseConnection ,    
}