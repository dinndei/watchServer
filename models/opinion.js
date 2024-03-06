import mongoose from 'mongoose'
import Joi from 'joi';
const opinionSchema = mongoose.Schema({
   opinion: String,
   rank: Number,
}, { timestamps: true })

export const opinionValidator = (_opinionToValidate) => {
   let opinionJoi = Joi.object({
    opinion: Joi.string(),
    rank:Joi.number().min(0)

      
   })

   return opinionJoi.validate(_opinionToValidate);
}

export const Opinion = mongoose.model("opinion", opinionSchema);