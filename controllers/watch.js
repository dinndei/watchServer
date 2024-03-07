import { Watch, watchValidator } from "../models/watch.js";
import mongoose from 'mongoose';
export const getAllWatches = async (req, res) => {
    const { searchProdName, searchProdDesc, page, perPage, price } = req.query;
    try {
        let searchObject = {}
        if (price)
            searchObject.price = price
        if (searchProdName)
            searchObject.prodName = new RegExp(searchProdName, "i")
        if (searchProdDesc)
            searchObject.description = new RegExp(searchProdDesc, "i")
        let allWatch = await Watch.find(searchObject)
            .sort({ price: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(allWatch)
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in get all watches");
    }
}
export const getWatchByID = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id not mongoose fitting");
        let watchWithID = await Watch.findById(id)
        if (!watchWithID)
            return res.status(404).send("no watch with this id");
        res.json(watchWithID)
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in get watch by id");
    }
}
export const addWatch = async (req, res) => {
    const { prodName, description, ManufacturDate, imgUrl, price } = req.body
    const { error } = watchValidator({ prodName, description, ManufacturDate, imgUrl, price });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let newWatch = new Watch({ prodName, description, ManufacturDate, imgUrl, price })
    try {
        await newWatch.save()
        res.json(newWatch)
        
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in add watch");
    }
}
export const deleteWatch = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id not mongoose fitting");
        let watchWithID = await Watch.findByIdAndDelete(id)
        if (!watchWithID)
            return res.status(404).send("no watch with this id to delete");
        res.json(watchWithID)

    }
    catch (error){
        console.error(error)
        res.status(400).send("error in delete watch");
    }
}
export const updateWatch = async (req, res) => {
    const { prodName, description, ManufacturDate, imgUrl, price } = req.body
    const { id } = req.params
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id not mongoose fitting");
    try {
        let toUpdate = await Watch.findById(id)
        if(!toUpdate)
        return res.status(404).send("watch not found")
            toUpdate.prodName = prodName||toUpdate.prodName
            toUpdate.description = description||toUpdate.description
            toUpdate.ManufacturDate = ManufacturDate||toUpdate.ManufacturDate
            toUpdate.imgUrl = imgUrls||toUpdate.imgUrl
            toUpdate.prodName = prodName||toUpdate.prodName
            toUpdate.price = price||toUpdate.price
    
        const { error } = watchValidator(toUpdate);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const updatedDocument = await Watch.findByIdAndUpdate(id, toUpdate, { new: true })
        res.json(updatedDocument)
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in update watch");
    }

}

