import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MetamaskConnect from "./components/MetamaskConnect";
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { Todo } from "./components/model";
import { ethers } from "ethers";
import contractJson from "./TodoList.json";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentAccount, setCurrentAccount] = useState<string | undefined>(undefined);
  const [chainName, setChainName] = useState<string | undefined>(undefined);

  var provider = useRef<ethers.providers.Web3Provider | undefined>(undefined);
  var todoListContract = useRef<ethers.Contract | undefined>(undefined);

  const contractAddress = "0xaA3bcffb2599dfF278C8121E260107e307744404";

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return; 
    if (!window.ethereum) return; 

    provider.current = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.current.on("network", (newNetwork, oldNetwork) => {
      
      // reload page on network change
      if (oldNetwork) window.location.reload();

      // set network name
      let tempChainName = "";
      newNetwork.chainId === 1 ?
        tempChainName = "Ethereum Mainnet" 
        : tempChainName = newNetwork.name;

      // notify wrong network
      if (newNetwork.chainId !== 5) {
        setChainName("Switch network to Goerli Testnet to interact with contract (currently " 
          + tempChainName
          + ")"
        );
      } else {
        setChainName("Goerli");
        initilizeContract();
        getPriorTodos();
      }
    });
  }, [currentAccount]);

  const initilizeContract = async() => {
    if (provider.current) {
      todoListContract.current = new ethers.Contract(contractAddress, contractJson["abi"], provider.current.getSigner());
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newId = Date.now();
      setTodos([...todos, {id: newId, todo: todo, isDone: false}]);
      setTodo("");

      // send ID and content to contract
      if (todoListContract.current) {
        await todoListContract.current.createTodo(newId, todo).send;
      }
    }
  }

  const getPriorTodos = async () => {
    if (todoListContract.current) {
      const ids = await todoListContract.current.getIds(currentAccount);
      const oldTodos: Todo[] = [];

      for (var i = 0; i < ids.length; i++) {
        const content = await todoListContract.current.getContent(ids[i]);
        const done = await todoListContract.current.isCompleted(ids[i]);
        
        oldTodos.push({id: ids[i].toNumber(), todo: content, isDone: done});
      }

      setTodos(oldTodos);
    }
  }

  return (
    <div className="App">
      <MetamaskConnect 
        currentAccount={currentAccount} 
        chainName={chainName} 
        setCurrentAccount={setCurrentAccount}
      />
      <span className="heading">Todo Dapp</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos} todoListContract={todoListContract}/>
    </div>
  );
}

export default App;



