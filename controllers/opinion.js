import { Opinion } from "../models/opinion.js";
export const getAllOpinions = async (req, res) => {
    try {
        let allOps = await Opinion.find({});
        res.json(allOps);
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in get all orders");
    }
}
export const addOpinion = async(req, res) => {
    try {
        let { opinion,rank } = req.body;
        let newOp= new Opinion({opinion,rank})
        await newOp.save();
        res.status(200).send();
    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in add new opinion");
    }
}
