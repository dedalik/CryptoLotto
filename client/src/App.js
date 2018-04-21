import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
    state = {
        manager: '',
        balance: '',
        players: [],
        value: ''
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
                    Jackpot: {web3.utils.fromWei(this.state.balance, 'ether')}{' '}
                    ether
                </p>

                <hr />

                <form>
                    <h4>Want to join?</h4>
                    <div>
                        <label>Amount of ether : </label>
                        <input
                            value={this.state.value}
                            onChange={event =>
                                this.setState({ value: event.target.value })
                            }
                        />
                    </div>
                    <button>Enter</button>
                </form>
            </div>
        );
    }
}

export default App;
