import AutorenewIcon from '@mui/icons-material/Autorenew';
import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';
import Video from "../assets/mines.mp4"
import Videos from "../Videos";
import GameFunctions from './GameFunctions';

export default function StatusBar({game,flags,stateFunctions}){
    return(
        <>
            {/* losing message */}
            <h2 id="winlose">{game==="lose" && "You lost 💀"}{game==="win" && "You won 🥵"}</h2>
            <div id="statusBar">
                {/* flags counter */}
                <h2>🚩 : {flags}</h2> 
                {/* resetButton */}
                <button onClick={()=>{Videos.showTutorial(Video,0)}}>
                    <QuestionMarkSharpIcon/>
                </button>
                <button onClick={()=>{GameFunctions.resetBoard(stateFunctions)}}>
                    <AutorenewIcon/>
                </button>
            </div>
        </>
    )



    
}