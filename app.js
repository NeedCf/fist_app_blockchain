// install : cmd => npm install crypto-js
const hash = require('crypto-js/sha256');
class Node {

    // init NODE
    constructor(prevHash, data) {
        this.prevHash = prevHash;
        this.data = data;
        // time create NODE = NOW
        this.timeStamp = new Date();

        this.hash = this.caculatorHash();
    }

    caculatorHash() {
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp).toString();
    }
}

class BlockChain {

    // init Block Chain
    constructor() {
        // Create start NODE, because last node == null
        const genesisBlock = new Node('0000', { isGenesis: true });

        // Add start NODE to chain
        this.chain = [genesisBlock];
    }

    // get last block in chain
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a NODE to chain
    addBlock(data) {
        // check last Block
        const lastBlock = this.getLastBlock();
        // create Node by last block bash and new Data
        const newBlock = new Node(lastBlock.hash, data);

        // add new NODE to last chain
        this.chain.push(newBlock);
    }

    // Check block chain valid
    // if true => block chain unedited 
    // if false => block chain edited
    isValid() {
        for (var i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            // Check NODE data edited 
            // if edit DATA and no edit hash => caculatorHash != hash
            if (currentBlock.caculatorHash() != currentBlock.hash) {
                return false;
            }

            // Check NODE hash edited
            // if edit DATA and Hash, but no edit next NODE => hash != prevHash (next NODE)
            // current NODE is next NODE prevNODE
            if (currentBlock.prevHash != prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

TuChain = new BlockChain()

TuChain.addBlock(
    ({ from: "Tu", to: "Thu", amount: "8600" })
)

TuChain.addBlock(
    ({ from: "Thu", to: "Truc", amount: "100" })
)

TuChain.addBlock(
    ({ from: "Truc", to: "Tu", amount: "8900" })
)

console.log(TuChain.chain)
console.log(TuChain.isValid())