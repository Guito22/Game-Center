import "./Board.css"
import GameFunctions from "./GameFunctions";


export default function Board({stateValues,stateFunctions}){
    const {game,tiles} = stateValues
    //function to determine if the board is new


    return(
        <div id="mineboard">
        {tiles.map((i,index)=>{
            return (
            <div 
            className={(index+1)%2!==0 ? "sq1" : "sq2"}
            key={index}
            onClick={(e)=>{GameFunctions.leftClick(e,stateValues,stateFunctions)}}
            onContextMenu={(e)=>{GameFunctions.rightClick(e,stateValues,stateFunctions)}}
            onMouseEnter={(e)=>{GameFunctions.tileSelected(e,stateValues)}}
            >
            {/* it shows the mines when is a lost game */}
            {(tiles[index]===-1 && game==="lose") && "💣"}
            </div>
            )
        })}
    </div>

    )
}