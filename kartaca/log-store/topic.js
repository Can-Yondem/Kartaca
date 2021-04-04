const {Kafka} =  require("kafkajs");

createTopic();

async function createTopic(){
    try {
        const kafka = new Kafka({
            clientId:"kafka_log_client",
            brokers:["localhost:9092"]
        })
        const admin = kafka.admin();
        console.log("kafka broker'a bağlanılıyor");
        await admin.connect();
        console.log("kafka broker'a bağlantı başarılı, Topic üretilecek");
        await admin.createTopics({
            topics : [
            {
                topic:"LogStoreTopic",
                numPartitions : 0
            }
        ]
        })
        console.log("Topic Başarılı bir şekilde oluşturuldu.");
        await admin.disconnect();
        
    } catch (error) {
        console.log("Bir hata oluştu",error);
    }
    finally{
        process.exit(0);
    }
}