import React from "react"
import Button from "./Button"
import { createUser } from "../web3/users"

const Input = ({title, value, onChange}) => (
    <div>
        <label>
            {title}
        </label>

        <input value={value} onChange={onChange}/>

        <style jsx>{`
          div {
            border-bottom: 1px solid rgba(0, 0, 0, 0.13);
            margin: 0 -14px;
            padding: 0 14px;
          }

          div:first-of-type {
            border-top: 1px solid rgba(0, 0, 0, 0.13);
          }

          label {
            font-size: 13px;
            color: rgba(81, 81, 112, 0.66);
            text-transform: uppercase;
            display: block;
            margin-top: 8px;
          }

          input {
            width: 100%;
            box-sizing: border-box;
            font-size: 17px;
            padding-top: 8px;
            padding-bottom: 13px;
            border: none;
          }

          input:focus {
            border: none;
            outline: none;
          }
        `}</style>
    </div>
)

export default class RegistrationForm extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        gravatarEmail: "",
        bio: "",
        isLoading: false,
    }

    updateField = (fieldName, e) => {
        const newState = {}
        newState[fieldName] = e.target.value

        this.setState(newState)
    }

    createUser = async (e) => {
        e.preventDefault()

        // validation checks
        for(let key in this.state) {
            if (!this.state[key] && key !== 'isLoading') {
                return alert(`You must fill in your ${key}`)
            }
        }

        const { firstName, lastName, username, bio, gravatarEmail } = this.state

        this.setState({
            isLoading: true,
        })

        try {
            // Open MetaMask modal
            alert("Your account is being created. This will take a couple of seconds...")
            await createUser({username, firstName, lastName, bio, gravatarEmail})

            alert("Your account has been created!")
            this.setState({
                isLoading: false,
            })
            this.props.onClose()
            location.reload()
        } catch (err) {
            alert(`Sorry, fail to create your account: ${err}`)
            this.setState({
                isLoading: false,
            })
        }

    }

    render() {
        const {isLoading} = this.state

        return (
            <form onSubmit={this.createUser}>
                <h3>
                    Create your account
                </h3>

                {isLoading && <h5>Posting...</h5>}

                <Input
                    title="First name"
                    onChange={e => this.updateField("firstName", e)}
                />

                <Input
                    title="Last name"
                    onChange={e => this.updateField("lastName", e)}
                />

                <Input
                    title="Desired username"
                    onChange={e => this.updateField("username", e)}
                />

                <Input
                    title="Gravatar email"
                    onChange={e => this.updateField("gravatarEmail", e)}
                />

                <Input
                    title="Bio"
                    onChange={e => this.updateField("bio", e)}
                />

                <footer>
                    <Button onClick={this.createUser}>
                        Create
                    </Button>
                </footer>

                <style jsx>{`
                  h3 {
                    padding-bottom: 10px;
                  }

                  footer {
                    text-align: right;
                    padding-top: 16px;
                  }
                `}</style>
            </form>
        )
    }
}