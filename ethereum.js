const Web3Library = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = "";
const infura = "";

const provider = new HDWalletProvider(mnemonic, infura);
const web3 = new Web3Library(provider);

const address = '';

web3.eth.getBlockNumber().then(result => console.log(result));

web3.eth.getBalance(address).then(result => {console.log(result)});

