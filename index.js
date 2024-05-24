const { Servidor }    = require("./libs/server/servidor.js");
const { Metajson }    = require("./libs/server/metajson.js");
const { UdpServer }   = require("./libs/server/udpserver.js")
//const { Ldapclient }  = require("./libs/ldapclient.js");
//let ldapclient  = new Ldapclient();
let servidor    = new Servidor("7676", __dirname + '/public');
let metajson    = new Metajson('datos.json');
let udpServer    = new UdpServer(9944);

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

