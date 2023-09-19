import {app, server} from '../src/app' ;
import request from 'supertest';

describe('Should be test app' , ()=>{
    afterAll(async()=>{
        server.close();
    })

    it('send reques' , ()=>{
        request(app)
            .get('/')
            .expect(200)
    })
})