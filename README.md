# KernotecUDPParser

Proyecto para editar svg y crear firmas png para kernotec en NodeJs 17+

# Requisito 
    - Nodejs +17
# Uso

```
git clone https://gitlab.pragmainvest.com.bo/jtordoya/kernotecfirmas.git kernotecfirmas
cd kernotecfirmas
npm install
node app.js
```

puerto por defecto :  UDP 7777

## Docker

En base a node18:

Ejemplo:

`docker build . -t udptestDocker`

`docker run -p 9944:9944 -p 9945:9945 -p 8080:7777 --name udptest -d udptestDocker`
