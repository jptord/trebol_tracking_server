const { Servidor }    = require("./libs/server/servidor.js");
const { Metajson }    = require("./libs/server/metajson.js");
const { UdpServer }   = require("./libs/updserver/udpserver.js")
const { KafkaGPS }   = require("./libs/kafka/kafkagps.js")
//const { Ldapclient }  = require("./libs/ldapclient.js");
//let ldapclient  = new Ldapclient();
let servidor    = new Servidor("7777", __dirname + '/public');
let metajson    = new Metajson('datos.json');
let udpServer    = new UdpServer(9944);
let kafkagps    = new KafkaGPS({ brokers : ["172.20.50.67:9092"]});

udpServer.addReceiveEvent((msg) => {
    kafkagps.send(msg);
});

servidor.iniciar();

servidor.get('/info',(req,res) => { 
  console.log('info');
  console.log(udpServer.getInfo());
  res.end(JSON.stringify(udpServer.getInfo()));
});

servidor.post('/json',(req,res) => { 
  console.log("req.body",req.body);
  metajson.set(req.body);
  metajson.guardar();
  res.end('ok');
});

servidor.get('/json',(req,res) => { 
  let json = metajson.get();
  res.setHeader('Content-Type', 'application/json');
  res.send(json);  
});

