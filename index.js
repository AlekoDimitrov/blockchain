const SHA256 = require("crypto-js/sha256");
const { MerkleTree } = require('merkletreejs')

let timestamp = () => {
  let date = new Date();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}`;
};

let hashIt = (...argument) => {
  let arguments = "";
  argument.forEach((argument) => {
    arguments += argument;
  });
  return SHA256(arguments).toString();
};


class Transaction {
  constructor(payer, payee, amount) {
    this.payer = payer;
    this.payee = payee;
    this.amount = amount;
    this.timestamp = timestamp(); //Timestamp not included in hash hashIt function
    this.txHash = hashIt(payer, payee, amount);
  }
}

class Block {
  constructor() {
    this.index = 0 // When block not in chain, index = 0
    this.txNum = 0; // 0 transactions at block init
    this.txVol = 0; // 0 volume at block init
    this.timestamp = timestamp();
    this.transactions = [];
    this.merkleLeaves = [this.timestamp]; // default merkle leaf at init
    this.merkleRoot = this.merkleRoot();
    this.prevBlock = '' // When block not in chain, prevBlock = 0
    this.hash = this.hashBlock()
  }

  addTransaction(payer, payee, amount){
    let currentTx = new Transaction(payer, payee, amount);
    this.transactions.push(currentTx);
    this.merkleLeaves.push(currentTx.txHash)
    this.txNum += 1
    this.txVol += amount
    this.hash = this.hashBlock()
  }

  merkleRoot(){
    let merkleTree = new MerkleTree(this.merkleLeaves, SHA256)
    return merkleTree.getRoot().toString('hex')
  }

  hashBlock(){
    return hashIt(this.txNum, this.txVol, this.merkleRoot, this.prevBlock);
  }
}

class Blockchain {
  constructor(){
    this.timestamp = timestamp();
    this.chain = []
    this.createGenesisBlock()
  }

  createGenesisBlock(){
    this.chain.push(new Block())
  }

  createNextBlock(){
    let nextBlock = new Block()
    nextBlock.prevBlock = this.chain[this.chain.length - 1].hash
    nextBlock.index = this.chain[this.chain.length - 1].index + 1
    nextBlock.hash = nextBlock.hashBlock()
    this.chain.push(nextBlock)
  }

  getLatestBlock(){
    return this.chain[this.chain - 1]
  }
}

let koin = new Blockchain()
koin.createNextBlock()
koin.createNextBlock()
koin.createNextBlock()
console.log(koin)
