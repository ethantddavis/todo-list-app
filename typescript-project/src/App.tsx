import React, { useState, useEffect } from 'react';
import './App.css';
import MetamaskConnect from "./components/MetamaskConnect";
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { Todo } from "./components/model";
import { ethers } from "ethers";
import { Text, Button } from "@chakra-ui/react";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const [currentAccount, setCurrentAccount] = useState<string | undefined>(undefined);
  const [chainName, setChainName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
    // client side code
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then((result) => {
      setChainName(result.name);
    });
  }, [currentAccount]);

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
      <MetamaskConnect currentAccount={currentAccount} chainName={chainName} setCurrentAccount={setCurrentAccount}/>
      <span className="heading">Todo Dapp</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
