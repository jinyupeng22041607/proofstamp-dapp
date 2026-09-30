const fs=require('node:fs');
const solc=require('solc');
const source=fs.readFileSync('contracts/ProofStamp.sol','utf8');
const output=JSON.parse(solc.compile(JSON.stringify({language:'Solidity',sources:{'ProofStamp.sol':{content:source}},settings:{optimizer:{enabled:true,runs:200},evmVersion:'paris',outputSelection:{'*':{'*':['abi','evm.bytecode.object']}}}})));
for(const e of output.errors||[]) { if(e.severity==='error') throw Error(e.formattedMessage); }
const c=output.contracts['ProofStamp.sol'].ProofStamp;
fs.mkdirSync('public/vendor',{recursive:true});
fs.copyFileSync('node_modules/ethers/dist/ethers.umd.min.js','public/vendor/ethers.js');
fs.writeFileSync('public/contract.json',JSON.stringify({abi:c.abi,bytecode:'0x'+c.evm.bytecode.object}));
fs.copyFileSync('contracts/ProofStamp.sol','public/ProofStamp.sol');
console.log('Built Solidity artifact and bundled ethers.');
