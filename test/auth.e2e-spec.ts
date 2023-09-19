import mongoose from 'mongoose';
import {User} from '../src/models/user.model';
import {app, server} from '../src/app';
import request from 'supertest';

describe('Auth tests' , ()=>{
    beforeAll(async()=>{
        await User.deleteMany()
        mongoose.connection.close()
        server.close()
    })

    it('Should be register' , async ()=>{
        const data = {
            firstName : "test" , 
            lastName : "test" ,
            email : "test@gmail.com",
            username : "test" ,
            password : "123456"
        }

        return request(app)
            .post('/auth/register')
            .send(data)
            .expect(200)
    })


    it('Should be login' , async ()=>{
        const data = {
            username : "test" ,
            password : "123456"
        }

        return request(app)
            .post('/auth/login')
            .send(data)
            .expect(200)
    })
})