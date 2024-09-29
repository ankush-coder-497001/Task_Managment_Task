import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskCard from './components/taskcard'
import Home from './components/Homepage'
import Login from './components/login'
import Register from './components/register'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import CreateTask from './components/cretetask'
import Mytask from './components/mytask'
import ModifyTask from './components/UpdateTask'


function App() {



  return (
    <>

<div>
      <Toaster position='top-center' >
      </Toaster>
    </div>

    <Router>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        
        <Route path='/createTask' element={<CreateTask/>}/>

        <Route path='/myTask' element={<Mytask/>}/>
        <Route path='/Update' element={<ModifyTask/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
