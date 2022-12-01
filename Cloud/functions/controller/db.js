
const pool = require('../Config/config');


const dashboard = ((req, res) => {

    console.log("using the middleware function in dashboard")
    // res.json({"message":"using the middleware function in dashboard API"})

    const us = req.us;
    // console.log(us);

    pool.query("select company.company_id,company.company_name,users.users_name,usersroles.roles_id,roles.roles_name from company inner join users on company.company_id=users.users_id inner join usersroles on company.company_id=usersroles.ur_id inner join roles on company.company_id=roles.roles_id where users.users_fbuid=$1;", [us], (error, result) => {

        if (error) {
            console.log('error :', error)
        }
        else {
            // res.status(200).json(result.rows);
            const my = result.rows;
            let d = my.map((val) => {
                return val.roles_name;
            })
            console.log(d);
            res.json({ "greetings": "Hi " + d, my })
            console.log(result.rows)


        }
    })

})


//permisssion layer using array

const userid = ((req, res) => {
    const id = req.params.id;
    // console.log("user.id :",id)
    const us = req.us
    //    console.log(us);
    pool.query("select company.company_id,company.company_name,users.users_name,usersroles.roles_id,roles.roles_name from company inner join users on company.company_id=users.users_id inner join usersroles on company.company_id=usersroles.ur_id inner join roles on company.company_id=roles.roles_id where users.users_fbuid=$1;", [us], (error, result) => {

        if (error) {
            console.log('error :', error)
        }
        else {
            // res.status(200).json(result.rows);
            console.log(result.rows)
            const userid = result.rows;

            let d = userid.map((val) => {
                return val.company_id;
            })
            console.log(d)


            if (d == id) {

                pool.query("select * from users where company_id=$1;", [id], (error, result) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        // console.log(result.rows)
                        res.json(result.rows);
                        console.log('i am user')
                    }
                })
            }
            else if (d == null || d == "") {
                console.log(" not in db")
                res.status(401).json("Not our database")
            }
            else {
                console.log("i am not user")
                res.status(401).json({ "message": "Not authorizing" })
                return
            }
        }
    });



    console.log("using the middleware function user id")
    // res.json({"message":"using the middleware function in user/id API"})

})



module.exports = {
    dashboard, userid,
    // AdminAllow
}