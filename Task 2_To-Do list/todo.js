"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
let todoList = [];
let nextId = 1;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function showMenu() {
    console.log("\nWhat would you like to do?");
    console.log("1. Add a new task");
    console.log("2. Edit a task");
    console.log("3. Delete a task");
    console.log("4. Show all tasks");
    console.log("5. Exit");
    rl.question("Enter your choice (1-5): ", handleMenu);
}
function handleMenu(choice) {
    switch (choice.trim()) {
        case "1":
            rl.question("Enter task description: ", (desc) => {
                addTodo(desc);
                showMenu();
            });
            break;
        case "2":
            displayTodos();
            rl.question("Enter task ID to edit: ", (id) => {
                rl.question("Enter new task description: ", (newTask) => {
                    editTodo(Number(id), newTask);
                    showMenu();
                });
            });
            break;
        case "3":
            displayTodos();
            rl.question("Enter task ID to delete: ", (id) => {
                removeTodo(Number(id));
                showMenu();
            });
            break;
        case "4":
            displayTodos();
            showMenu();
            break;
        case "5":
            console.log("Goodbye!");
            rl.close();
            break;
        default:
            console.log("Invalid choice. Try again.");
            showMenu();
            break;
    }
}
function addTodo(task) {
    const newTodo = {
        id: nextId++,
        task,
        completed: false,
    };
    todoList.push(newTodo);
    console.log(`Added: "${task}"`);
}
function editTodo(id, updatedTask) {
    const todo = todoList.find((item) => item.id === id);
    if (todo) {
        todo.task = updatedTask;
        console.log(`Task ${id} updated.`);
    }
    else {
        console.log(`Task with id ${id} not found.`);
    }
}
function removeTodo(id) {
    const index = todoList.findIndex((item) => item.id === id);
    if (index !== -1) {
        todoList.splice(index, 1);
        console.log(`Task ${id} deleted.`);
    }
    else {
        console.log(`Task with id ${id} not found.`);
    }
}
function displayTodos() {
    console.log("\nYour Todo List:");
    if (todoList.length === 0) {
        console.log("No tasks yet.");
    }
    else {
        todoList.forEach((todo) => {
            console.log(`[${todo.completed ? "x" : " "}] ${todo.id}: ${todo.task}`);
        });
    }
}
// Start the app
console.log("Welcome to your Todo List! Happy Tasking");
showMenu();
