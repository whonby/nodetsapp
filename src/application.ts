import express from "express"

class Application {
    app:express.Application;

    constructor(){
        this.app=express();
    }
}