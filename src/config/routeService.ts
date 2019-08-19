import  express, {Request,Response} from "express";
import * as path from "path";
class RouteService{
//private cheminController=  path.resolve(__dirname,"http/controller");
    router:any;

    constructor(){
        this.router=express.Router();
    }
      getAction(route:any,action:any){


              let tablController=action.split("@");
              let controller=this.getCheminContronller()+"/"+tablController[0]+"."+tablController[1];
              let methode=tablController[1];
          const AllControler=require("../http/controller/"+tablController[0]);
          var c=AllControler+"."+methode;
             /* console.log("Controller :"+AllControler);
          console.log("Control :"+c);
          console.log("acion: "+route);*/

          //this.router.get(route,AllControler);
          //console.log(this.getCheminContronller()+"/"+"Roland")


      }



      getCheminContronller(){
          return path.resolve(__dirname,"http/controller");
      }
}

export default RouteService;