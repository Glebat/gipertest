import { Routes, Route, Link } from 'react-router-dom'
import Posts from './components/Posts'
import TodoList from './components/TodoList'
import './App.css'

const App = () => (
  <Routes>
    <Route path="/" element={

      
      <nav className="menu">
        <Link to="/posts"><button>Посты</button></Link>
        <Link to="/todos"><button>Задачи</button></Link>
      </nav>
    } />
    <Route path="/posts" element={<Posts />} />
    <Route path="/todos" element={<TodoList />} />
  </Routes>
)

export default App
