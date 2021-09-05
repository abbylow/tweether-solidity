import Web3 from "web3"
import contract from 'truffle-contract'

const provider = () => {
    // If the user has Metamask: (Metamask injects web3 library into the browser)
    if (typeof web3 !== 'undefined') {
        return web3.currentProvider
    } else {
        console.error("You need to install Metamask for this app to work!")
    }
}

export const eth = new Web3(provider()).eth

// convert JSON to contract object using truffle-contract
export const getInstance = artifact => {
    const contractObj = contract(artifact)
    contractObj.setProvider(provider())

    return contractObj.deployed();
}