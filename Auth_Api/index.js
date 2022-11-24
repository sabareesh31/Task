require('dotenv').config();
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const Router=require('./Router/router');

app.use(cors());


const PORT=process.env.PORT || 8081;   
app.listen(PORT,()=>{
    console.log(`Running this page ${PORT}.`)
});

app.use('/api',Router)



