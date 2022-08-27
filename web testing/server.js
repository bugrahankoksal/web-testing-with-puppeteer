require("./models/db");

const express = require("express");
const path = require("path");
const expresshandlebars = require("express-handlebars")
const bodyparser = require("body-parser")

require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const controller = require("./controller/controller")

PORT = process.env.PORT
var app = express();

app.use(bodyparser.urlencoded({

    extended:true
}))

app.use(bodyparser.json())

app.set("views", path.join(__dirname, "/views/"))

app.set("view engine", "hbs")

app.engine("hbs", expresshandlebars.engine({
    
    extname: "hbs", 
    defaultLayout : "mainLayout",
    layoutDir : __dirname+"/views/layout"
}))



app.listen(PORT, ()=>{
    console.log("express server started at "+PORT)
    
})


app.use("/", controller);




