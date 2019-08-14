import  express, {Request,Response} from "express"
import mongoose from 'mongoose';
import Book from './model/book.model';
import bodyParser from "body-parser"
const app=express();

const uri="mongodb://localhost:27017/BIBLI02";
app.use(bodyParser.json())
mongoose.connect(uri,(err)=>{
    if(err) console.log(err);
    else console.log("Mongo data base connected successfuly");
})

app.get("/",(req:Request,resp:Response)=>{
    resp.send("Helo express");
});

//affiche tous les livres
app.get("/books",(req:Request,resp:Response)=>{
    Book.find((err,books)=>{
        if(err) resp.status(500).send(err)
        else resp.send(books);
    })
});

//affiche livre par leur id
app.get("/books/:id",(req:Request,resp:Response)=>{
    Book.findById(req.params.id,(err,books)=>{
        if(err) resp.status(500).send(err)
        else resp.send(books);
    })
});

//pagination
app.get("/pbooks/",(req:Request,resp:Response)=>{
    let p:number=parseInt(req.query.page || 1);
    let size:number=parseInt(req.query.size || 5);

    Book.paginate({},{page:p,limit:size},(err,books)=>{
        if(err) resp.status(500).send(err)
        else resp.send(books);
    })
});

//recherche
app.get("/boock-seach/",(req:Request,resp:Response)=>{
    let p:number=parseInt(req.query.page || 1);
    let size:number=parseInt(req.query.size || 5);
    let keyword:string=req.query.kw || '';
    Book.paginate({title:{$regex:".*(?i)"+keyword+".*"}},{page:p,limit:size},(err,books)=>{
        if(err) resp.status(500).send(err)
        else resp.send(books);
    })
});

app.post("/books",(req:Request,resp:Response)=>{
    let book =new Book(req.body);
    book.save(err=>{
        if(err) resp.status(500).send(err);
        else resp.send(book);
    })
});


app.put("/books/:id",(req:Request,resp:Response)=>{
    //let book =new Book(req.body);
    Book.findByIdAndUpdate(req.params.id,req.body,(err,books)=>{
        if(err) resp.status(500).send(err);
        else resp.send("Modification effectuer");
    })
});

app.delete("/books/:id",(req:Request,resp:Response)=>{
    
    Book.findByIdAndDelete(req.params.id,(err,books)=>{
        if(err) resp.status(500).send(err);
        else resp.send("Suppression du livre");
    })
});


app.listen(8085,()=>{
    console.log("Le serve est lence");
})