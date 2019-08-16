//require("./database/database");
import database from "./database/database";
import  express, {Request,Response} from "express";
import bodyParser from "body-parser";
const route=require("./router/web");

database();
const app=express();


app.use(bodyParser.json());


app.get("/",(req:Request,resp:Response)=>{
    resp.send("Helo express");
});



app.listen(8085,()=>{
    console.log("Le serve est lence");
});


app.use(route);