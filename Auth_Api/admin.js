require('dotenv').config()

var admin = require("firebase-admin");

var serviceAccount = {
  type:process.env.firebase_type,
    project_id:process.env.firebase_project_id,
    private_key_id:process.env.firebase_private_key_id,
    private_key:process.env.firebase_private_key.replace(/\\n/g, '\n'),
    client_email:process.env.firebase_client_email,
    client_id:process.env.firebase_client_id,
    auth_uri:process.env.firebase_auth_uri,
    token_uri:process.env.firebase_token_uri,
    auth_provider_x509_cert_url:process.env.firebase_auth_provider_x509_cert_url,
    client_x509_cert_url:process.env.firebase_client_x509_cert_url
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports=admin;
