const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];
let nextId = 1;

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST new todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  res.json(todo);
});

// PATCH toggle complete
app.patch('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Not found' });
  todo.completed = !todo.completed;
  res.json(todo);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== Number(req.params.id));
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));