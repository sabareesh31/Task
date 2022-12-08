const express=require('express');
const axios=require('axios');
const { request } = require('express');
const bodyParser=require('body-parser');
const uuid=require('uuid');

const PORT=8085;
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const router=express.Router();
app.use("/",router);

app.listen(PORT,()=>{
    console.log(`Running this page ${PORT}.`)
});

var URL="https://crudcrud.com/api/a4258f667aaa4be1aa03adbffb0d34fc/users";





//joi input validation

const Joi=require('joi');
const { object } = require('joi');
const {validateSignup}=require('./validate');

app.post("/signup", (req, res) => {
    const { error, value } = validateSignup(req.body);
  
    if (error) {
      console.log(error);
      return res.send(error.details);
    }
    res.send("Successfully signed up!");
    console.log(value);
  })




//Database connect and api used

const Pool=require('pg').Pool;
const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'sabariz31',
    port:5432,
})

app.get('/',(req,res)=>{
    pool.query('select * from employee',(error,result)=>{
        if(error){
            throw error
        }
        res.status(200).json(result.rows);
    })
})

app.get('/m',(req,res)=>{
    pool.query('',(error,result)=>{
        if(error){
            throw error
        }
        res.status(200).json(result.rows);
    })
})





//Middleware 

app.get("/",(req,res)=>{
    res.json({messege:"this is store page",
              name:"sabari"
    })
});

const From=function(req,res,next){
    console.log("from");
    next();
}
app.use(From)

app.get('/e',(req,res)=>{
    res.send('Hello World');
});

function logoriginalUrl(req,res,next){
    console.log("Url :",req.originalUrl);
    next();
}

function logmethod(req,res,next){
    console.log("Type :",req.method);
    
    next();
}
  
const A=[logoriginalUrl];

app.get("/user",A,(req,res,next)=>{
    res.send('user info');
});

app.get("/user",A,(req,res,next)=>{
    console.log("welcome");
})

const B=logmethod;
app.post('/user',B,(req,res,next)=>{
    console.log("this  - :",req.body);
    // res.redirect('/');
});
app.use('/',(req,res,next)=>{
    console.log("dfghj");
});





//3rd parth API call

//View the records

app.get("/users",(req,res)=>{
    axios.get(URL)
    .then((result)=>{
        console.log("The respose is :",result.data);
        res.send(result.data);
    })
    .catch((err)=>{
        console.log("error :",err);
    })
    res.statusCode=200;
})
 

app.get("/users/:id",(req,res)=>{
    const id=req.params.id;
    console.log(req.params.id);

    console.log(URL+'/'+id);
    axios.get(URL+'/'+id)
    .then((result)=>{
        console.log("The respose is :",result.data);
        res.send(result.data);
        
    })
    .catch((err)=>{
        console.log("error :",err);
    })
    res.statusCode=200;
})

//Add the record

app.post("/users",(req,res)=>{    
    const body={
        'Name':req.body.Name,
        'age':req.body.age,
    }
    
    axios.post(URL,body)
    .then((result)=>{
        console.log(result.data);
        res.send(result.data);
       
    })
    .catch((err)=>{
        console.log(err)
    })
    res.statusCode=201;
    const result=Joi.validate(req.body,schema);
    res.send(result);
    })


// //Update the record

app.put("/users/:id",(req,res)=>{

    const body={
        'Name':req.body.Name,
        'age':req.body.age,
    }
    const id=req.params.id;
    console.log(req.params.id)
    axios.put(URL+'/'+id,body)
.then((result)=>{
    console.log(result.data);
     res.send(result.data);
     console.log("sabari");
})
.catch((err)=>{
    console.log(err)
})
res.statusCode=200;
})


// //Remove the record

app.delete("/users/:id",(req,res)=>{
    const id=req.params.id;
    axios.delete(URL+'/'+id)
.then((result)=>{
    res.send(result.data);
})
.catch((err)=>{
    console.log(err)
})
res.statusCode=204;
});