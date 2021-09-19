# What is this project (Tweether) about?
This is a tutorial project to build a decentralized, uncensorable Twitter clone using Solidity.
[Tutorial link](https://www.ludu.co/course/ethereum/interface-with-react)

## How to run this project

To start local ethereum (ensure this is running at the background during development)
```
ganache-cli 
```

To deploy the contracts
```
truffle migrate

// To deploy only one migration file without touching the rest of migration files
truffle migrate -f 5 // -f means "force" and 5 refers to the fifth migration file

// deploy to the other network
truffle migrate --network testnet // testnet is the network name that we list in the truffle-config networks
```

To run the user interface (Next App)
```
npm run dev
```
If you re-deploy the contracts, please restart the Next app

To run the test case
```
truffle test
```

To add the fund to your MetaMask wallet
```
npm run fund-metamask
```

To access the ganache server and run some commands
```
truffle console

> const addresses = await web3.eth.getAccounts()
> const sender = addresses[1]
> const balance = await web3.eth.getBalance(sender)
> web3.utils.fromWei(balance, "ether")
> const receiver = "0x51Be0461D465CA650483D2A01F58eEefE1eE1e9C" # Replace this with your own MetaMask address
> const amount = web3.utils.toWei("90", "ether")
> web3.eth.sendTransaction({ from: sender, to: receiver, value: amount })

or 
> web3.eth.sendTransaction({ from: addresses[1], to: ${YOUR_METAMASK_ADDRESS}, value: web3.utils.toWei("90", "ether") })

```

To avoid stopping the running testrpc and spawning a brand new blockchain, we can use the command below
```
truffle migrate --reset
```

Deploy to Ropsten testnet using Geth
```
brew tap ethereum/ethereum
brew install ethereum

// sync the testnet blockchain to our computer (take some times)
geth --ropsten --syncmode "fast" 

// to open the Geth JavaScript console
geth attach ipc:/Users/{YOUR_USER}/Library/Ethereum/ropsten/geth.ipc

// inside the console, run web3.eth.syncing to see how many blocks you have left to sync
> web3.eth.syncing

// relaunch Geth
geth --ropsten --rpc --rpcapi db,eth,net,web3,personal --rpcport 8546

// open a new Geth JavaScript console by connecting to port 8546
geth attach http://127.0.0.1:8546

// all of our accounts (private keys) that are usable in the network
> eth.accounts

// create a new account
> personal.newAccount() 

// get balance
> eth.getBalance(YOUR_ADDRESS)
```

### Issue
When I use Geth to deploy, I met a sync issue so the wallet balance is always zero and can't get enough fund to deploy. 
Thus, I decided to change to deploy the app to BSC Testnet. 

```
Deploy to BSC Testnet in few steps: 
https://docs.binance.org/smart-chain/developer/deploy/truffle.html
https://medium.com/spartanprotocol/how-to-connect-metamask-to-bsc-testnet-7d89c111ab2
```


### Note
The tutorial is published on 2019, Solidity has changed so that some guidelines are deprecated. 

Eg: the method of enabling MetaMask, the method of writing the constructor and so on. 

I have made some changes to solve these issues during the development (and leave some comments in the code too) 
