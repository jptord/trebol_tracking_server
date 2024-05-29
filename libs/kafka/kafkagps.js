const { Kafka } = require('kafkajs');

class KafkaGPS{
    
    constructor(opts={}){      
        this.kafka      = null;  
        this.isConnected    = true;
        this.createServer(opts)
    }
	createServer(opts={}){
        this.kafka      = new Kafka({
            clientId    : 'kafkagps',
            brokers     : opts.brokers,
          });
        this.producer       = this.kafka.producer({
            allowAutoTopicCreation: false,
            transactionTimeout: 10000});
        this.isConnected    = true;
        this.connectProducer();            
	}
    connectProducer(){        
        
    }
    async send(topic,msg){
      //  if ( !this.producer.isConnected() ) return ;
        try{
            await this.producer.connect()
            await this.producer.send({
                topic: topic,
                messages: [{value:msg}],
            })
        }catch(e){
            console.log(e);
            this.isConnected    =   false;            
        }
    }
}


module.exports = { KafkaGPS } ;