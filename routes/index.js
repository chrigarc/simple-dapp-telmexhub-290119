var express = require('express');
var router = express.Router();

const Web3Library = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const config = require('../config/ethereum.json');

const mnemonic = config.mnemonic;
const infura = config.infura;
const contractAddress = config.contract;

const provider = new HDWalletProvider(mnemonic, infura);
const web3 = new Web3Library(provider);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Introducción a programación al Blockchain de Ethereum' });
});


router.get('/entero', function(req, res, next) {
  const artifacts = require('../Solidity/build/contracts/SaveInfo.json');
  const contract = new web3.eth.Contract(artifacts.abi, contractAddress);
  contract.methods.getA().call().then(result => {
    console.log("entero value:"  + result);
    res.render('entero', { title: 'Mostrando el valor de entero', entero: result });
  });
});

module.exports = router;
