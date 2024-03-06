import express  from "express";
import * as opinionController  from "../controllers/opinion.js";
import {authenticateAdmin,authenticate} from '../middlewear/auth.js'
const router=express.Router();
router.get("/",authenticateAdmin,opinionController.getAllOpinions)
router.post("/",authenticate,opinionController.addOpinion)
export default router;
