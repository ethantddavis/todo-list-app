import React, { useEffect } from 'react'
import "./styles.css";
import { ethers } from "ethers";

interface Props {
    currentAccount: string | undefined,
    chainName: string | undefined,
    setCurrentAccount: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const MetamaskConnect = ({currentAccount, chainName, setCurrentAccount}: Props) => {
    
    const onClickConnect = () => {
        if (!window.ethereum) {
            console.log("please install MetaMask");
            return;
        }
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
    
        provider.send("eth_requestAccounts", []).then((accounts) => {
            if (accounts.length > 0) setCurrentAccount(accounts[0]);
        }).catch((e) => console.log(e));
    };
    
    const onClickDisconnect = () => {
        setCurrentAccount(undefined);
        window.location.reload();
    }

    return (
        <div className="metamaskConnect">
            <div className="accountInfo">
                {currentAccount 
                    ? <p>Address: {currentAccount}<br/>Network: {chainName}</p>
                    : <></>
                }
            </div>
            <div className="connect">
                {currentAccount 
                    ? <form className="connectButton" onClick={onClickDisconnect}>
                        Disconnect wallet
                      </form>
                    : <form className="connectButton" onClick={onClickConnect}>
                        Connect to MetaMask
                      </form>
                }
            </div>
        </div>
    );
}

export default MetamaskConnect;