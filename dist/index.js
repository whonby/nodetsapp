"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("./model/book.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const uri = "mongodb://localhost:27017/BIBLI02";
app.use(body_parser_1.default.json());
mongoose_1.default.connect(uri, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Mongo data base connected successfuly");
});
app.get("/", (req, resp) => {
    resp.send("Helo express");
});
//affiche tous les livres
app.get("/books", (req, resp) => {
    book_model_1.default.find((err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
    });
});
//affiche livre par leur id
app.get("/books/:id", (req, resp) => {
    book_model_1.default.findById(req.params.id, (err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
    });
});
//pagination
app.get("/pbooks/", (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 5);
    book_model_1.default.paginate({}, { page: p, limit: size }, (err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
    });
});
//recherche
app.get("/boock-seach/", (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 5);
    let keyword = req.query.kw || '';
    book_model_1.default.paginate({ title: { $regex: ".*(?i)" + keyword + ".*" } }, { page: p, limit: size }, (err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
    });
});
app.post("/books", (req, resp) => {
    let book = new book_model_1.default(req.body);
    book.save(err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
app.put("/books/:id", (req, resp) => {
    //let book =new Book(req.body);
    book_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Modification effectuer");
    });
});
app.delete("/books/:id", (req, resp) => {
    book_model_1.default.findByIdAndDelete(req.params.id, (err, books) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Suppression du livre");
    });
});
app.listen(8085, () => {
    console.log("Le serve est lence");
});
