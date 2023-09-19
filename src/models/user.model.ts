import { genSalt, genSaltSync, hashSync } from 'bcrypt';
import { Schema, model } from 'mongoose'

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


userSchema.pre('save' , function(next){
    if(!this.isModified('password')){
        return next()
    }

    const salt = genSaltSync(12);
    this.password = hashSync(this.password , salt);
    next()
})



const User = model<IUser>('User' , userSchema);

export {User , IUser};