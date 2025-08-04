import React, { useState } from 'react';

export default function TodoList() {
  const [input, setInput] = useState("");

  const [todoList, setTodoList] = useState<{id: number, text: string, completed: boolean}[]>([]);

  const addTodoItem = () => {
    const newTodoItem = {
      id: todoList.length + 1,
      text: input.trim(),
      completed: false,
    };
    setTodoList((prev) => [...prev, newTodoItem]);
    setInput("");
  }

  const toggleComplete = (id: number) => {
    setTodoList(todoList.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  const deleteTodoItem = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <input type="text" placeholder="Add a todo" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodoItem}>Add</button>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <input type= "checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => deleteTodoItem(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
