import React, { useState } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    const trimmed = input.trim();
    if (trimmed === '') return;
    setTasks([...tasks, { id: Date.now(), text: trimmed, done: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>📝 To-Do App</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a new task"
          style={{ flex: 1, padding: '10px' }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '10px 16px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              background: '#f8f8f8',
              padding: '10px',
              margin: '6px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '5px',
              textDecoration: task.done ? 'line-through' : 'none',
              color: task.done ? '#777' : '#000',
            }}
          >
            <span onClick={() => toggleComplete(task.id)} style={{ cursor: 'pointer' }}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                background: 'transparent',
                color: '#dc3545',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p style={{ color: '#666' }}>No tasks yet. Add one!</p>}
    </div>
  );
}
