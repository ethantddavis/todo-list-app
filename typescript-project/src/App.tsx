import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MetamaskConnect from "./components/MetamaskConnect";
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { Todo } from "./components/model";
import { ethers } from "ethers";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentAccount, setCurrentAccount] = useState<string | undefined>(undefined);
  const [chainName, setChainName] = useState<string | undefined>(undefined);
  var provider = useRef<ethers.providers.Web3Provider | undefined>(undefined);

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
    // client side code
    if (!window.ethereum) return;
    provider.current = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.current.on("network", (newNetwork, oldNetwork) => {
      // reload page on network switch
      if (oldNetwork) {
          window.location.reload();
      }
      // set network name
      let tempChainName: string = "";
      if (newNetwork.chainId === 1) {
          tempChainName = "Ethereum Mainnet";
      } else {
          tempChainName = newNetwork.name;
      }
      // notify wrong network
      console.log(newNetwork.chainId);
      if (newNetwork.chainId !== 5) {
          tempChainName += " WARNING! Switch network to Goerli Testnet"
      }
      setChainName(tempChainName);
    });
  }, [currentAccount]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}])
      setTodo("");

    }
  };

  return (
    <div className="App">
      <MetamaskConnect 
        currentAccount={currentAccount} 
        chainName={chainName} 
        setCurrentAccount={setCurrentAccount}
      />
      <span className="heading">Todo Dapp</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;



