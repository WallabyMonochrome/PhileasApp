import React from "react";
import './style.scss';
import {useAccount, useConnect, useDisconnect} from 'wagmi'
import usdtABI from "asset/abi/USDT.json"
import crowfundingABI from "asset/abi/Crowfunding.json"
import {useContractRead, usePrepareContractWrite, useContractWrite} from 'wagmi'

import {InjectedConnector} from '@wagmi/core'

import contract from "asset/contracts.json";

export default () => {
    const {address, isConnected} = useAccount()
    const {connect} = useConnect({
        connector: new InjectedConnector(),
    });

    const paymentTokenBalance = useContractRead({
        address: contract.paymentToken,
        abi: usdtABI.abi,
        functionName: 'balanceOf',
        args: [address],
    });

    const association1TokenBalance = useContractRead({
        address: contract.association,
        abi: usdtABI.abi,
        functionName: 'balanceOf',
        args: [address],
    });

    const crowfundingAllowance = useContractRead({
        address: contract.paymentToken,
        abi: usdtABI.abi,
        functionName: 'allowance',
        args: [address, contract.crowfunding1],
    });

    const approveTokenConfig = usePrepareContractWrite({
        address: contract.paymentToken,
        abi: usdtABI.abi,
        functionName: 'approve',
        args: [contract.crowfunding1, 100]
    });

    const donateTokenConfig = usePrepareContractWrite({
        address: contract.crowfunding1,
        abi: crowfundingABI.abi,
        functionName: 'donate',
        args: [50]
    })

    const approveToken = useContractWrite(approveTokenConfig.config)
    const donateToken = useContractWrite(donateTokenConfig.config)

    const {disconnect} = useDisconnect()
    if (isConnected)
        return (
            <div className="container">
                <div className="wallet-info">
                    <div>Connected to {address}</div>
                    {paymentTokenBalance.isSuccess && paymentTokenBalance.data && <div>Balance: {paymentTokenBalance.data.toString()} USDT</div>}
                    <button onClick={() => disconnect()}>Disconnect</button>
                </div>
                <div className="project-view">
                    <div>
                        <h2>Greenpeace:</h2>
                        <div className="recap-support">Association token: {association1TokenBalance.isSuccess && association1TokenBalance.data &&
                            <span>{association1TokenBalance.data.toString()} GPT</span>}</div>
                        <div className="project-list">
                            <div className="project-details">
                                <h3>Crowfunding 1:</h3>
                                {crowfundingAllowance.isSuccess && <div>Currently approved {crowfundingAllowance.data.toString()}</div>}
                                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', margin: '12px'}}>
                                    <button disabled={!approveToken.write} onClick={() => approveToken.write?.()}>Approve</button>
                                    <button disabled={!donateToken.write || crowfundingAllowance.data.toString() === '0'} onClick={() => donateToken.write?.()}>Donate</button>
                                </div>
                            </div>
                   {/*         <div className="project-details">
                                <h3>Crowfunding 2:</h3>
                                {crowfundingAllowance.isSuccess && <div>Currently approved {crowfundingAllowance.data.toString()}</div>}
                                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', margin: '12px'}}>
                                    <button disabled={!approveToken.write} onClick={() => approveToken.write?.()}>Approve</button>
                                    <button disabled={!donateToken.write || crowfundingAllowance.data.toString() === '0'} onClick={() => donateToken.write?.()}>Donate</button>
                                </div>
                            </div>
                            <div className="project-details">
                                <h3>Crowfunding 3:</h3>
                                {crowfundingAllowance.isSuccess && <div>Currently approved {crowfundingAllowance.data.toString()}</div>}
                                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', margin: '12px'}}>
                                    <button disabled={!approveToken.write} onClick={() => approveToken.write?.()}>Approve</button>
                                    <button disabled={!donateToken.write || crowfundingAllowance.data.toString() === '0'} onClick={() => donateToken.write?.()}>Donate</button>
                                </div>
                            </div>*/}
                        </div>
                    </div>
  {/*                  <div>
                        <h2>Carbon support:</h2>
                        <div className="recap-support">Association token: {association1TokenBalance.isSuccess && association1TokenBalance.data &&
                            <span>{association1TokenBalance.data.toString()} GPT</span>}</div>
                        <div className="project-list">
                            <div className="project-details">
                                <h3>Carbon project 1:</h3>
                                {crowfundingAllowance.isSuccess && <div>Currently approved {crowfundingAllowance.data.toString()}</div>}
                                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', margin: '12px'}}>
                                    <button disabled={!approveToken.write} onClick={() => approveToken.write?.()}>Approve</button>
                                    <button disabled={!donateToken.write || crowfundingAllowance.data.toString() === '0'} onClick={() => donateToken.write?.()}>Donate</button>
                                </div>
                            </div>

                        </div>
                    </div>*/}
                </div>
            </div>
        )
    return <button onClick={() => connect()}>Connect Wallet</button>
}