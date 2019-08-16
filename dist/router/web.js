"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// We load the controller here
const BookController = require("../http/controller/BookController");
// Show index
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
