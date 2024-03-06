import mongoose from 'mongoose'
import Joi from 'joi';
import { MinimalWatch } from './watch.js'
const orderSchema = mongoose.Schema({
   ordDate:{ type: Date, default: new Date() } ,
   dueDate: Date,
   address: Object,
   userID: String,
   produtsInOrder: Array,
   isOut:{type:Boolean,default:false}
}, { timestamps: true })

export const orderValidator = (_orderToValidate) => {
   let orderJoi = Joi.object({
      ordDate: Joi.date(),
      dueDate: Joi.date().required(),
      address: { city: Joi.string().required(), road: Joi.string().required(), number: Joi.number().required() },
      userID: Joi.string().required(),
      produtsInOrder: Joi.array().items().required(),
      isOut: Joi.boolean(),
      
   })

   return orderJoi.validate(_orderToValidate);
}

export const Order = mongoose.model("order", orderSchema);