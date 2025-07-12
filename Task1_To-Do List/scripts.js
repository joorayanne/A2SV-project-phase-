function addTask() {
  const input = document.getElementById("new-task");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;

  checkbox.onchange = () => {
    span.classList.toggle("completed", checkbox.checked);
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => editTask(span, editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  document.getElementById("task-list").appendChild(li);
  input.value = "";
}

function editTask(span, editBtn) {
  const currentText = span.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className = "edit-input";

 
  span.replaceWith(input);
  editBtn.textContent = "Save";

  editBtn.onclick = () => {
    const newText = input.value.trim();
    if (newText !== "") {
      span.textContent = newText;
      input.replaceWith(span);
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editTask(span, editBtn);
    }
  };

  input.focus();
}
