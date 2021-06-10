const {Kafka} =  require("kafkajs");


async function createProducer(log){
    try {
        const kafka = new Kafka({
            clientId:"kafka_log_client",
            brokers:["localhost:9092"]
        })
        const producer = kafka.producer();
        console.log("Producere'a bağlanılıyor");
        await producer.connect();
        console.log("Producer'a bağlantı başarılı...");


        //producere topic yolluyoruz
        const message_result = await producer.send({
            topic : "LogStoreTopic",
            messages : [
                {
                    value : JSON.stringify(log),
                    partition : 0
                }
            ]
        })
        console.log("Gönderim işlemi başarılıdır.",JSON.stringify(message_result));
        await producer.disconnect();
    } catch (error) {
        console.log("Bir hata oluştu",error);
    }

}

module.exports.createProducer = createProducer;