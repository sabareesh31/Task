const pool=require('../Config/config');
const admin=require('../admin');

const authmiddleware=function(req,res,next){
    const  idToken=req.headers.token;  
    // console.log(idToken)  

    if(idToken==null || idToken == ""){
        res.status(401).json({"message":"Empty token"})
    }
    else{
        admin.auth()
        .verifyIdToken(idToken)
        .then((decodedToken)=>{
            var a={
            'uid':decodedToken.uid,
            'email':decodedToken.email,
        }
            console.log(a);
            // res.json(a);
            req.us=a.uid;
            next();
        })  
        
        .catch((err)=>{
            console.log('err :',err)
            res.status(401).json({"message":"User Not Mapping"})
        })  
         
    } 
      
    
}
// app.use(authmiddleware);

const user=function(req,res,next){
//    console.log("req.us :",req.us)
   const us=req.us;
    pool.query("select * from users where users_fbuid=$1",[us],(error,result)=>{
        if(error){
                    console.log('error :',error) 
                }
                else{
                // res.status(200).json(result.rows);
                console.log("Running middleware");
                next();
            }
    })
    
}
// app.use(user);


module.exports ={
    authmiddleware,user 
};