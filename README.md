Get Started

To start local ethereum
```
ganache-cli 
```

To deploy the contracts
```
truffle migrate

// How to deploy only one migration file without touching the rest of migration files?
// -f means "force" and 5 refers to the fifth migration file
truffle migrate -f 5

// deploy to the other network
truffle migrate --network ropsten
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

To access the ganache server and run some commands
```
truffle console
```

```truffle
> const addresses = await web3.eth.getAccounts()
> const sender = addresses[1]
> const balance = await web3.eth.getBalance(sender)
> web3.utils.fromWei(balance, "ether")
> const receiver = "0x51Be0461D465CA650483D2A01F58eEefE1eE1e9C" # Replace this with your own MetaMask address
> const amount = web3.utils.toWei("90", "ether")
> web3.eth.sendTransaction({ from: sender, to: receiver, value: amount })

or 
> web3.eth.sendTransaction({ from: addresses[1], to: YOUR_METAMASK_ADDRESS, value: web3.utils.toWei("90", "ether") })

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

Change to deploy the app to BSC Testnet because the Geth has sync issues
```
Reference: 
https://docs.binance.org/smart-chain/developer/deploy/truffle.html
https://medium.com/spartanprotocol/how-to-connect-metamask-to-bsc-testnet-7d89c111ab2
```
