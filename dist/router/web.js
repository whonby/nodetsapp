"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const routeService_1 = __importDefault(require("../config/routeService"));
const BookController = require("../http/controller/BookController");
const route = new routeService_1.default;
route.getAction("/booksliste", "BookController@index");
console.log(BookController.index);
router.get("/", (req, resp) => {
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
