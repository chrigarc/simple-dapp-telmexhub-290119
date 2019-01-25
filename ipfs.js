const ipfsClient = require('ipfs-http-client');

const config = require('./config/ipfs.json');

const random = Math.floor(Math.random() * 10000);

const content = Buffer.from( `Hola mundo en Telmex hub, disfrutando el taller Introducción a programación al Blockchain Ethereum ${random}`);


const ipfs = ipfsClient(config);

ipfs.add(content).then(result => {
    const hash = result[0].hash;
    console.log( `Descargue el archivo con esta URL: https://ipfs.io/ipfs/${hash}`);
}).catch(err => console.error(err));