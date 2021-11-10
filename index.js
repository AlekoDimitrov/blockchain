const SHA256 = require("crypto-js/sha256");

// let date = new Date();
// currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

class Block {
  constructor(index, nonce, data, prev) {
    this.index = index;
    this.nonce = nonce;
    this.data = data;
    this.prev = prev;
  }

  hashBlock() {
    return SHA256(
      this.index + this.nonce + this.prev + JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block(0, 8765, { data: 5132123 }, 0).hashBlock();
  }
  prevBlock() {
    return this.chain.slice(-1).toString();
  }
  addBlock() {
    this.chain.push(
      new Block(this.chain.length, 251251, this.prevBlock(), {
        data: 2355,
      }).hashBlock()
    );
  }
}

const kalekocoin = new Blockchain();
kalekocoin.addBlock(); //The second block
console.log(kalekocoin);
