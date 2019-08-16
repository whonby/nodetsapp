import mongoose from 'mongoose';

/*mongoose.connect(uri,(err)=>{
    if(err) console.log(err);
    else console.log("Mongo data base connected successfuly");
});*/

async function database(){
    const uri="mongodb://localhost:27017/BIBLI02";
    try{
       await mongoose.connect(uri,{
           useNewUrlParser:true
       });
       console.log(">>> Connection etablie a la base de donnée....")
    }catch(e) {
        console.log(e);
    }

}

export default database;
