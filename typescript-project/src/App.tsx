import React, { useState, useEffect } from 'react';
import './App.css';
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { Todo } from "./components/model";
import { abi } from "../hardhat/artifacts/contracts/TodoList.sol/TodoList.json"; 
import { ethers } from "ethers";
import { Text, Button } from "@chakra-ui/react";



const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [currentAccount, setCurrentAccount] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [chainName, setChainName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
    // client side code
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(currentAccount).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });
    provider.getNetwork().then((result) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });
  }, [currentAccount]);

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
    console.log("onClickDisconnect");
    setBalance(undefined);
    setCurrentAccount(undefined);
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}])
      setTodo("");
    }
  };

  console.log(todos);

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <div>
        {currentAccount 
          ? <Button type="button" onClick={onClickDisconnect}>
              Account:{currentAccount}
            </Button>
          : <Button type="button" onClick={onClickConnect}>
              Connect to MetaMask
            </Button>
        }
      </div>
      {currentAccount 
        ? <div>
            <Text>ETH Balance of current account: {balance}</Text>
            <Text>Chain Info: ChainId {chainId} Name {chainName}</Text>
          </div>
        : <></>
      }
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
