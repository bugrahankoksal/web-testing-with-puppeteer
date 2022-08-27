require("./models/db");

const express = require("express");
const path = require("path");
const expresshandlebars = require("express-handlebars")
const bodyparser = require("body-parser")
const controller = require("./controller/controller")
require('dotenv').config({path:'/server.env'})

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


try {
    app.listen(PORT, (err)=>{
        console.log("express started on port "+PORT)
    })
} catch (error) {
    app.listen(3000, (err)=>{
        console.log("express started on port 3000 instead of desired port.")
    })
}


app.use("/", controller);




