import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Landing from './pages/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Landing />
      <Footer />
    </>
  )
}

export default App
