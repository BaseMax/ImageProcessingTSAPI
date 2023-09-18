import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mianRouter from './router/index';


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const io = new Server(server , {cors : {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
}});




io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('data', (data) => {  
    socket.broadcast.emit('data', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(mianRouter);



server.listen(port , ()=>{
    console.log(process.version);
    console.log(`App runing on port ${port}`)
})

export {server}