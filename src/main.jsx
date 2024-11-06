import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, Routes,BrowserRouter} from "react-router-dom"
import Layout from './Layout'
import Home from './Home/Home'
import Snake from './Snake/Snake'
import Minesweeper from './Minesweeper/Minesweeper'
import Tetris from './Tetris/Tetris'
import The2048 from './2048/The2048'
import NoPage from './NoPage'
import "./index.css"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/Game-Center'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path='/snake' element={<Snake/>}></Route>
          <Route path='/minesweeper' element={<Minesweeper/>}></Route>
          <Route path='/tetris' element={<Tetris/>}></Route>
          <Route path='/2048' element={<The2048/>}></Route>
          <Route path='*' element={<NoPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
