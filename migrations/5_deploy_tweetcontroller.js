const TweetController = artifacts.require('TweetController')
const TweetStorage = artifacts.require('TweetStorage')
const ContractManager = artifacts.require('ContractManager')

// How to deploy only one migration file without touching the rest of migration files?
// truffle migrate -f 5
// -f means "force" and 5 refers to the fifth migration file

module.exports = (deployer) => {
    deployer.deploy(TweetController)
        .then(() => {
            return TweetController.deployed()
        })
        .then(tweetController => {
            tweetController.setManagerAddr(ContractManager.address)

            return Promise.all([
                ContractManager.deployed(),
                TweetStorage.deployed(),
            ])
        })
        .then(([manager, storage]) => {
            return Promise.all([
                manager.setAddress('TweetController', TweetController.address),
                storage.setControllerAddr(TweetController.address),
            ])
        })
}