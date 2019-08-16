"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = __importDefault(require("../../model/book.model"));
class BookController {
    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
    index(req, resp) {
        book_model_1.default.find((err, books) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(books);
        });
    }
    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
    show(req, resp) {
        book_model_1.default.findById(req.params.id, (err, books) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(books);
        });
    }
    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
    allPagine(req, resp) {
        let p = parseInt(req.query.page || 1);
        let size = parseInt(req.query.size || 5);
        book_model_1.default.paginate({}, { page: p, limit: size }, (err, books) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(books);
        });
    }
    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
    recherche(req, resp) {
        let p = parseInt(req.query.page || 1);
        let size = parseInt(req.query.size || 5);
        let keyword = req.query.kw || '';
        book_model_1.default.paginate({ title: { $regex: ".*(?i)" + keyword + ".*" } }, { page: p, limit: size }, (err, books) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(books);
        });
    }
    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
    store(req, resp) {
        let book = new book_model_1.default(req.body);
        book.save(err => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(book);
        });
    }
    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
    update(req, resp) {
        //let book =new Book(req.body);
        book_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, books) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send("Modification effectuer");
        });
    }
    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
    delete(req, resp) {
        book_model_1.default.findByIdAndDelete(req.params.id, (err, books) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send("Suppression du livre");
        });
    }
}
let instance;
if (!(typeof instance instanceof BookController)) {
    instance = new BookController;
}
module.exports = instance;
