import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Video from "../assets/tetris.mp4"
import Videos from '../Videos';

export default function Start({startGame}){
    return(
        <>
            <h1>Tetris Game</h1>
            <div id="StartButtons">
                <button onClick={()=>{Videos.showTutorial(Video,2)}}>
                    <QuestionMarkSharpIcon/>
                </button>
                <button onClick={startGame}>
                    <PlayArrowIcon/>
                </button>
            </div>
            <h2>Click the right button to start and the left one for help</h2>
        </>
    )
}