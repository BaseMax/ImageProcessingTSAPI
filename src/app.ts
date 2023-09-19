import { config } from 'dotenv';
config()

import './passport/passport.strategy';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import mianRouter from './router/index';
import { databaseConnection } from './config/database.config';
import passport from 'passport';


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;


app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(passport.initialize())
app.use(mianRouter);


server.listen(port , async ()=>{
  console.log(process.version);
  await databaseConnection()
  console.log(`App runing on port ${port}`)
})


export {server}