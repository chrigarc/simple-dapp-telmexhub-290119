const Web3Library = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const config = require('./config/ethereum.json');

const mnemonic = config.mnemonic;
const infura = config.infura;

const provider = new HDWalletProvider(mnemonic, infura);
const web3 = new Web3Library(provider);

const address = config.address;

web3.eth.getBlockNumber().then(result => console.log("blockNumber: " + result));

web3.eth.getBalance(address).then(result => {console.log("Balance: " + result)});


const contractAddress = config.contract;


const artifacts = require('./Solidity/build/contracts/SaveInfo.json');
const contract = new web3.eth.Contract(artifacts.abi, contractAddress);

contract.methods.getA().call().then(result => console.log("entero value:"  + result));

