import * as readline from "readline";

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

let todoList: TodoItem[] = [];
let nextId = 1;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu(): void {
  console.log("\nWhat would you like to do?");
  console.log("1. Add a new task");
  console.log("2. Edit a task");
  console.log("3. Delete a task");
  console.log("4. Show all tasks");
  console.log("5. Exit");

  rl.question("Enter your choice (1-5): ", handleMenu);
}

function handleMenu(choice: string): void {
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

function addTodo(task: string): void {
  const newTodo: TodoItem = {
    id: nextId++,
    task,
    completed: false,
  };
  todoList.push(newTodo);
  console.log(`Added: "${task}"`);
}

function editTodo(id: number, updatedTask: string): void {
  const todo = todoList.find((item) => item.id === id);
  if (todo) {
    todo.task = updatedTask;
    console.log(`Task ${id} updated.`);
  } else {
    console.log(`Task with id ${id} not found.`);
  }
}

function removeTodo(id: number): void {
  const index = todoList.findIndex((item) => item.id === id);
  if (index !== -1) {
    todoList.splice(index, 1);
    console.log(`Task ${id} deleted.`);
  } else {
    console.log(`Task with id ${id} not found.`);
  }
}

function displayTodos(): void {
  console.log("\nYour Todo List:");
  if (todoList.length === 0) {
    console.log("No tasks yet.");
  } else {
    todoList.forEach((todo) => {
      console.log(`[${todo.completed ? "x" : " "}] ${todo.id}: ${todo.task}`);
    });
  }
}

// Start the app
console.log("Welcome to your Todo List! Happy Tasking");
showMenu();
