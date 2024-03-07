import { Order, orderValidator } from "../models/order.js";
import mongoose from 'mongoose';
import { MinimalWatch } from "../models/watch.js";
export const getAllOrders = async (req, res) => {
    try {
        let allOrders = await Order.find({});
        res.json(allOrders);
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in get all orders");
    }
}
export const addOrder = async (req, res) => {
   try {  const { ordDate,dueDate, address, produtsInOrder } = req.body
    let { id} = req.user;
    let userID=id;
    const { error } = orderValidator({ dueDate, address, produtsInOrder, userID });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    ///new
    produtsInOrder.array.forEach(element => {
      let {error}=MinimalWatchValidator(element);
      if (error) {
        return res.status(400).send(error.details[0].message);
    }
    });
   ///caution
        let newOrder = new Order({ userID, dueDate, address, produtsInOrder, ordDate})
        await newOrder.save()
        res.json(newOrder)
    }
    catch(error) {
        console.error(error)
        res.status(400)
        res.send(err.message)
    }

}
export const deleteOrder = async (req, res) => {
    try {

        if (req.user.role == "USER" && req.user.id != userID)
            return res.status(400).send("not your order");
        const { id } = req.params
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id not mongoose pattern");
        let orderWithID = await Order.findById(id);
        if (!orderWithID)
            return res.status(404).send("no order with this id to delete");
        if (orderWithID.isOut)
            return res.status(400).send("order sent allready");
            await Order.findByIdAndDelete(id);

        res.json(orderWithID)

    }
    catch (error){
        console.error(error)
        res.status(400).send("error in deleting order");
    }
}
export const getAllOrdersforUser = async (req, res) => {
    try {
        const { userID } = req.params;
        let searchObject={};
        searchObject.userID=userID;
        let allOrdersByUserID = await Order.find(searchObject );
        res.json(allOrdersByUserID);
    }
    catch(error) {
        console.error(error)
        res.status(400).send("error in getAllOrdersforUser");
    }
}
export const updateOrderIsOut = async (req, res) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id not mongoose fitting");
    try {
        const updatedDocument = await Order.findByIdAndUpdate(id, { isOut: true }, { new: true })
        res.json(updatedDocument)
    }
    catch (error){
        console.error(error)
        res.status(400).send("error in send order out");
    }

}


