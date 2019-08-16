import Book from "../../model/book.model"

class BookController {
    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */

    index(req, resp){
        Book.find((err,books)=>{
            if(err) resp.status(500).send(err)
            else resp.send(books);
        })
    }

    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
     show(req,resp){
        Book.findById(req.params.id,(err,books)=>{
            if(err) resp.status(500).send(err)
            else resp.send(books);
        })
    }

    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */

     allPagine(req,resp){
        let p:number=parseInt(req.query.page || 1);
        let size:number=parseInt(req.query.size || 5);

        Book.paginate({},{page:p,limit:size},(err,books)=>{
            if(err) resp.status(500).send(err)
            else resp.send(books);
        })
    }

    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
     recherche(req,resp){
        let p:number=parseInt(req.query.page || 1);
        let size:number=parseInt(req.query.size || 5);
        let keyword:string=req.query.kw || '';
        Book.paginate({title:{$regex:".*(?i)"+keyword+".*"}},{page:p,limit:size},(err,books)=>{
            if(err) resp.status(500).send(err)
            else resp.send(books);
        })
    }

    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */

     store(req,resp){
        let book =new Book(req.body);
        book.save(err=>{
            if(err) resp.status(500).send(err);
            else resp.send(book);
        })
    }

    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
     update(req,resp){
        //let book =new Book(req.body);
        Book.findByIdAndUpdate(req.params.id,req.body,(err,books)=>{
            if(err) resp.status(500).send(err);
            else resp.send("Modification effectuer");
        })
    }

    /**
     *
     * @param  {Object} resp
     * @param  {Object} req
     * @return {*}
     */
    delete(req,resp){
        Book.findByIdAndDelete(req.params.id,(err,books)=>{
            if(err) resp.status(500).send(err);
            else resp.send("Suppression du livre");
        })
    }



}

let instance;

if (!(typeof instance instanceof BookController)) {
    instance = new BookController;
}

module.exports = instance;
