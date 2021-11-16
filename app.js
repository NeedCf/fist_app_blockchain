// install : cmd => npm install crypto-js
const hash = require('crypto-js/sha256');
// install : cmd => npm install prompt-sync
const prompt = require('prompt-sync')({ sigint: true });
class Node {

    // init NODE
    constructor(prevHash, data) {
        this.prevHash = prevHash;
        this.data = data;
        // time create NODE = NOW
        this.timeStamp = new Date();

        // init hash
        this.hash = this.calculatorHash();

        this.mineVar = 0
        this.mine()
    }

    calculatorHash() {
        return hash(this.mineVar + this.prevHash + JSON.stringify(this.data) + this.timeStamp).toString();
    }

    mine() {
        // mining
        // Repeat hash until hash = 0000*********************
        while (!this.calculatorHash().startsWith('0000')) {
            this.mineVar++;
            this.hash = this.calculatorHash();
        }
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
            // if edit DATA and no edit hash => calculatorHash != hash
            if (currentBlock.calculatorHash() != currentBlock.hash) {
                console.log(`Error: NODE ${i}: data edited`);
                return false;
            }

            // Check NODE hash edited
            // if edit DATA and Hash, but no edit next NODE => hash != prevHash (next NODE)
            // current NODE is next NODE prevNODE
            if (currentBlock.prevHash != prevBlock.hash) {
                console.log(`Error: NODE ${i - 1} data and hash edited`);
                return false;
            }
        }
        return true;
    }
}

console.time('create time')
TuChain = new BlockChain()

TuChain.addBlock(
    ({ from: "Tu", to: "Thu", amount: "8600" })
)

TuChain.addBlock(
    ({ from: "Thu", to: "Truk", amount: "100" })
)

TuChain.addBlock(
    ({ from: "Truk", to: "Tu", amount: "8900" })
)
console.timeEnd('create time')

console.log("Default BlockChain");
console.log(TuChain.chain);
console.log(TuChain.isValid());


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


const hackCurrent = prompt('Select hack (1,2,3): ');
switch (hackCurrent) {
    case '1': {
        console.log("Hack 1 : Change data in a Node")
        // Change data Node 1
        TuChain.chain[1] = new Node(TuChain.chain[1].prevHash, {
            from: "Thu",
            to: "Truk",
            amount: "101",
        })

        // Print result
        console.log(TuChain.isValid())
        console.log(TuChain.chain)
        break;
    }

    case '2': {
        console.log("Hack 2 : Change data and hash in a Node")
        // Change data Node 1
        TuChain.chain[1] = new Node(TuChain.chain[1].prevHash, {
            from: "Thu",
            to: "Truk",
            amount: "101",
        })
        // Change hash Node 1 
        TuChain.chain[1].hash = TuChain.chain[1].calculatorHash()

        // Print result 
        console.log(TuChain.isValid())
        console.log(TuChain.chain)
        break;
    }

    case '3': {
        console.log("Hack 3 : Change data and hash in a Node")
        console.time('hack time')
        // Change data Node 1
        TuChain.chain[1] = new Node(TuChain.chain[1].prevHash, {
            from: "Thu",
            to: "Truk",
            amount: "101",
        })
        // Change hash Node 1 
        TuChain.chain[1].hash = TuChain.chain[1].calculatorHash()
        // Change hashPrev and Hash Node 2 -> last Node
        for (var i = 2; i < TuChain.chain.length; i++) {
            TuChain.chain[i] = new Node(TuChain.chain[i - 1].hash, TuChain.chain[i].data)
        }
        console.timeEnd('hack time')

        // Print result
        console.log(TuChain.isValid())
        console.log(TuChain.chain)
        break;
    }

    default: {
        break;
    }
}

