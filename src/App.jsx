import { Home, Tasks, Header, About, Task } from './components'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer
        theme='colored'
        position='top-right'
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks/:id" element={<Task />} />
      </Routes>

    </>
  )
}

export default App
