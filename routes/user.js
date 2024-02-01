import express  from "express";
import * as userController  from "../controllers/user.js";
import {authenticateAdmin,authenticate} from '../middlewear/auth.js'
const router=express.Router();
router.get("/",authenticateAdmin,userController.getAllUsers)
router.post("/",userController.addUser)
router.post("/login",userController.logIn)
export default router;