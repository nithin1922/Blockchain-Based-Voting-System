const Web3 = require('web3');
const { RPC_URL, CONTRACT_ADDRESS } = require('../config');
const contractABI = require('../contracts/Voting.json').abi; // Import contract ABI

const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);

module.exports = contract;
