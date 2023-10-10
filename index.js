const { Servidor }    = require("./libs/server/servidor.js");
const { Metajson }    = require("./libs//server/metajson.js");
//const { Ldapclient }  = require("./libs/ldapclient.js");
//let ldapclient  = new Ldapclient();
let servidor    = new Servidor("7676", __dirname + '/public');
let metajson    = new Metajson('datos.json');

servidor.iniciar();

servidor.get('/info',(req,res) => { 
  console.log('info');
  res.end('info');
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