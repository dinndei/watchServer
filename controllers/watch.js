import { Watch, watchValidator } from "../models/watch.js";
import mongoose from 'mongoose';
export const getAllWatches = async (req, res) => {
    const { searchProdName, searchProdDesc, page, perPage = 5, price } = req.query;
    try {
        let searchObject = {}
        if (price)
            searchObject.price = price
        if (searchProdName)
            searchObject.searchProdName = new RegExp(searchProdName, "i")
        if (searchProdDesc)
            searchObject.searchProdDesc = new RegExp(searchProdDesc, "i")
        let allWatch = await Watch.find(searchObject)
            .sort({ price: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(allWatch)
    }
    catch {
        res.status(400).send("error in getAllWatches");
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
    catch {
        res.status(400).send("error in getWatchByID");
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
        res.send("watch added successfully")
    }
    catch {
        res.send("error in addWatch")
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
    catch {
        res.status(400).send("error in deleteWatch");
    }
}
export const updateWatch = async (req, res) => {
    const { prodName, description, ManufacturDate, imgUrl, price } = req.body
    const { id } = req.params
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id not mongoose fitting");
    try {
        let toUpdate = {}
        if (prodName)
            toUpdate.prodName = prodName
        if (description)
            toUpdate.description = description
        if (ManufacturDate)
            toUpdate.ManufacturDate = ManufacturDate
        if (imgUrl)
            toUpdate.imgUrl = imgUrl
        if (price)
            toUpdate.price = price
        const { error } = watchValidator(toUpdate);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const updatedDocument = await Watch.findByIdAndUpdate(id, toUpdate, { new: true })
        res.json(updatedDocument)
    }
    catch {
        res.send("error in addWatch")
    }

}

