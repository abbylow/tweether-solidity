import { eth, getInstance } from './provider'
import Web3Utils from 'web3-utils'
import UserStorage from "./artifacts/UserStorage.json"
import UserController from "./artifacts/UserController.json"

export const getUserInfo = async (userId) => {
    const storage = await getInstance(UserStorage)
    const { id, username, firstName, lastName, bio, gravatarEmail } = await storage.profiles.call(userId)

    if (!parseInt(id)) throw "Couldn't find user!"

    return {
        id: parseInt(id),
        username: Web3Utils.toAscii(username).replace(/\u0000/g, ''),
        firstName: Web3Utils.toAscii(firstName).replace(/\u0000/g, ''),
        lastName: Web3Utils.toAscii(lastName).replace(/\u0000/g, ''),
        bio,
        gravatarEmail,
    }
}

export const createUser = async (params) => {
    try {
        // await ethereum.enable() //deprecated MetaMask function
        await ethereum.request({ method: 'eth_requestAccounts' }) // MetaMask function - https://docs.metamask.io/guide/ethereum-provider.html#ethereum-request-args

        const controller = await getInstance(UserController)
        const addresses = await eth.getAccounts()

        // const result = await controller.createUser(Web3Utils.fromAscii(username), {from: addresses[0]})

        const { firstName, lastName, username, bio, gravatarEmail } = params

        const result = await controller.createUser(
            Web3Utils.fromAscii(username),
            Web3Utils.fromAscii(firstName),
            Web3Utils.fromAscii(lastName),
            bio,
            gravatarEmail,
            { from: addresses[0] }
        )

        return result
    } catch (err) {
        console.error("Err:", err)
    }
}

export const getLoggedInUserId = async () => {
    try {
        // await ethereum.enable() //deprecated MetaMask function
        await ethereum.request({ method: 'eth_requestAccounts' }) // MetaMask function - https://docs.metamask.io/guide/ethereum-provider.html#ethereum-request-args
        const addresses = await eth.getAccounts()

        if (!addresses) return

        const storage = await getInstance(UserStorage)
        const userId = await storage.addresses.call(addresses[0])

        return parseInt(userId)
    } catch (err) {
        console.error("Err:", err)
    }
}

export const getUserIdFromUsername = async (username) => {
    const storage = await getInstance(UserStorage)
    const userId = await storage.usernames.call(Web3Utils.fromAscii(username))

    return userId
}