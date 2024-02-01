import express  from "express";
import * as orderController  from "../controllers/order.js";
import {authenticateAdmin,authenticate} from '../middlewear/auth.js'
const router=express.Router();
router.get("/",authenticateAdmin,orderController.getAllOrders)
router.get("/:userID",authenticate,orderController.getAllOrdersforUser)
router.delete("/:id",authenticate,orderController.deleteOrder)
router.put("/:id",authenticateAdmin,orderController.updateOrderIsOut)
router.post("/",authenticate,orderController.addOrder)
export default router;
