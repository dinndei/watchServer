import express  from "express";
import * as watchController  from "../controllers/watch.js";
import {authenticateAdmin,authenticate} from '../middlewear/auth.js'
const router=express.Router();
router.get("/",watchController.getAllWatches)
router.get("/:id",watchController.getWatchByID)
router.delete("/:id",authenticateAdmin,watchController.deleteWatch)
router.put("/:id",authenticateAdmin,watchController.updateWatch)
router.post("/",authenticateAdmin,watchController.addWatch)
export default router;