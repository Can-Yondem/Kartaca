const { request } = require('express');
const express = require('express');
const router = express.Router();
const Log = require("../models/Logs");

//Tüm logları kullanıcıya gönder
router.get("/", async (req,res) => {
    try{
        const logs = await Log.find();
        var filterlogs = logs.filter(filter => Date.now() - filter.timestamp < 3600000 );
        res.json(filterlogs);
    }

    catch(err){
        res.json({message:err});
    }
});
module.exports = router;
