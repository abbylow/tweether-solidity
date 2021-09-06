const UserStorage = artifacts.require('UserStorage');
const UserController = artifacts.require('UserController');
// integration tests (in JavaScript) are a great way to verify the behaviour of our contracts from a user's perspective

const utils = require('../utils')
const { assertVMException } = utils

contract('users', () => {
    it("can't create user without controller", async () => {
        const storage = await UserStorage.deployed()

        try {
            const tx = await storage.createUser(0x0, "tristan", "Tristan", "Edwards", "I like building stuff", "lala@la.com")
            assert.fail()
        } catch(err) {
            assertVMException(err)
        }
    })

    it("can create user with controller", async() => {
        const controller = await UserController.deployed()

        // fromAscii: convert string values to bytes32
        const username = web3.utils.fromAscii("tristan")
        const firstName = web3.utils.fromAscii("Tristan")
        const lastName = web3.utils.fromAscii("Edwards")
        const tx = await controller.createUser(username, firstName, lastName, "I like building stuff", "lala@la.com")

        assert.isOk(tx)
    })

    it("can get user", async() => {
        const storage = await UserStorage.deployed()
        const userId = 1

        // Get the userInfo array
        const userInfo = await storage.profiles.call(userId)

        // Get the second element (the username)
        // toAscii: convert bytes32 to string
        const username = web3.utils.toAscii(userInfo[1]).replace(/\u0000/g, '')

        assert.equal(username, "tristan")
    })
})