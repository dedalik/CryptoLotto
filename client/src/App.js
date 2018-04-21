import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
    state = {
        manager: '',
        balance: '',
        players: []
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({ manager, players, balance });
    }

    render() {
        return (
            <div>
                <h2>CryptoLotto!</h2>
                <p>
                    Game is currently managed by{' '}
                    <code>{this.state.manager}</code>
                </p>
                <p>Players: {this.state.players.length}</p>
                <p>
                    Jackpot: {web3.utils.fromWei(this.state.balance, 'ether')}
                    ether
                </p>
            </div>
        );
    }
}

export default App;
