import InfoSection from "./InfoSection"
import Utils from "./Utils"


export default function NextPiece({next,lose,score,retry}){
    //array of the figures of the class Utils
    const p = new Utils().figures

    //function to determine if that position is a piece
    const isPiece = (index)=>{
        let piece = []
        if(next.index<6){
            piece = p[next.order[next.index+1]].nums[0]
        }
        else{
            piece = p[next.next[0]].nums[0]

        }
        //to fix the display problem, the figure position pivot doesnt work the same here
        for (let i = 0; i < piece.length; i++) {
            if(piece[i]>=9) piece[i]-=4
            if(piece[i]<=-9) piece[i]+=4
            
            
        }

        for (let i = 0; i < piece.length; i++) {
            if(index===20+piece[i]){
                return true
            }

        }
        return false
    }
    //function to set the next color and border even if it's the last el of the bag
    const nextColor = (index)=>{
        if(!isPiece(index)) return 
        if(next.index<6){
            return{
                backgroundColor:p[next.order[next.index+1]].color,
                border: `7px outset ${p[next.order[next.index+1]].border}`
            }
        }
        //to display the first element of the next bag when the current one is done
        else{
            return{
                backgroundColor:p[next.next[0]].color,
                border:`7px outset ${p[next.next[0]].border}`
            }
        }
    }




    return(
        <div id="nextSection">
            <h2>Next</h2>
            <div id="nextPiece">
                {Array(36).fill("").map((i,index)=>{
                    return <div 
                    className="tetrisSq" 
                    key={index}
                    style={nextColor(index)}></div>
                })}
            </div>
            <br />
            <InfoSection retry={retry} lose={lose} score={score}/>
        
        </div>
    )
}