     
const mongoose = require("mongoose");
const Event = mongoose.model("event")
const express = require("express");
const puppeteer = require("puppeteer");    
var router = express.Router();
let showValues = [];
const isTestSucceed = 1

router.get("/", (req,res)=>{

    Event.find((err,eventsList)=>{
        if(!err){
            
            res.render("mainpage", {eventsList,showValues,isTestSucceed})
        }
        else{ console.log(err+"error while getting all events")}
    }).lean()
    
 })


 router.post("/", (req,res)=>{

    formInput = req.body.formInput
    action = req.body.selected
    enterFormValue = req.body.enterFormValue

    if(enterFormValue != ""){
        formInput = formInput.concat("+"+enterFormValue)
    }

    event = new Event();

    event.action = action;
    event.formInput = formInput
    event.save((err,doc) => {
        if(!err){
            res.redirect("/")}
        else {console.log(err+"mongodb saving error")}
    })

 })


router.get("/cleanTest", (req,res)=> {

    showValues = [];
    Event.deleteMany({}).then(function(){
        console.log("All events deleted"); 
    }).catch(function(error){
        console.log(error+"Error while cleaning the collection"); 
    });

    res.redirect("/")


})


router.get("/startTest", (req,res)=> {

    Event.find((err,eventsList)=>{
        if(!err){
            
            startTest(eventsList);
            //waiting for async function to finish with setTimeout, needs a better way
            setTimeout(()=>{res.redirect("/")},10000);
            
            
            
        }
        else{ console.log(err+"error while getting all events")}
    }).lean();

})



function startTest(eventsList)
{

try {
      (async()=>{

    
        const browser = await puppeteer.launch({ "headless": true, waitUntil: 'networkidle0'});
    
        const page = await browser.newPage();
    
        
        for (let i = 0; i < eventsList.length; i++) {
    
            if(eventsList[i].action == "goToPage"){
                await page.goto(eventsList[i].formInput);
            }
     
            if(eventsList[i].action == "formInput"){
    
                let formInputSplitted = eventsList[i].formInput.split("+");
                await page.type(formInputSplitted[0],formInputSplitted[1])
            }
    
            if(eventsList[i].action == "click"){
                await page.click(eventsList[i].formInput)
            }
    
            if(eventsList[i].action == "getValue"){
    
                
                let css = eventsList[i].formInput
    
                const value = await page.evaluate((css )=>{ 
    
                    data= document.querySelector(css).innerText
                    return data
                  },css);
    
                  showValues.push(value)
    
            }
    
            if(eventsList[i].action == "screenshot"){
                await page.screenshot({
                    path: 'screenshot.png',
                    fullPage: true
                });
            }
          }
    
        await browser.close();
        
      })()
} catch (error) {

    //can't catch errors, work in progress
    console.log("error")
    isTestSucceed = 0
}



}

 module.exports = router



 

