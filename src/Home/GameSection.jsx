import Snake from "../assets/download.png"
import Tetris from "../assets/tetris.png"
import Mines from "../assets/minesweeper.jpeg"
import Two from "../assets/2048.png"
import GameButton from "./GameButton"

export default function GameSection(){

    const games = [
        <GameButton key={1} name="Snake" logo={Snake} route={"/snake"}/>,
        <GameButton key={2} name="Tetris" logo={Tetris} route={"/tetris"}/>,
        <GameButton key={3} name="Minesweeper" logo={Mines} route={"/minesweeper"}/>,
        <GameButton key={4} name="2048" logo={Two} route={"/2048"}/>
]



    return(
        <main id="gameSection">
            <div id="gameRow">

                {games.map(i=>{
                    return i
                })}
            </div>
            
        </main>




    )
}