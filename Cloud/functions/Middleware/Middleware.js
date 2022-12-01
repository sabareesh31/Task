const pool = require('../Config/config');
const admin = require('../admin');



const authmiddleware = function (req, res, next) {
    const idToken = req.headers.token;
    // console.log(idToken)  

    if (idToken == null || idToken == "") {
        res.status(401).json({ "message": "Empty token" })
    }
    else {
        admin.auth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
                var a = {
                    'uid': decodedToken.uid,
                    'email': decodedToken.email,
                }
                console.log(a);
                // res.json(a);
                req.us = (a.uid);

                next();
            })

            .catch((err) => {
                console.log('err :', err)
                res.status(401).json({ "message": "User Not Mapping" })
            })

    }


}
// app.use(authmiddleware);

const user = function (req, res, next) {
    // console.log("req.us :", req.us)
    const us = req.us;
    pool.query("select * from users where users_fbuid=$1", [us], (error, result) => {
        if (error) {
            console.log('error :', error)

        }
        else {
            // res.status(200).json(result.rows);
            // console.log("end:",result.rows);
            if (result.rows == "") {
                res.status(401).send({ "message": "You Are Not in Database" })
                console.log("You Are Not in Database")
            }
            else {
                console.log("Running middleware");

                pool.query("select company.company_id,company.company_name,users.users_name,users.users_id,usersroles.roles_id,roles.roles_name from company inner join users on company.company_id=users.users_id inner join usersroles on company.company_id=usersroles.ur_id inner join roles on company.company_id=roles.roles_id where users.users_fbuid=$1;", [us], (error, result_oo) => {
                    if (error) {
                        console.log("Error :", error)

                    }
                    else {
                        // res.status(200).json(result.rows);
                        // console.log("user :", result_oo.rows);
                        req.user = (result_oo.rows[0])
                        console.log("users", req.user)
                        next();
                    }
                })
            }
        }
    })

}
// app.use(user);


const CheckPermission = (options) => {
    return ((req, res, next) => {
        // console.log("options :", options)
        // req.user
        // console.log("adminallow :", req.user.roles_name)

        if (options.includes(req.user.roles_name)) {
            console.log("Allow the user " + req.user.roles_name)
            next()
        }
        else {
            console.log("Not Allowed ")
            res.send({ "message": "You Are Not Admin User" });
        }
    })
}

const CheckDataPermission = ((req, res, next) => {
    const id = req.params.id
    // console.log(id);
    // console.log("adminallow :", req.user.company_id);
    if (id == req.user.company_id) {
        console.log("allowed");
        next()
    }
    else {
        console.log("Not Allowed ")
        res.send({ "message": "You Are Not Authorizing This Company" });
    }

})


module.exports = {
    authmiddleware,
    user,
    CheckPermission,
    CheckDataPermission
};