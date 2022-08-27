     
     const express = require("express")
    const mongoose = require("mongoose");
    const User = mongoose.model("User")
    var router = express.Router();
    

router.get("/", (req,res)=>{

    res.render("user/addOrEdit",{   
        title : "anasayfadan geldim"
        
    })
})


router.post("/", (req,res)=>{
    
    if (req.body._id == "") 
    {   console.log("inserting")
        insertRecord(req,res)}

    else 
    {console.log("updating");
        updateRecord(req,res)}
    

})

function updateRecord(req,res){

    User.findOneAndUpdate({_id : req.body._id},req.body, {new:true},  (err,doc)=>{
        if(!err ){ 
            res.redirect("/list" )}
        else {console.log("update error")}
    }).lean()
}
function insertRecord(req,res){


    var user = new User();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.city = req.body.city;
    user.save((err,doc) => {
        if(!err){
            res.redirect("/list")}
        else {console.log("mongodb saving error")}
    })

}


router.get("/list", (req,res)=>{

    User.find((err,docs)=>{
        if(!err){
            
            res.render("user/list", {docs})
        }
        else{ console.log("kardesim yanlisin var, en yakin zamanda duzeltmeni temenni ediyorum.")}
    }).lean()
})

router.get( "/:id", (req,res) => {
    User.findById(req.params.id, (err,doc)=>{
        res.render("user/addOrEdit",{
            title : "findbyid den geldim",
            docs: doc
        })

    }).lean()


}
)




router.get("/delete/:id", (req,res)=>{

    User.findByIdAndDelete(req.params.id , (err,doc) => {
        res.redirect("/list")
    })
})


module.exports = router


