import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Tasks.css'
import { Link } from 'react-router-dom';
import { Trash2, Pencil, CheckCheck } from 'lucide-react';
import { wait } from '../lib/utils';
import { notify } from '../lib/notification';

export const Tasks = () => {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const [todoIndex, setTodoIndex] = useState(-1)
  const [clicked, setClicked] = useState(false)

  const handleAddTodo = async () => {
    if (!text) return;

    setClicked(true)
    await wait(1000)

    if (todoIndex !== -1) {
      todos[todoIndex].name = text
      setTodos(todos)
      localStorage.setItem('todos', JSON.stringify(todos))
      setTodoIndex(-1)
    }
    else {
      const todoItem = {
        id: uuidv4(),
        name: text,
        completed: false
      }
      const todoList = [...todos, todoItem]
      setTodos(todoList)
      localStorage.setItem('todos', JSON.stringify(todoList))
    }

    setText('')
    setClicked(false)
    notify('Task added successfully.', 'success')
  }

  const handleDeleteTodo = (id) => {
    const todoList = todos.filter((todo) => todo.id !== id)
    setTodos(todoList)
    localStorage.setItem('todos', JSON.stringify(todoList))
  }

  const handleCheckTodo = (id) => {
    const todoList = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(todoList)
    localStorage.setItem('todos', JSON.stringify(todoList))
  }

  const handleEditTodo = (index) => {
    setText(todos[index].name)
    setTodoIndex(index)
  }

  useEffect(() => {
    const allTodos = JSON.parse(localStorage.getItem('todos'))
    if (allTodos) setTodos(allTodos)
  }, [])

  return (
    <main className='container'>
      <div style={{ display: 'flex', marginLeft: '1.5rem' }}>
        <input
          type="text"
          className='task-input'
          value={text}
          disabled={clicked}
          onChange={({ target }) => setText(target.value)}
          placeholder='Add a new task...'
          onKeyDown={({ key }) => key === 'Enter' && handleAddTodo()}
        />
      </div>
      <div className='todos-wrapper'>
        {todos.length ? todos?.map((todo, index) => (
          <div key={todo.id} className='todo-item'>
            <Link
              to={`/tasks/${todo.id}`}
              style={{
                textDecoration: todo.completed ? 'line-through' : null,
                opacity: todoIndex === index ? 0.5 : 1
              }}
              className='todo-link'
            >
              <span>{index + 1}. {todo.name}</span>
            </Link>
            <div className='icons'>
              <Trash2
                className='trash-icon'
                onClick={() => handleDeleteTodo(todo.id)}
              />
              <Pencil className='pencil-icon' onClick={() => handleEditTodo(index)} />
              <CheckCheck
                className='check-icon'
                onClick={() => handleCheckTodo(todo.id)}
              />
            </div>
          </div>
        )) : <h3 style={{ textAlign: 'center' }}>No tasks available</h3>}

        {/* {todos.length === 0 && <h3 style={{ textAlign: 'center' }}>No tasks available</h3>} */}
        <div className='todo-item'>
          {(todoIndex === -1 && clicked) && <span style={{ opacity: 0.5 }}>{todos?.length + 1}. {text}</span>}
        </div>

      </div>
    </main >
  )
}
