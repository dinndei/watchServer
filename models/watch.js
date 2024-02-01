import mongoose from 'mongoose'
import Joi from 'joi';
const watchSchema=mongoose.Schema({
   prodName:{type:String},
   description:{type:String},
   ManufacturDate:{type:Date},
   imgUrl:{type:String},
   price:{type:Number}
})
const minimalWatchSchema=mongoose.Schema({
   prodName:{type:String},
   imgUrl:{type:String},
   price:{type:Number}
 })



export const watchValidator=(_watchToValidate)=>{
const watchSchema=Joi.object({
   prodName:Joi.string().required(),
   description:Joi.string().min(10).max(30),
   ManufacturDate:Joi.date(),
   imgUrl:Joi.string(),
   price:Joi.number().min(0).required()
})
return watchSchema.validate(_watchToValidate);
}
export const validateMinWatch=(_minWatchToValidate)=>{
const minimalWatchSchema=Joi.object({
    prodName:Joi.string().required(),
    imgUrl:Joi.string(),
    price:Joi.number().min(0)
 })
 return minimalWatchSchema.validate(_minWatchToValidate);
}

export const Watch=mongoose.model("watch",watchSchema)
export const MinimalWatch=mongoose.model("minimalWatch",minimalWatchSchema)