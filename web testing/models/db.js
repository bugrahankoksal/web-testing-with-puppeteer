const mongoose = require("mongoose")
    

mongoose.connect("mongodb://localhost:27017/newdatabase", {useNewUrlParser : true}, (err)=> {
    if (!err){console.log("mongodb connected")}
    else{console.log(err+"mongodb error")}
})          


require("./user_model");



