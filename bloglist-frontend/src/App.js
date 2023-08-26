import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './components/Main'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main/>}></Route>
      <Route path='/health' element={'ok'}></Route>
    </Routes>
  )
}

export default App