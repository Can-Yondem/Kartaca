const { request } = require('express');
const express = require('express');
const router = express.Router();
const Post = require("../models/Posts");
const fs = require('fs');


async function sendLog(log){
   let createProducer = require("../log-store/producer").createProducer;
   log = log.substring(1,log.length-1);
   let splitlog = log.split(",");
   let logs = {
       "method": splitlog[0],
       "responsetime": splitlog[1],
       "timestamp" : splitlog[2]
   }
    createProducer(logs);
    console.log(logs);
}

//Tüm postları kullanıcıya gönder
router.get("/", async (req,res) => {
    var start = Date.now();
    try{
        var rnd = (Math.random())*3000;
        setTimeout(async() => {
            const posts = await Post.find();
            var end = Date.now();
            //Log tutma
            fs.appendFile("./info.log",`log: "GET,${end-start},${Date.now()}"\n`,(err,data) =>{
            });
            //Kafkaya log gönderme
            sendLog(`"GET,${end-start},${Date.now()}"`);
            res.json(posts);
        },rnd);
    }
    catch(err){
        res.json({message:err});
    }
});

//Kullanıcadan post al
router.post("/", async (req,res) => {
    var start = Date.now();
    var rnd = (Math.random())*3000;
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    
    try{
        setTimeout( async () => {
            const savedPost = await post.save();
            var end = Date.now();
            fs.appendFile("./info.log",`log: "POST,${end-start},${Date.now()}"\n`,(err,data) =>{
            });
            //Kafkaya log gönderme
            sendLog(`"POST,${end-start},${Date.now()}"`);
            res.json(savedPost);
        },rnd);
        
    }
    catch(err){
        res.json({message:err});
    }
});



//Post Silme
router.delete("/:postId", async (req,res) => {
    var start = Date.now();
    var rnd = (Math.random())*3000;
    try{
        
        setTimeout( async () => {
            const removedPost = await Post.remove({_id: req.params.postId});
            var end = Date.now();
            fs.appendFile("./info.log",`log: "DELETE,${end-start},${Date.now()}"\n`,(err,data) =>{
            });
            //Kafkaya log gönderme
            sendLog(`"DELETE,${end-start},${Date.now()}"`);
            res.json(removedPost);
        },rnd);
    }
    catch(err){
        ref.json({message:err});
    }
});

//Post Güncelle
router.put("/:postId", async (req,res) => {
    var start = Date.now();
    var rnd = (Math.random())*3000;
    try{
       setTimeout( async () => {
            const updatedPost =  await Post.updateOne({_id: req.params.postId},{$set : {title: req.body.title,description:req.body.description}});
            var end = Date.now();
            fs.appendFile("./info.log",`log: "PUT,${end-start},${Date.now()}"\n`,(err,data) =>{
            });
            //Kafkaya log gönderme
            sendLog(`"PUT,${end-start},${Date.now()}"`);
            res.json(updatedPost);
    },rnd);
       

    }
    catch(err){
        res.json({message:err});
    }
})

module.exports = router;
