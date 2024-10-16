import {useEffect, useState} from "react"
import Board from "./Board"


import "./App.css"

import StatusBar from "./StatusBar";
import GameIntro from "../GameIntro";
import MineImg from "../assets/minesweeper.jpeg"
import MineVideo from "../assets/mines.mp4"

export default function Minesweeper(){
    const [tiles,setTiles] = useState(Array(225).fill(""))
    const [flags,SetFlags] = useState(40)
    const [game,SetGame] = useState("normal")
    const [started,SetStarted] = useState(false)

    const stateValues = {tiles,flags,game}
    const stateFunctions = {setTiles,SetFlags,SetGame}


    return(
        <>
            {!started &&
                <GameIntro
                startGame={()=>{SetStarted(true)}}
                name="Minesweeper"
                image={MineImg}
                video={MineVideo}
                videoIndex={0}
                />
            }
            {started &&
                <>
                <StatusBar game={game} flags={flags} stateFunctions={stateFunctions}/>
                <Board stateValues={stateValues} stateFunctions={stateFunctions}/>
                </>
            }
        </>
    )


}