const Web3Library = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const ipfsClient = require('ipfs-http-client');

const configETH = require('./config/ethereum.json');
const configIPFS = require('./config/ipfs.json');

const provider = new HDWalletProvider(configETH.mnemonic, configETH.infura);
const web3 = new Web3Library(provider);

const random = Math.floor(Math.random() * 10000);

const content = Buffer.from( `Hola mundo en Telmex hub, disfrutando el taller Introducción a programación al Blockchain Ethereum ${random}`);

const artifacts = require('./Solidity/build/contracts/SaveInfo.json');
const contract = new web3.eth.Contract(artifacts.abi, configETH.contract);


const ipfs = ipfsClient(configIPFS);

ipfs.add(content).then(result => {
    const hash = result[0].hash;
    console.log( `Descargue el archivo con esta URL: https://ipfs.io/ipfs/${hash}`);
    contract.methods.setCadena(`https://ipfs.io/ipfs/${hash}`).send({from:configETH.address}).then(() => {
            contract.methods.getCadena().call().then(result => console.log("new Value: "  + result));
        }
    );
}).catch(err => console.error(err));