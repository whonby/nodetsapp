import database from "./database/database";
import App from "./application";

database();
const app=new App();
app.start();




