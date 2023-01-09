import { getDefaultProvider } from 'ethers'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'

import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { configureChains } from 'wagmi'

import { localhost, mainnet, polygon } from 'wagmi/chains'


import { WagmiConfig, createClient } from 'wagmi'
import './App.css';
import Dashboard from "views/Dashboard";

/*const { chains, provider } = configureChains(
    [localhost],
    [
        jsonRpcProvider({
            rpc: (chain) => ({
                http: `http://127.0.0.1:8545`,
            }),
        }),
    ],
)

const client = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
})*/

/*const { chains, provider } = configureChains(
    [mainnet, polygon],
    [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
)*/

const { chains, provider } = configureChains(
    [localhost],
    [ jsonRpcProvider({
        rpc: (chain) => ({
            http: `http://127.0.0.1:8545`,
        }),
    }),],
)

console.log('loca', chains, provider);

const client = createClient({
    autoConnect: true,
    provider,
})


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <WagmiConfig client={client}>
         <Dashboard />
          </WagmiConfig>
      </header>
    </div>
  );
}

export default App;
