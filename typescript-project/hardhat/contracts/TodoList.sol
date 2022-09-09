// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract TodoList {

    mapping(address => uint256[]) private ids;
    mapping(uint256 => Todo) private todos;

    struct Todo {
        address owner;
        string content;
        bool completed;
    }

    function createTodo(uint256 id, string memory content) external {
        ids[msg.sender].push(id);
        todos[id].owner = msg.sender;
        todos[id].content = content;
    }

    function editTodo(uint256 id, string memory content) external {
        require(todos[id].owner == msg.sender);
        
        todos[id].content = content;
    }

    function completeTodo(uint256 id) external {
        require(todos[id].owner == msg.sender);

        todos[id].completed = true;
    }

    function getOwner(uint256 id) external view returns (address) {
        return todos[id].owner;
    }

    function getContent(uint256 id) external view returns (string memory) {
        return todos[id].content;
    }

    function isCompleted(uint256 id) external view returns (bool) {
        return todos[id].completed;
    }

    function getIds(address owner) external view returns (uint256[] memory) {
        return ids[owner];
    }
}