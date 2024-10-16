import { setColor,setSize,setColorFont } from "./tilesStyles"

export default function Board({nums}){
    //generate a array of colors to use for the tiles of a 2048 game


    return(

        <div id="board2048">

            {nums.map((i,index)=>{
                
                return( 
                    <div 
                    className="squareNum" 
                    key={index}
                    style={
                        {color:setColorFont(i),
                        fontSize:setSize(i),
                        backgroundColor:setColor(i),
                        transition:"0.2s all ease-in-out"}}
                        >
                        {i!==0 && i}
                    </div>
                )
            })}
        </div>


    )
}

