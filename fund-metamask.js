const receiver = ""; // TODO: replace this with your own Metamask wallet
const amount = web3.utils.toWei("1", 'ether');

module.exports = async function(callback) {
    const addresses = await web3.eth.getAccounts()

    web3.eth.sendTransaction({
        from: addresses[1],
        to: receiver,
        value: amount
    }, callback)
}