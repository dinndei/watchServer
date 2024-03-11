import express  from "express";
import * as productController  from "../controllers/product.js";
import {authenticateAdmin,authenticate} from '../middlewear/auth.js'
const router=express.Router();
router.get("/",productController.getAllProductes)
router.get("/:id",productController.getProductByID)
router.delete("/:id",authenticateAdmin,productController.deleteProduct)
router.put("/:id",authenticateAdmin,productController.updateProduct)
router.post("/",authenticateAdmin,productController.addProduct)
export default router;