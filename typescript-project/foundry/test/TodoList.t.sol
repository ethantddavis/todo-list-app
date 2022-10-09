// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/TodoList.sol";

contract TodoListTest is Test {
    TodoList public todoList;  
    address public addr0;
    
    function setUp() public {
        addr0 = 0x2DD0e7C4EfF32E33f5fcaeE2aadC99C691134bB5;
        todoList = new TodoList();
    }

    function testCreateTodoAddedToIds() public {
        todoList.createTodo(1, "Feed the dog");

        uint256 size = todoList.getIds(address(this)).length;
        assertEq(todoList.getIds(address(this))[size - 1], 1);
    }

    function testCreateTodoMultipleIds() public {
        todoList.createTodo(1, "Feed the dog");
        todoList.createTodo(2, "Feed the bog");
        todoList.createTodo(3, "Feed the cog");
        todoList.createTodo(4, "Feed the fog");
        todoList.createTodo(5, "Feed the gog");

        uint256 size = todoList.getIds(address(this)).length;

        for (uint256 i = 0; i < size; i++) {
            assertEq(todoList.getIds(address(this))[i], i + 1);
        }
    }

    function testCreateTodoOwnerSet() public {
        todoList.createTodo(1, "Feed the dog");

        assertEq(todoList.getOwner(1), address(this));
    }

    function testCreateTodoValidContent() public {
        todoList.createTodo(1, "Feed the dog");

        assertEq(todoList.getContent(1), "Feed the dog");
    }

    function testCreateTodoIsCompleted() public {
        todoList.createTodo(1, "Feed the dog");

        assertEq(todoList.isCompleted(1), false);
    }

    function testEditTodoUnauthorizedAccess() public {
        todoList.createTodo(1, "Feed the dog");
        
        vm.prank(addr0);
        vm.expectRevert();
        todoList.editTodo(1, "feed");
    }

    function testEditContentChanged() public {
        todoList.createTodo(1, "Feed the dog");

        todoList.editTodo(1, "feed");

        assertEq(todoList.getContent(1), "feed");
    }

    function testCompleteTodoUnauthorizedAccess() public {
        todoList.createTodo(1, "Feed the dog");
        
        vm.prank(addr0);
        vm.expectRevert();
        todoList.completeTodo(1);
    }

    function testCompleteTodoIsCompleted() public {
        todoList.createTodo(1, "Feed the dog");
        
        todoList.completeTodo(1);

        assertEq(todoList.isCompleted(1), true);
    }

    function testCompleteTodoReverseComplete() public {
        todoList.createTodo(1, "Feed the dog");

        todoList.completeTodo(1);
        todoList.completeTodo(1);

        assertEq(todoList.isCompleted(1), false);
    }
}
