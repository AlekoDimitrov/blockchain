const SHA256 = require("crypto-js/sha256");

let date = new Date();
currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

class Block {
  constructor(index, timestamp, nonce, data, prevHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.nonce = nonce;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.hashBlock();
  }

  hashBlock() {
    return SHA256(
      this.index +
        this.timestamp +
        this.nonce +
        this.prevHash +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block(
      0,
      currentDate,
      8765,
      JSON.stringify({ data: 5132123 }),
      0
    );
  }
  prevBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock() {
    this.chain.push(
      new Block(
        this.chain.length,
        currentDate,
        15215,
        JSON.stringify({ data: "transaction" }),
        this.prevBlock().hashBlock()
      )
    );
  }
}

const kalekocoin = new Blockchain();
kalekocoin.addBlock(); //The second block
kalekocoin.addBlock(); //The third block
console.log(kalekocoin);
