const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const { accountMnemonic, infuraApiKey } = require('./settings.json');

const network = 'rinkeby';
const INFURA_API_URI = `https://${network}.infura.io/${infuraApiKey}`

const provider = new HDWalletProvider(
    accountMnemonic,
    INFURA_API_URI
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log(`Fetched accounts: ${accounts}`);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    result.setProvider(provider); 

    console.log(`Contract address is ${result.options.address}`);
};

deploy();