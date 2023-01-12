import React from "react";
import ProjectPolygon from "components/ProjectPolygon";
import {Link} from "react-router-dom";
import {ReactComponent as PolygonDecorator} from "asset/Polygon_decorator.svg";
import style from "./style.module.scss";

// Blockchain Logic
import {useAccount, useConnect, useDisconnect} from 'wagmi'
import usdtABI from "asset/abi/USDT.json"
import {useContractRead} from 'wagmi'
import {InjectedConnector} from '@wagmi/core'
import contract from "asset/contracts.json";
//

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

    const {disconnect} = useDisconnect()
    if (!isConnected) return <button onClick={() => connect()}>Connect Wallet</button>
    return (
        <React.Fragment>
            <div className="wallet-info">
                <div>Connected to {address}</div>
                {paymentTokenBalance.isSuccess && paymentTokenBalance.data && <div>Balance: {paymentTokenBalance.data.toString()} USDT</div>}
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
            <div className={style.listing}>
                <Link to={`project/1`}>
                    <ProjectPolygon>
                        <div className={`${style.content} ${style.contentBase}`}>
                            <h2>Greenpeace Project 1</h2>
                            <div className={style.decoratorStyle}>
                                <PolygonDecorator></PolygonDecorator>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </ProjectPolygon>
                </Link>
                {/*                <ProjectPolygon variantFilled={true}>
                    <div className={`${style.content}`}>
                        <h2>Photo</h2>
                    </div>
                </ProjectPolygon>*/}
                <Link to={`project/2`}>
                    <ProjectPolygon>
                        <div className={`${style.content} ${style.contentBase}`}>
                            <h2>Greenpeace Project 2</h2>
                            <div className={style.decoratorStyle}>
                                <PolygonDecorator></PolygonDecorator>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </ProjectPolygon>
                </Link>
                {/*                <ProjectPolygon variantFilled={true}>
                    <div className={`${style.content}`}>
                        <h2>Photo</h2>
                    </div>
                </ProjectPolygon>*/}
                <Link to={`project/3`}>
                    <ProjectPolygon>
                        <div className={`${style.content} ${style.contentBase}`}>
                            <h2>Greenpeace Project 3</h2>
                            <div className={style.decoratorStyle}>
                                <PolygonDecorator></PolygonDecorator>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </ProjectPolygon>
                </Link>
                {/*                <ProjectPolygon variantFilled={true}>
                    <div className={`${style.content}`}>
                        <h2>Photo</h2>
                    </div>
                </ProjectPolygon>*/}
                <Link to={`project/4`}>
                    <ProjectPolygon>
                        <div className={`${style.content} ${style.contentBase}`}>
                            <h2>Project 4 - Carbon project</h2>

                            <div className={style.decoratorStyle}>
                                <PolygonDecorator></PolygonDecorator>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </ProjectPolygon>
                </Link>
            </div>

        </React.Fragment>
    )
}