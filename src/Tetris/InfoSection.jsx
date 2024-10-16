import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';
import Video from "../assets/tetris.mp4"
import Videos from '../Videos';
export default function InfoSection({lose,score,retry}){
    return(
        <>
            <h2>Score: {score}</h2>
            {lose && <h2>You lost!</h2>}
            {lose && <button onClick={()=>{Videos.showTutorial(Video,2)}}>
                    <QuestionMarkSharpIcon/>
                </button>}
            {lose && <button id="retry" onClick={retry}>Retry</button>}
        </>
    )
}