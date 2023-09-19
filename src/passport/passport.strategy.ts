import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../models/user.model";

const ops = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken() , 
    secretOrKey : process.env.JWT_SECRET_KEY
}

passport.use(new Strategy(ops , async (payload , done)=>{
    const user = await User.findById(payload.sub)
    
    
    if(user){
        return done(false , user);
    }
}))