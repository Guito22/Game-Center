
export default function Board({pos,apple}){
    const isIn = (index)=>{
        //function to replace the includes that seems not to work here
        for (let i = 0; i < pos.length; i++) {
            if(pos[i]===index)
                return true
            
        }
        return false
    }
    const getIndex = (index)=>{
        for (let i = 0; i < pos.length; i++) {
            if(pos[i]===index){
                return i+1
            }
            
        }
    }
    return(
        <div id="board">
            {Array(15*15).fill(0).map((i,index)=>{
                return (
                <div 
                className={(index+1)%2!==0 ? "square1" : "square2"}
                key={index}
                >
                {isIn(index) && <div className={getIndex(index)%2===0 ? "snake1": "snake2"}>{getIndex(index)===1 && ':'}</div>}
                {apple===index && '🍎'} 
                </div>
                )
            })}
        </div>
    )
}