
require('dotenv').config({path:"./server.env"})
const mongoose = require("mongoose")
    
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser : true}, (err)=> {
    if (!err){console.log("mongodb connected")}
    else{console.log(err+"mongodb error")}
})     


var eventSchema = new mongoose.Schema({

    action : {
        type: String,
        
    },

    formInput : {
        type: String,

    }


});


mongoose.model("event", eventSchema);






