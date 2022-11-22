const admin=require('../admin');

const signup=(async(req,res)=>{
    const user={
        email:req.body.email,
        password:req.body.password,
    }
    const userRes=await admin.auth().createUser({
        email:user.email,
        password:user.password,
        emailVerified:false,
        disabled:false
    })
    res.json(userRes);  
})


// const signin=((req,res)=>{
//     // const body={
//     //     'idToken':req.body.idToken
//     // }
//     // console.log(body.idToken)
//     //    admin.auth()
//     //    .verifyIdToken(body.idToken)
//     //    .then((decodedToken)=>{
//     //     const a={
//     //      uid:decodedToken.uid,
//     //      email:decodedToken.email
//     // }
//     //     console.log(a);
//     //     res.json(a);
//     //    })
//     //    .catch((err)=>{
//     //     console.log('err :',err)
//     //    })  

    
//     // const  idToken=req.headers.token;
//     //     // console.log(idToken)
//     // if(idToken==null ){
//     //     res.status(401).json({"message":"Empty token"})
//     // }
//     // else{
//     //     admin.auth()
//     //     .verifyIdToken(idToken)
//     //     .then((decodedToken)=>{
//     //         const a={
//     //         'uid':decodedToken.uid,
//     //         'email':decodedToken.email
//     //     }
//     //         console.log(a);
//     //         res.json(a);
//     //     })
//     //     .catch((err)=>{
//     //         console.log('err :',err)
//     //         res.status(401).json({"message":"Missing token"})
//     //     })
        
//     // } 
//     console.log("woring in signin")
//     res.json({"message":"woring in signin"})
// })

module.exports=signup;