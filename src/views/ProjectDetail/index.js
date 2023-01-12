import React, {useState} from "react";
import style from "./style.module.scss";
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite} from "wagmi";
import contract from "asset/contracts.json";
import usdtABI from "asset/abi/USDT.json";
import crowfundingABI from "asset/abi/Crowfunding.json";
import {
    useParams
} from "react-router-dom";

// All this should be done with a backend or by calling the contract metadata
const mappingIdToContract = {
    "1": contract.crowfunding1,
    "2": contract.crowfunding2,
    "3": contract.crowfunding3,
    "4": contract.carbonProject,
}

const mappingIdToAssociation = {
    "1": contract.association,
    "2": contract.association,
    "3": contract.association,
    "4": contract.carbonCreator,
}

const mappingIdToName = {
    "1": "Greenpeace Project 1",
    "2": "Greenpeace Project 2",
    "3": "Greenpeace Project 3",
    "4": "Carbon Project",
}
// // //
export default () => {
    const {address} = useAccount()
    // Use to retrieve the according contract, future imrprovement would be to have a better structure for storing contract addresses
    const projectID = useParams().id;
    const currentProjectContract = mappingIdToContract[projectID] || mappingIdToContract["1"];
    const currentAssociationProject = mappingIdToAssociation[projectID] || mappingIdToAssociation["1"];
    const currentProjectName = mappingIdToName[projectID] || mappingIdToName["1"];
    const [amountInput, setAmountInput] = useState(0);

    const paymentTokenBalance = useContractRead({
        address: contract.paymentToken,
        abi: usdtABI.abi,
        functionName: 'balanceOf',
        args: [address],
    });

    const associationToken = useContractRead({
        address: currentAssociationProject,
        abi: usdtABI.abi,
        functionName: 'balanceOf',
        args: [address],
    });

    const crowfundingAllowance = useContractRead({
        address: contract.paymentToken,
        abi: usdtABI.abi,
        functionName: 'allowance',
        args: [address, currentProjectContract],
    });

    let approveTokenConfig = usePrepareContractWrite({
        address: contract.paymentToken,
        abi: usdtABI.abi,
        functionName: 'approve',
        args: [currentProjectContract, amountInput]
    });

    let donateTokenConfig = usePrepareContractWrite({
        address: contract.crowfunding1,
        abi: crowfundingABI.abi,
        functionName: 'donate',
        args: [amountInput]
    })

    const approveToken = useContractWrite(approveTokenConfig.config)
    const donateToken = useContractWrite(donateTokenConfig.config)

    return (
        <div className={style.container}>
            <div className={style.headerTitle}>
                <h1>{currentProjectName}</h1>
                <div>Available funds : {paymentTokenBalance.data?.toString()} USDT</div>

                <div> Donated (by you) so far : {associationToken.data?.toString() || 0}</div>

                <div>Transparency index : 90%</div>

                <div>Related links :</div>

                {crowfundingAllowance.isSuccess && <div>Currently approved {crowfundingAllowance.data?.toString()} token to be spend</div>}
                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', margin: '12px'}}>
                    <div className={style.actions}>
                        <input type={"number"} placeholder={"Input how many Tokens you want to donate"} value={amountInput} onChange={(e) => setAmountInput(e.target.value)}/>
                        <button disabled={!approveToken.write} onClick={() => approveToken.write?.()}>Approve</button>
                            <button disabled={!donateToken.write || crowfundingAllowance.data?.toString() === '0'} onClick={() => donateToken.write?.()}>Donate</button>
                    </div>
                </div>
            </div>
            <div className={style.content}>
                <h2>Description</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <h2>Benefits</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <h2>Commitments</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>)
};