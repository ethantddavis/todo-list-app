import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillEyeInvisible } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { ethers } from "ethers";
import { AxiosInstance } from "axios";
 
type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todoListContract: React.MutableRefObject<ethers.Contract | undefined>,
    serverApi: React.MutableRefObject<AxiosInstance>
}

const SingleTodo = ({todo, todos, setTodos, todoListContract, serverApi}: Props) => {
    
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = async (id: number) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? {...todo, isDone: !todo.isDone}: todo
        ));

        // change contract to complete
        if (todoListContract.current) {
            const transaction = await todoListContract.current.completeTodo(id);
            const receipt = await transaction.wait();
        
            let res = await serverApi.current.post('/', {
                timestamp: id,
                userAddress: receipt.from,
                transactionHash: receipt.transactionHash,
                transactionType: "complete"
            });
            console.log(res);
        }
    }

    const handleDelete = async (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleEdit = async (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => (todo.id === id? { ...todo, todo: editTodo}: todo)));
        setEdit(false);

        if (todoListContract.current) {
            const transaction = await todoListContract.current.editTodo(id, editTodo);
            const receipt = await transaction.wait();
        
            let res = await serverApi.current.post('/', {
                timestamp: id,
                userAddress: receipt.from,
                transactionHash: receipt.transactionHash,
                transactionType: "edit"
            });
            console.log(res);
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <form className="todos_single" onSubmit={(e) => handleEdit(e, todo.id)}>
            {edit ? (
                <input 
                    ref={inputRef}
                    value={editTodo} 
                    onChange={(e) => setEditTodo(e.target.value)} 
                    className="todos_single--text"
                />
            ) : todo.isDone ? (
                <s className="todos_single--text">{ todo.todo }</s>
            ) : (
                <span className="todos_single--text">{ todo.todo }</span>
            )}
            
            <div id="icons">
                <span className="icon" onClick={() => {
                    if (!edit && !todo.isDone) {
                        setEdit(!edit)
                    }
                }}>
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiFillEyeInvisible />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdDone />
                </span>
            </div>
        </form>
    );
}

export default SingleTodo;
