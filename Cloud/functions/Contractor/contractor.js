const axios = require("axios");
const { validateSignup } = require('../Contractor/validate');

const URL = "https://crudcrud.com/api/8d296bc01de04342902ce043abc8e0f0/users";

const contractorGetAll = ((req, res) => {
    const req_data = req.body
    const { error, value } = validateSignup(req_data)
    if (error) {
        console.log(error);
        return res.send(error.details)
    }
    axios.get(URL, value)
        .then((result) => {
            console.log("getAll :", result.data)
            res.send(result.data)
        })
        .catch((error) => {
            console.log(error)
        })
})

const contractorId = ((req, res) => {
    const req_data = req.body
    const { error, value } = validateSignup(req_data)
    if (error) {
        console.log(error);
        return res.send(error.details)
    }
    const id = req.params.id;
    axios.get(URL + '/' + id, value)
        .then((result) => {
            console.log("getId :", result.data)
            res.send(result.data)
        })
        .catch((error) => {
            console.log(error)
        })
})

const contractorAdd = ((req, res) => {
    const req_data = req.body
    const { error, value } = validateSignup(req_data)
    if (error) {
        console.log(error);
        return res.send(error.details)
    }

    axios.post(URL, value)
        .then((result) => {
            res.send(result.data);
            console.log("The response :", result.data);

        })
        .catch((err) => {
            console.log("error :", err);
        })
})

const contractorUpdate = ((req, res) => {
    const req_data = req.body
    const { error, value } = validateSignup(req_data)
    if (error) {
        console.log(error)
        return res.send(error.details)
    }
    const id = req.params.id;
    // console.log(id)   
    axios.put(URL + '/' + id, value)
        .then((result) => {
            res.send(result.data)
            console.log("update value :", result.data)
        })
        .catch((error) => {
            console.log(error)
        })
})

const contractorDelete = ((req, res) => {
    const req_data = req.body;
    const { error, value } = validateSignup(req_data)
    if (error) {
        console.log(error)
        return res.send(error.details)
    }
    const id = req.params.id
    axios.delete(URL + '/' + id)
        .then((result) => {
            res.send(result.data);
            console.log("Delete user");
        })
        .catch((err) => {
            console.log("error :", err)
        })
})

module.exports = {
    contractorGetAll,
    contractorId,
    contractorAdd,
    contractorUpdate,
    contractorDelete
}