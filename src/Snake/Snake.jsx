import React from 'react'
import { useState } from 'react'
import './App.css'
import './Board.css'
import { useEffect } from 'react'
import HeadInfo from './HeadInfo'
import Lose from './Lose'
import Board from './Board'
import {startGame,retry,changeBoard} from './Utils'
import GameIntro from '../GameIntro'
import SnakeImg from "../assets/download.png"
import SnakeVideo from "../assets/snake.mp4"

function Snake() {
  
  //start position of snake in the board
  const start =112
  let appleStart = Math.floor(Math.random()*225)

  //to avoid the apple and the snake to appear in the same spot
  while(appleStart===start){
    appleStart = Math.floor(Math.random()*225)
  }

  const [time, StateTime] = useState(0) //time counter
  const [pos,StatePos] = useState([start]) //current position on the board
  const [prevPos,StatePrevPos] = useState(pos[0]) //current position on the board
  const [direc,StateDir] =useState("Right") //direction of the snake
  const [apple,StateApple] = useState(appleStart)
  const [score,StateScore] = useState(0)
  const [lose, StateLose] = useState(false)
  const [started,StateStarted] = useState(false)

  const stateValues = {
    time,pos,prevPos,direc,apple,score,lose,started
  }
  const stateFunctions = {
    StateTime,StatePos,StatePrevPos,StateDir,StateApple,StateScore,StateLose,StateStarted
  }

  //simple effect hook to call the function of update
  useEffect(()=>{

    if(!started) return 
    async function update(){
      await changeBoard(stateValues,stateFunctions)
      
    } 
    update()
  },[time])


  return (
    <>
      {!started && 
        <GameIntro 
        startGame={()=>{startGame(stateFunctions)}}
        name="Snake"
        image={SnakeImg}
        video={SnakeVideo}
        videoIndex={3}
        />
      }
      {started && <HeadInfo time={time} score={score}/> }
      {started && <Lose lose={lose} retry={()=>{retry(stateFunctions)}}/>}
      {started && <Board pos={pos} apple={apple}/>}

    </>
  )
}

export default Snake
