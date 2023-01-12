import {getDefaultProvider} from 'ethers'
import {publicProvider} from 'wagmi/providers/public'
import {jsonRpcProvider} from '@wagmi/core/providers/jsonRpc'
import {alchemyProvider} from '@wagmi/core/providers/alchemy'
import {InjectedConnector} from '@wagmi/core/connectors/injected'
import {configureChains} from 'wagmi'
import Router from "./Router";

import {localhost, sepolia} from 'wagmi/chains'


import {WagmiConfig, createClient} from 'wagmi'
import './App.css';

const {chains, provider} = configureChains(
    [localhost, sepolia],
    [jsonRpcProvider({
        rpc: (chain) => ({
            // http: `http://127.0.0.1:8545`,
            http: `https://sepolia.infura.io/v3/cd8059a535eb471c88322a32c43d7f6e`,
        }),
    }),],
)

const client = createClient({
    autoConnect: true,
    provider,
})


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <WagmiConfig client={client}>
                    <Router/>
                </WagmiConfig>
            </header>
        </div>
    );
}

export default App;
