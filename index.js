import express from "express";
import { config } from "dotenv";
import  productrouter from "./routes/product.js";
import userrouter from "./routes/user.js";
import orderrouter from "./routes/order.js";
import oprouter from "./routes/opinion.js";
import mongoose from "mongoose";
import { connectToDB } from './config/dbConfig.js';
import cors from "cors";
import { errorHandling } from "./middlewear/errorHandling.js";
config();
connectToDB();
const app = express();
app.use(cors());
app.use(express.json())
app.use("/product", productrouter)
app.use("/user", userrouter)
app.use("/order", orderrouter)
app.use("/opinion", oprouter)
app.use( express.static('/images'));
let port = process.env.PORT || 5000;
app.listen(port, console.log(`app is listening on port ${port}`));
app.use(errorHandling);