const TweetherToken = artifacts.require("TweetherToken")
const TweetherICO = artifacts.require("TweetherICO")

contract("token", (accounts) => {

    it("distributes token supply", async () => {
        const token = await TweetherToken.deployed()
        const ico = await TweetherICO.deployed()

        // accounts[0] is the same address that created the TweetherToken:
        const founderBalance = await token.balanceOf.call(accounts[0])
        const icoBalance = await token.balanceOf.call(ico.address)

        assert.equal(founderBalance.toString(), "250000")
        assert.equal(icoBalance.toString(), "750000")
    })

})