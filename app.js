// install : cmd => npm install crypto-js
const hash = request('crypto-js/sha256')
class Node {

    // init NODE
    constructor(prevHash, data) {
        this.prevHash = prevHash
        this.data = data
        // time create NODE = NOW
        this.timeStamp = new Date()

        this.hash = this.caculatorHash()
    }

    caculatorHash() {
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp)
    }
}

class BlockChain {

    // init Block Chain
    constructor() {
        // Create start NODE, because last node == null
        const genesisBlock = new Block('0000', { isGenesis: true })

        // Add start NODE to chain
        this.chain = [genesisBlock];
    }

    // get last block in chain
    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }

    // Add a NODE to chain
    addBlock(data) {
        // check last Block
        const lastBlock = this.getLastBlock()
        // create Node by last block bash and new Data
        const newBlock = Node(prevBlock.hash, data)

        // add new NODE to last chain
        this.chain.push(newBlock)
    }

    // Check block chain valid
    // if true => block chain unedited 
    // if false => block chain edited
    isValid() {
        for (i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const prevBlock = this.chain[i - 1]

            // Check NODE data edited 
            // if edit DATA and no edit hash => caculatorHash != hash
            if (currentBlock.caculatorHash != currentBlock.hash) {
                return false;
            }

            // Check NODE hash edited
            // if edit DATA and Hash, but no edit next NODE => hash != prevHash (next NODE)
            // current NODE is next NODE prevNODE
            if (currentBlock.prevHash != prevBlock.hash) {
                return false;
            }
        }
        return true
    }
}

TuChain = new BlockChain()
TuChain.addBlock(
    data({ from: "Tu", to: "Thu", amount: "1000" })
)
