import  express, {Request,Response} from "express";
const router = express.Router();
import RouteService from "../config/routeService"
const BookController=require("../http/controller/BookController");

const route=new RouteService;
route.getAction("/booksliste","BookController@index");
console.log(BookController.index);
router.get("/",(req:Request,resp:Response)=>{
    resp.render("index");
});
router.get('/books', BookController.index);
router.get('/books/:id', BookController.show);
router.get('/pbooks/', BookController.allPagine);
router.get('/boock-seach/', BookController.recherche);
router.post('/books', BookController.store);
router.put('/books/:id', BookController.update);
router.delete('/delete/:id', BookController.delete);

module.exports = router;

