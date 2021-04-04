const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require("dotenv/config");
var port = 3000;

app.use(cors());
app.use(bodyParser.json());

//İmport routes
const postsRoute = require('./routes/posts');
app.use("/posts",postsRoute);

//import log service
const logRoute = require('./routes/log');
app.use("/log",logRoute);

//Routing
app.get("/",(req,res) => {
    res.send("İlk get çalıştı.");
});


//DB Connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },() =>
 console.log("DB'ye bağlantı başarılı..."));
 

//Server Listen
app.listen(port);