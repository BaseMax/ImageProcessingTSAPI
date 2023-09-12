import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';


const app = express();
const port = process.env.PORT || 3001;


app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(morgan('tiny'))
app.use(helmet())


app.listen(port , ()=>{
    console.log(process.version);
    console.log(`App runing on port ${port}`)
})


export {app}