import { ethers } from "ethers";
import React from "react";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import "./styles.css"; 

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todoListContract: React.MutableRefObject<ethers.Contract | undefined>
} 

const TodoList: React.FC<Props> = ({todos, setTodos, todoListContract}: Props) => {

    return <div className="todos">
        {todos.map((todo) => (
            <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} todoListContract={todoListContract}/>
        ))}
    </div>;
}

export default TodoList;