import { useEffect, useState } from 'react'

import './TodoList.css'

function TodoList() {
  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [idc, setIdc] = useState(1);

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  function addTodo() {
    if(inputText !== '') {
      const newTodo = { id: idc, text: inputText, completed: false }
      setTodoList([...todoList, newTodo])
      setIdc(idc + 1)
      setInputText('')
    }
  }

  function check(id) {
    const updatedTodos = todoList.map((todo) => {
      return todo.id === id ? {...todo, completed: !todo.completed} : todo
    })
    setTodoList(updatedTodos)
  }

  function delettask(id) {
    const filterTodos = todoList.filter((todo) => todo.id !== id)
    setTodoList([...filterTodos])
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className="container-todo">
      <h1 className="title">Список задач</h1>
      
      <div className="form">
        <input  type="text" className="input"onChange={handleInputChange} value={inputText} placeholder="Задача..."/>
        <button className="add" onClick={addTodo}> Добавить</button>
      </div>

      <ul className="list">
        {todoList.map((todo) => (
          <li key={todo.id} className={`task ${todo.completed ? 'done' : ''}`}>
            <span className="text">{todo.text}</span>
            <div className="tools">
              <input type="checkbox"  className="check" onChange={() => check(todo.id)} checked={todo.completed} />
              <button className="delete" onClick={() => delettask(todo.id)}> Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList