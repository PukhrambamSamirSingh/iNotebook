import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert'
import Login from './components/Login'
import SignUp from './components/SignUp'

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is amazing" />
          <div className="app bg-gray-50">
            <Routes>
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<SignUp />} />
            </Routes>
          </div>

        </Router>
      </NoteState>
    </>
  )
}

export default App
