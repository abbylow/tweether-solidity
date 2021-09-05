import React from 'react'
import Image from "next/image"
import Router from 'next/router'
import {Page, Center} from '../components/Layout'
// import {getUserInfo, createUser} from "../web3/users"
// import {getTweetInfo, createTweet} from "../web3/tweets"
import Button from "../components/Button"
import MetaMaskIcon from "../icons/metamask.svg"
import Modal from "../components/Modal"
import RegistrationForm from "../components/RegistrationForm"
import { getLoggedInUserId } from "../web3/users"

export default class IndexPage extends React.Component {
    // web3 library is only injected on the client-side, so only call web3 specific functions in client-side only hooks
    // async componentDidMount() {
    //     try {
    //         // Prompt user to let our DApp access their MetaMask addresses
    //         // await ethereum.enable() //deprecated MetaMask function
    //         await ethereum.request({ method: 'eth_requestAccounts' }) // MetaMask function - https://docs.metamask.io/guide/ethereum-provider.html#ethereum-request-args
    //         const addresses = await eth.getAccounts() // Get the user's ETH addresses
    //         console.log(addresses)
    //
    //         const balance = await eth.getBalance(addresses[0])
    //         console.log(balance)
    //
    //         const storage = await getInstance(UserStorage)
    //         const { username } = await storage.profiles.call(1)
    //         console.log("Got username:", username)
    //
    //     } catch (err) {
    //         console.error("User denied access to their ETH addresses!")
    //     }
    // }

    // logUser = async () => {
    //     const userInfo = await getUserInfo(1)
    //     console.log(userInfo)
    // }
    //
    // createUser = async () => {
    //     const tx = await createUser("tristan")
    //     console.log(tx)
    // }
    //
    // logTweet = async () => {
    //     const tweetInfo = await getTweetInfo(1)
    //     console.log(tweetInfo)
    // }
    //
    // createTweet = async () => {
    //     const tx = await createTweet("Hello world!")
    //     console.log(tx)
    // }

    state = {
        showRegisterModal: false,
    }

    async componentDidMount() {
        const userId = await getLoggedInUserId()

        if (userId) {
            Router.replace('/home')
        }
    }

    toggleRegisterModal = async () => {
        const { showRegisterModal } = this.state

        this.setState({
            showRegisterModal: !showRegisterModal,
        })
    }

    render() {
        const { showRegisterModal } = this.state

        return (
            <Page>
                <Center>
                    <h2>
                        A <mark>decentralized</mark>, <mark>uncensorable</mark> Twitter clone built on Ethereum
                    </h2>

                    <div className="right-side">

                        <Button
                            style={{ paddingLeft: 24 }}
                            onClick={this.toggleRegisterModal}
                        >
                            {/*inline-react-svg not working*/}
                            {/*<MetaMaskIcon />*/}
                            <Image
                                src={MetaMaskIcon}
                                width={36}
                                height={36}
                            />
                            Create your account
                        </Button>


                        <div className="disclaimer">
                            <p>
                                MetaMask will automatically open and ask you to confirm a transaction.
                            </p>
                            <p>
                                Please note that creating an account on the Ethereum blockchain costs a small amount of
                                Ether.
                            </p>
                        </div>
                    </div>
                </Center>

                {showRegisterModal && (
                    <Modal
                        onClose={this.toggleRegisterModal}
                    >
                        <RegistrationForm onClose={this.toggleRegisterModal}/>
                    </Modal>
                )}

                <style jsx global>{`
                  html, body {
                    min-height: 100%;
                  }

                  body {
                    background-color: #262740;
                    background-image: url("/static/images/landing-bg.jpg");
                    background-size: cover;
                    background-position: center center;
                  }
                `}</style>

                <style jsx>{`
                  h2 {
                    font-size: 50px;
                    color: #FFFFFF;
                    line-height: 78px;
                    position: relative;
                    text-transform: uppercase;
                    max-width: 520px;
                    display: inline-block;
                  }

                  mark {
                    color: inherit;
                    background-color: #9F99EC;
                    padding: 0 7px;
                  }

                  .right-side {
                    float: right;
                    position: relative;
                    max-width: 320px;
                    text-align: center;
                    margin-top: 120px;
                  }

                  .right-side :global(svg) {
                    position: absolute;
                    margin-left: -46px;
                    margin-top: -8px;
                  }

                  .disclaimer {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 23px;
                    font-weight: 400;
                    margin-top: 23px;
                  }
                `}</style>
                {/*<button onClick={this.logUser}>*/}
                {/*    Get user with ID 1*/}
                {/*</button>*/}

                {/*<button onClick={this.createUser}>*/}
                {/*    Create user*/}
                {/*</button>*/}

                {/*<button onClick={this.logTweet}>*/}
                {/*    Get tweet with ID 1*/}
                {/*</button>*/}

                {/*<button onClick={this.createTweet}>*/}
                {/*    Create tweet*/}
                {/*</button>*/}
            </Page>
        )
    }
}