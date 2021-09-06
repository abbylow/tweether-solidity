import React from "react"
import {createTweet} from '../web3/tweets'
import Button from './Button'

export default class ComposeModal extends React.Component {
    state = {
        text: "",
        isLoading: false,
    }

    handleChange = e => {
        this.setState({
            text: e.target.value,
        })
    }

    post = async () => {
        const {text} = this.state
        const {onClose} = this.props

        this.setState({
            isLoading: true,
        })

        try {
            alert("Your tweet is being posted. This will take a couple of seconds...")
            await createTweet(text)
            alert("Your tweet was posted!")
            this.setState({
                isLoading: false,
            })
            location.reload()
        } catch (err) {
            alert("Sorry, we couldn't post your tweet!")
            this.setState({
                isLoading: false,
            })
        }

        onClose()
    }

    render() {
        const {text, isLoading} = this.state

        const disabled = (text === "")

        return (
            <div>
                <h3>
                    Post a new tweet
                </h3>

                {isLoading && <h5>Posting...</h5>}

                <textarea
                    disabled={isLoading}
                    value={text}
                    onChange={this.handleChange}
                    maxLength={140}
                />

                <Button
                    onClick={this.post}
                    disabled={disabled}
                    style={{
                        marginTop: 12,
                        float: 'right',
                    }}
                >
                    Post tweet
                </Button>

                <style jsx>{`
                  textarea {
                    box-sizing: border-box;
                    margin: 0px;
                    margin-top: 10px;
                    border: 2px solid rgba(107, 108, 139, 0.58);
                    border-radius: 7px;
                    width: 100%;
                    padding: 11px;
                    font-size: 16px;
                  }

                  textarea:focus {
                    outline: none;
                  }
                `}</style>
            </div>
        )
    }
}