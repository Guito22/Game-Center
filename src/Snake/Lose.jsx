import Videos from "../Videos"
import Video from "../assets/snake.mp4"
import QuestionMarkSharpIcon from "@mui/icons-material/QuestionMarkSharp"

export default function Lose({lose,retry}){
    return(
        <div id="loseInfo">
            {lose && <h2>You Lost!</h2>}
            {lose && <button onClick={()=>{Videos.showTutorial(Video,3)}}>
                    <QuestionMarkSharpIcon/>
                </button>}
            {lose && <button onClick={retry}>Retry</button>}
        </div>


    )
}