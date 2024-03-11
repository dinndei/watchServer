import { Product, productValidator } from "../models/product.js";
import mongoose from 'mongoose';
export const getAllProductes = async (req, res) => {
    const { searchProdName, searchProdDesc, page, perPage, price } = req.query;
    try {
        let searchObject = {}
        if (price)
            searchObject.price = price
        if (searchProdName)
            searchObject.prodName = new RegExp(searchProdName, "i")
        if (searchProdDesc)
            searchObject.description = new RegExp(searchProdDesc, "i")
        let allProduct = await Product.find(searchObject)
            .sort({ price: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(allProduct)
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in get all productes");
    }
}
export const getProductByID = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id not mongoose fitting");
        let productWithID = await Product.findById(id)
        if (!productWithID)
            return res.status(404).send("no product with this id");
        res.json(productWithID)
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in get product by id");
    }
}
export const addProduct = async (req, res) => {
    const { prodName, description, ManufacturDate, imgUrl, price } = req.body
    const { error } = productValidator({ prodName, description, ManufacturDate, imgUrl, price });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let newProduct = new Product({ prodName, description, ManufacturDate, imgUrl, price })
    try {
        await newProduct.save()
        res.json(newProduct)
        
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in add product");
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id not mongoose fitting");
        let productWithID = await Product.findByIdAndDelete(id)
        if (!productWithID)
            return res.status(404).send("no product with this id to delete");
        res.json(productWithID)

    }
    catch (error){
        console.error(error)
        res.status(400).send("error in delete product");
    }
}
export const updateProduct = async (req, res) => {
    const { prodName, description, ManufacturDate, imgUrl, price } = req.body
    const { id } = req.params
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id not mongoose fitting");
    try {
        let toUpdate = await Product.findById(id)
        if(!toUpdate)
        return res.status(404).send("product not found")
            toUpdate.prodName = prodName||toUpdate.prodName
            toUpdate.description = description||toUpdate.description
            toUpdate.ManufacturDate = ManufacturDate||toUpdate.ManufacturDate
            toUpdate.imgUrl = imgUrls||toUpdate.imgUrl
            toUpdate.prodName = prodName||toUpdate.prodName
            toUpdate.price = price||toUpdate.price
    
        const { error } = productValidator(toUpdate);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const updatedDocument = await Product.findByIdAndUpdate(id, toUpdate, { new: true })
        res.json(updatedDocument)
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in update product");
    }

}

