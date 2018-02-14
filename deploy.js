const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const keys = require('./config/dev');

const provider = new HDWalletProvider(
  keys.mnemonic, keys.network
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '4712388', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();