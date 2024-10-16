import { useState,useEffect } from 'react'

import Board from './Board';
import HeaderSection from './HeaderSection';
import ButtonSection from './ButtonSection';
import GameIntro from "../GameIntro"
import GameImg from "../assets/2048.png"
import GameVideo from "../assets/2048.mp4"

import {win,lose,moveUp,moveDown,moveLeft,moveRight,clean,undo} from './utils'
import './App.css'


function The2048() {
  let nums = Array(16).fill(0)
  const aux = Math.floor(Math.random()*16)
  nums[aux]=2 
  
  const [sqnums,StateNums] = useState(nums)
  const [prev,StatePrev] = useState([])
  const [returnPrev,StateReturnPrev] = useState(false)

  const [score,StateScore] = useState(0)
  const [prevScore,StatePrevScore] = useState(0)

  const [started,StateStarted] = useState(false)

  const stateFunctions = {
    StateNums,
    StatePrev,
    StateReturnPrev,
    StateScore,
    StatePrevScore
  }
  const stateValues = {
    sqnums,
    prev,
    returnPrev,
    score,
    prevScore
  }

  const moveTiles = async (e)=>{
    e.preventDefault()
    StatePrev([...sqnums])

    StatePrevScore(score)
    switch (e.key) {
      case "ArrowUp":
        if(!moveUp(stateValues,stateFunctions)) return
        break;
      case "ArrowDown":

        if(!moveDown(stateValues,stateFunctions)) return
        break;
      case "ArrowLeft":

        if(!moveLeft(stateValues,stateFunctions)) return
        break;
      case "ArrowRight":

        if(!moveRight(stateValues,stateFunctions)) return
        break;
      default:
        return
    }
              
          
    let aux = sqnums
    let available = []
    for (let i = 0; i < aux.length; i++) {
      if(aux[i]===0){
        available.push(i)
      }
            
    }
    if(available.length===0) return
                 
    const n = Math.floor(Math.random()*available.length)
    const numgen = Math.floor(Math.random()*10)+1
    aux[available[n]]=numgen<=9?2:4
    StateNums([...aux])
    StateReturnPrev(true)
  }
          
  useEffect(()=>{
    window.addEventListener('keydown',moveTiles)

    return ()=>{
      window.removeEventListener('keydown',moveTiles)
    }
  })

  return (
    <>
      {!started &&
        <GameIntro
        startGame={()=>{StateStarted(true)}}
        name="2048"
        image={GameImg}
        video={GameVideo}
        videoIndex={1}
        />
      }
      {started &&
        <>
          <HeaderSection score={score}/>

          {win(sqnums) && <h2>You won!!!</h2>}
          {lose(sqnums) && <h2>You lost :/</h2>}
      
          <ButtonSection 
          returnPrev={returnPrev} 
          undo={()=>{undo(stateValues,stateFunctions)}} 
          clean={()=>{clean(stateValues,stateFunctions)}}
          />

          <Board nums={sqnums}/>
      </>}
    </>
  )
}

export default The2048
