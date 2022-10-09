import { ethers } from "ethers";
import React from "react";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import "./styles.css"; 
import { AxiosInstance } from "axios";

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todoListContract: React.MutableRefObject<ethers.Contract | undefined>,
    serverApi: React.MutableRefObject<AxiosInstance>
} 

const TodoList: React.FC<Props> = ({todos, setTodos, todoListContract, serverApi}: Props) => {

    return <div className="todos">
        {todos.map((todo) => (
            <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} todoListContract={todoListContract} serverApi={serverApi}/>
        ))}
    </div>;
}

export default TodoList;