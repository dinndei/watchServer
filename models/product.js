import mongoose from 'mongoose'
import Joi from 'joi';
const productSchema=mongoose.Schema({
   prodName:{type:String},
   description:{type:String},
   ManufacturDate:{type:Date},
   imgUrl:{type:String},
   price:{type:Number}
})
const minimalProductSchema=mongoose.Schema({
   prodName:{type:String},
   imgUrl:{type:String},
   price:{type:Number},
   amnt:{type:Number}

 })



export const productValidator=(_productToValidate)=>{
const productSchema=Joi.object({
   prodName:Joi.string().required(),
   description:Joi.string().min(10).max(1000),
   ManufacturDate:Joi.date(),
   imgUrl:Joi.string(),
   price:Joi.number().min(0).required()
})
return productSchema.validate(_productToValidate, {allowUnknown:true});

}
export const validateMinProduct=(_minProductToValidate)=>{
const minimalProductSchema=Joi.object({
    prodName:Joi.string().required(),
    imgUrl:Joi.string(),
    price:Joi.number().min(0),
    amnt:Joi.number().min(0)

 })
 return minimalProductSchema.validate(_minProductToValidate);
}

export const Product=mongoose.model("product",productSchema)
export const MinimalProduct=mongoose.model("minimalProduct",minimalProductSchema)