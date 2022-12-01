const Joi = require('joi').extend(require('@joi/date'));


const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });


const signupSchema = Joi.object({
    company_id: Joi.number().integer().required().options({ convert: false }),
    load_part: Joi.string().required(),
    unload_part: Joi.string().required(),
    contract_value: Joi.number().integer().required().options({ convert: false }),
    start_date: Joi.date().format('YYYY-MM-DD').raw().greater(Date.now()).iso().required(),
    end_date: Joi.date().format('YYYY-MM-DD').raw()
        .ruleset.greater(Joi.ref('start_date'))
        .rule({ message: 'end_date must be greater than start_date' }).required(),
    ship_name: Joi.string().required(),
    carge_name: Joi.string().required(),
})

exports.validateSignup = validator(signupSchema);
// module.exports=signupSchema
