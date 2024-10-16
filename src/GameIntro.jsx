import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Videos from './Videos';

export default function GameIntro({startGame,name,image,video,videoIndex}){
    return(
        <>
            <h1>{name}</h1>
            <img src={image} alt="" style={{width:"200px",height:"200px",margin:"1rem"}}/>

            <div id="StartButtons" style={{margin:"1rem"}}>
                <button onClick={()=>{Videos.showTutorial(video,videoIndex)}}>
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