import { Schema } from 'mongoose'

interface IUser {
    _id : Schema.Types.ObjectId ;
    firstName : string ;
    lastName : string ; 
    email : string ; 
    username : string ; 
    password : string ; 
}

const userSchema = new Schema<IUser>({
    firstName : {type : String},
    lastName : {type:String},
    email : {type : String , unique : true , required : true},
    username : {type : String ,unique : true ,required : true} ,
    password : {type : String ,  required : true}
})

