import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';

import AutorenewIcon from '@mui/icons-material/Autorenew';

import Videos from '../Videos';
import Video from "../assets/2048.mp4"


export default function ButtonSection({returnPrev,undo,clean}){
    return(
        <div id="buttonSection">

            <button disabled={!returnPrev} onClick={undo}>
                <KeyboardReturnRoundedIcon/>
            </button>

            <button onClick={clean}>
                <AutorenewIcon/>
            </button>

            <button onClick={()=>{Videos.showTutorial(Video,1)}}>
                <QuestionMarkSharpIcon/>
            </button>
        
        </div>


    )
}