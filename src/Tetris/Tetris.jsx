import { useEffect, useState } from "react"
import "./Board.css"
import Utils from "./Utils"
import NextPiece from "./NextPiece"
import GameIntro from "../GameIntro"
import TetrisImg from "../assets/tetris.png"
import TetrisVideo from "../assets/tetris.mp4"
import { sides,movePiece,fallingPiece,setColors,startGame,retry } from "./GameFunctions"

export default function Tetris(){

    const [pieces,setPieces] = useState(Array(220).fill(""))

    const [cont,setCont] = useState(4)
    const [aux,setAux] = useState(0)
    const [dir,setDir] = useState("")
    // np for new piece
    const [np,SetNp] = useState({
        order:Utils.genBag(),//order of the pieces
        index:0, //index of the bag
        next: Utils.genBag(), // next order of pieces
        rotate:0 //to determine which position has the piece
    })

    const [lose,setLose] = useState(false)
    const [score,setScore] = useState(0)
    const [started,setStarted] = useState(false)

    const stateValues = {
        pieces,cont,aux,dir,np,lose,score,started
    }
    const stateFunctions = {
        setPieces,setCont,setAux,setDir,SetNp,setLose,setScore,setStarted
    }

    //function that change the state of the board every 500 ms
    const falling = ()=>{
        return new Promise((res,err)=>{
            setTimeout(()=>{
                window.addEventListener("keydown",(e)=>{
                    sides(e,stateFunctions)
                },{once:true})

                movePiece(stateValues,stateFunctions)

                fallingPiece(stateValues,stateFunctions)    
                            

                if(lose===false) setAux(aux+1)
                return(()=>{
                    window.removeEventListener("keydown",sides)
                    res("hello")

                })
            },(500-(score/20)))
        })
    }

    //async function called every 500ms
    useEffect(()=>{
        if(!started) return
        async function move(){
            await falling()
        }
        move()
        setDir("")

    },[aux])


    return(
        <>
            {!started && 
                <GameIntro
                startGame={()=>{startGame(stateFunctions)}}
                name="Tetris"
                image={TetrisImg}
                video={TetrisVideo}
                videoIndex={2}
                />
                }
            {started && <div id="tetrisBoard">
                {pieces.map((i,index)=>{
                    
                    return(
                    index>19 && 
                    <div 
                    key={index}
                    className="tetrisSq"
                    style={setColors(index,stateValues)}
                    
                    
                    >

                    </div>
                    )
                })}
            </div>}
            {started && <NextPiece next={np} lose={lose} score={score} retry={()=>{retry(stateFunctions)}}/>}
        </>
    )
}