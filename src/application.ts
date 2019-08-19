import express from "express";
import exphbs from "express-handlebars";
import * as path from "path";
import bodyParser from "body-parser";
const route=require("./router/web");
class Application {
    app:express.Application;

    constructor(){
        this.app=express();
        this.setting();
        this.middlewares();
        this.route();

    }

    setting(){
        try {
            this.app.set("port",3000);

            this.app.set('views',path.resolve(__dirname,"views"));
            this.app.engine(".hbs",exphbs({
                layoutsDir:path.resolve(this.app.get("views"),"layouts"),
                partialsDir:path.resolve(this.app.get("views"),"partials"),
                defaultLayout:"template",
                extname:".hbs"
            }));
            this.app.set("view engine",".hbs");
        }catch(e){
            console.log(e)
        }

    }

    middlewares(){
        this.app.use(bodyParser.json());

    }

    route(){
        this.app.use(route);
        this.app.use(express.static(path.resolve(__dirname,"public")));
    }

    start(){
        this.app.listen(this.app.get("port"),()=>{
            console.log("Serveur est lance", this.app.get("port"));
        });
    }
}

export default Application;