
const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });


const signupSchema = Joi.object({
  uuid:Joi.string().guid({
    version:['uuidv4','uuidv5']}).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
  confirmPassword: Joi.ref("password"),
  DOB: Joi.date().greater(new Date("2000-01-01")).required(),
  referred: Joi.boolean().required(),
  age:Joi.number().integer().min(18).required(),
  hostname:Joi.string().hostname().required(),
  gender:Joi.string().required().valid('male','female'),
  male:Joi.string().when('gender',{is:'male',then:Joi.required(),otherwise:Joi.optional}),
  female:Joi.string().when('gender',{is:'female',then:Joi.required(),otherwise:Joi.optional})
  
});

exports.validateSignup = validator(signupSchema);

