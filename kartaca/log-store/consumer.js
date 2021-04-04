const {Kafka} =  require("kafkajs");
const Logs = require("../models/Logs");
const mongoose = require('mongoose');
require('dotenv').config("../.env")

mongoose.connect("mongodb+srv://Onur:Rolf1234@rest.zyd2p.mongodb.net/rest", { useNewUrlParser: true },() =>
 console.log("DB'ye bağlantı başarılı..."));
 createConsumer()

async function createConsumer(){
    try {
        const kafka = new Kafka({
            clientId:"kafka_log_client",
            brokers:["localhost:9092"]
        })
        const consumer = kafka.consumer({
            groupId : "log_store_consumer_group"
        });
        console.log("Consumer'a bağlanılıyor");
        await consumer.connect();
        console.log("Consumer'a bağlantı başarılı...");

        
        //Consumer Subscribe..
        await consumer.subscribe({
            topic : "LogStoreTopic",
            fromBeginning : true 
        });

        
        await consumer.run({
            eachMessage : async result => {
                console.log(`Gelen Mesaj ${result.message.value} : Partition : => ${result.partition}`);
                
                let jsonlog = JSON.parse(result.message.value);

                
                const log = new Logs({
                    method: jsonlog.method,
                    responsetime: jsonlog.responsetime,
                    timestamp: jsonlog.timestamp
                });
                
               const savedLog = await log.save();
                
            }
        })
    } catch (error) {
        console.log("Bir hata oluştu",error);
    }

}
