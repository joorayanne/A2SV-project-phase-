import React, { useState } from 'react';
import type { Todo } from '../todo';

interface Props {
  todo: Todo;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
  toggleComplete: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, deleteTodo, editTodo, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      <div className={`todo-left ${todo.isCompleted ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleComplete(todo.id)}
        />
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ flex: 1 }}
          />
        ) : (
          <span>{todo.text}</span>
        )}
      </div>
      <div>
        {isEditing ? (
          <button className="save" onClick={handleSave}>
            Save
          </button>
        ) : (
          <>
            <button className="edit" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
