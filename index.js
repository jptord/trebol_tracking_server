const { Servidor }   = require("./libs/servercore/servidor.js");
const { Metajson }   = require("./libs/servercore/metajson.js");
const { UdpServer }  = require("./libs/updserver/udpserver.js")
const { KafkaGPS }   = require("./libs/kafka/kafkagps.js")
//const { Ldapclient }  = require("./libs/ldapclient.js");
//let ldapclient  = new Ldapclient();
let servidor        = new Servidor("7777", __dirname + '/public');
let metajson        = new Metajson('datos.json');
let udpServerLive   = new UdpServer(9944);
let udpServerTrack  = new UdpServer(9945);
let kafkagps        = new KafkaGPS({ brokers : ["172.20.50.67:9092"]});

udpServerLive.addReceiveEvent((msg) => {
  kafkagps.send('gps-live',msg);
});

udpServerTrack.addReceiveEvent((msg) => {
  kafkagps.send('gps-track',msg);
});

servidor.iniciar();

servidor.get('/info',(req,res) => { 
  console.log('info');
  console.log(udpServerLive.getInfo());
  console.log(udpServerTrack.getInfo());
  res.end(JSON.stringify({liveServer:udpServerLive.getInfo(),trackServer:udpServerTrack.getInfo()}));
});
/*
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

*/