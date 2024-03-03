import mongoose from 'mongoose'
import Joi from 'joi';
import * as roleTypes from './roleTypes.js'

const userSchema = mongoose.Schema({
     userName:{type:String},
     email:{type:String},
    passward:{type:String},
    role:{type:String,default:roleTypes.USER},
    signInDate: { type: Date, default: new Date() }
}, { timestamps: true })

export const userValidator = (_userToValidate) => {
    let userJoi = Joi.object({
    userName:Joi.string().required(),
    email: Joi.string().email().required(),
    passward:Joi.string().regex(/[0-9]{2}[a-zA-Z]{2}/).required(),
    role:Joi.string(),
    signInDate:Joi.date()
})
return userJoi.validate(_userToValidate);
}
export const User=mongoose.model("user",userSchema)