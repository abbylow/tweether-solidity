import React from 'react'
import Link from "next/link"
import Image from "next/image"
import {Center} from "./Layout"
import Logotype from "../icons/logotype.svg"
import { getLoggedInUserId, getUserInfo } from "../web3/users"
import Nav from "./Nav"
import Modal from "./Modal"
import TweetComposer from "./TweetComposer"

export default class Header extends React.Component {
    state = {
        loggedIn: false,
        userInfo: {},
        showComposeModal: false,
    }

    toggleComposeModal = () => {
        const { showComposeModal } = this.state

        this.setState({
            showComposeModal: !showComposeModal,
        })
    }

    async componentDidMount() {
        const userId = await getLoggedInUserId()

        try {
            const userInfo = await getUserInfo(userId)

            this.setState({
                loggedIn: true,
                userInfo,
            })
        } catch (err) {
            console.error("Couldn't find logged in user", err)
        }

    }

    render() {
        const { loggedIn, userInfo, showComposeModal } = this.state

        return (
            <header>
                <Center>
                    <Link href="/">
                        <a className="logotype">
                            {/*inline-react-svg not working*/}
                            {/*<Logotype/>*/}
                            <Image
                                src={Logotype}
                                width={150}
                                height={36}
                            />
                        </a>
                    </Link>

                    <nav>
                        {loggedIn && (
                            <Nav userInfo={userInfo} toggleComposeModal={this.toggleComposeModal}/>
                        )}
                    </nav>

                </Center>

                {showComposeModal && (
                    <Modal
                        onClose={this.toggleComposeModal}
                    >
                        <TweetComposer onClose={this.toggleComposeModal} />
                    </Modal>
                )}

                <style jsx>{`
                  header {
                    background-color: #FFFFFF;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.14);
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 100;
                  }
                `}</style>
            </header>
        )
    }
}