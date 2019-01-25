const express = require('express');
const router = express.Router();

const Web3Library = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const config = require('../config/ethereum.json');

const mnemonic = config.mnemonic;
const infura = config.infura;
const contractAddress = config.contract;

const provider = new HDWalletProvider(mnemonic, infura);
const web3 = new Web3Library(provider);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Introducción a programación al Blockchain de Ethereum'});
});


router.get('/entero', (req, res, next) => {
    const artifacts = require('../Solidity/build/contracts/SaveInfo.json');
    const contract = new web3.eth.Contract(artifacts.abi, contractAddress);
    contract.methods.getA().call().then(result => {
        console.log("entero value:" + result);
        res.render('entero', {title: 'Mostrando el valor de entero', entero: result});
    });
});

router.get('/random', (req, res, next) => {
    const artifacts = require('../Solidity/build/contracts/SaveInfo.json');
    const contract = new web3.eth.Contract(artifacts.abi, contractAddress);
    contract.methods.setA(Math.floor(Math.random() * 10000)).send({from: config.address}).then(() => {
            contract.methods.getA().call().then(result => {
                console.log("new Value: " + result);
                res.render('entero', {title: 'Nuevo valor', entero: result});
            });
        }
    );
});

router.get('/form', (req, res, next) => {
    res.render('formulario');
});

router.post('/upload', (req, res, next) => {
    console.log(req);
    if (!req.files ||!req.files.file)  {
        res.json({status: 'fail', message: 'not file'});
    } else {
        const ipfsClient = require('ipfs-http-client');
        const config = require('../config/ipfs.json');
        const ipfs = ipfsClient(config);
        const content = req.files.file.data;
        ipfs.add(content).then(result => {
            const hash = result[0].hash;
            console.log(`Descargue el archivo con esta URL: https://ipfs.io/ipfs/${hash}`);
            res.json({status: 'success', url: `https://ipfs.io/ipfs/${hash}`});
        }).catch(err => console.error(err));
    }

});

module.exports = router;
