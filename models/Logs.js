const mongoose = require('mongoose');

const LogsSchema = mongoose.Schema({
    method:{
        type:String,
        required:true
    },
    responsetime:{
        type:Number,
        required:true
    },
    timestamp: {
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("Logs",LogsSchema);