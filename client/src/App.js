import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
    state = {
        manager: '',
        balance: '',
        players: [],
        value: '',
        message: ''
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({ manager, players, balance });
    }

    onSubmit = async event => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({ message: 'Waiting for transaction to complete. . .' });

        await lottery.methods.enter().send({
            value: web3.utils.toWei(this.state.value, 'ether'),
            from: accounts[0]
        });

        this.setState({ message: 'Done!' });
    };

    handlePickWinner = async () => {
        const accounts = await web3.eth.getAccounts();

        this.setState({ message: 'Waiting for transaction to complete.' });

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        this.setState({ message: 'Done!' });
    };

    renderPickWinner = () => (
        <div>
            <button onClick={this.handlePickWinner}>Pick a Winner!</button>
        </div>
    );

    render() {
        const { manager, players, balance, value, message } = this.state;

        return (
            <div>
                <h2>CryptoLotto!</h2>
                <p>
                    Game is currently managed by <code>{manager}</code>
                </p>
                <p>Players: {players.length}</p>
                <p>Jackpot: {web3.utils.fromWei(balance, 'ether')} ether</p>

                <hr />

                <form onSubmit={this.onSubmit}>
                    <h4>Want to join?</h4>
                    <div>
                        <label>Amount of ether : </label>
                        <input
                            value={value}
                            onChange={event =>
                                this.setState({ value: event.target.value })
                            }
                        />
                    </div>
                    <button>Enter</button>
                </form>

                <hr />

                <h5>{message}</h5>

                {/* Just hardcoding this here since this is just a crude sample app*/}
                {manager &&
                manager === '0x1EAc978c8A9DC1d0Ab999bB1DdfF078477F8Af16'
                    ? this.renderPickWinner()
                    : null}
            </div>
        );
    }
}

export default App;
