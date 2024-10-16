import Utils from "./Utils"
const p = new Utils().figures


export const sides = (e,stateFunctions)=>{
    const {setDir} = stateFunctions
    if(e.key==="ArrowRight"){
        e.preventDefault()
        
        setDir("right")
    }
    if(e.key==="ArrowLeft"){
        e.preventDefault()

        setDir("left")
    }
    if(e.key==="ArrowDown"){
        e.preventDefault()

        setDir("down")
    }
    if(e.key==="ArrowUp"){
        e.preventDefault()

        setDir("up")
    }
}


    //function that change the position of the pivot of the falling piece
export const movePiece = (stateValues,stateFunctions)=>{
        const {cont,pieces,np,dir} = stateValues
        const {setCont,SetNp} = stateFunctions
        const piece = p[np.order[np.index]].nums[np.rotate]

        switch(dir){
            case "right":
                setCont(cont+11)
                //validations to restrict the move
                for (let i = 0; i < piece.length; i++) {
                    if((cont+piece[i]+1)%10===0 || pieces[cont+piece[i]+1]!=="" || pieces[cont+piece[i]+11]!==""){
                        setCont(cont+10)
                        break
                    }
                    
                }
                
                break

            case "left":
                setCont(cont+9)
                //validations to restrict the move

                for (let i = 0; i < piece.length; i++) {
                    if((cont+piece[i])%10===0 || pieces[cont+piece[i]-1]!=="" || pieces[cont+piece[i]+9]!==""){
                        setCont(cont+10)
                        break
                    }
                }
                break

            case "down":
                setCont(cont+20)
                //validations to restrict the move

                for (let i = 0; i < piece.length; i++) {
                    if((cont+piece[i]+10)>=210 || pieces[cont+piece[i]+10]!=="" || pieces[cont+piece[i]+20]!==""){
                        setCont(cont+10)
                        break
                    }
                }
                break
            case "up":

                const aux = p[np.order[np.index]].nums[ np.rotate<3 ? np.rotate+1 : 0]
                for (let i = 0; i < aux.length; i++) {
                    //to avoid rotations in borders
                    if((cont+(piece[i]+aux[i])+1)%10===0 && (cont%10===0 || (cont-1)%10===0 || (cont-2)%10===0)){
                        setCont(cont+10)
                        return
                    }
                    if((cont+(piece[i]+aux[i]))%10===0 && (cont%10===0 || (cont+1)%10===0 || (cont+2)%10===0)){
                        setCont(cont+10)
                        return
                    }
                    //to avoid rotations near blocks
                    if(!piece.includes(piece[i]+aux[i]) && pieces[cont+(piece[i]+aux[i])]!==""){
                        setCont(cont+10)
                        return   
                    }
                }
                SetNp({...np,rotate: np.rotate<3 ? np.rotate+1 : 0})
                setCont(cont+10)
                break
            default:
                setCont(cont+10)
        }

        
        
    }


export const fallingPiece = (stateValues,stateFunctions)=>{
        //moment when piece touch surface
        const {np,cont,pieces,score} = stateValues
        const {setPieces,setCont,setLose,SetNp,setScore} = stateFunctions
        const piece = p[np.order[np.index]].nums[np.rotate]

        for (let i = 0; i < piece.length; i++) {
            if(cont+piece[i]>=210 || pieces[cont+piece[i]+10]!==""){
                if(cont+piece[i]<20){
                    setLose(true)
                    return
                }
                for (let j = 0; j < piece.length; j++) {
                    pieces[cont+piece[j]] = np.order[np.index]
                }
                setCont(4) //resets the position of the falling piece
                //determines if it's necessary to create a new set of pieces
                if(np.index<6){

                    SetNp({...np,index:np.index+1,rotate:0})
                }
                else{
                    SetNp({
                        order:np.next,
                        index:0,
                        next:Utils.genBag(),
                        rotate:0
                    })
                }

                //to delete a row if it's full and move all the rows one row down
                for (let j = 0; j < pieces.length; j+=10) {
                    const row = pieces.slice(j,j+10)
                    if(!row.includes("")){
                        setScore(score+100)
                        for (let k = j; k>=10; k-=10) {
                            pieces.splice(k,10,...pieces.slice(k-10,k))
                           
                            
                        }
                    }

                }


                setPieces([...pieces])

                
                break
            }

        }
    }

    //fucntion to determie if the position of the board is a piece of the falling figure
export const isPiece = (index,stateValues)=>{
    const {np,cont} = stateValues
        const piece = p[np.order[np.index]].nums[np.rotate]
        for (let i = 0; i < piece.length; i++) {
            if(index===cont+piece[i]){
                return true
            }

        }
        return false
    }
    //function to determine if it's a piece that was positioned
export const isPlayed = (index,stateValues)=>{
        const {pieces} = stateValues
        for (let i = 0; i < pieces.length; i++) {
            if(pieces[index]!==""){
                return true
            }
            
        }
        return false
    }
export const setColors = (index,stateValues)=>{
        const {cont,np,pieces} = stateValues
        if(isPiece(index,stateValues)){
            return{
                backgroundColor: p[np.order[np.index]].color,
                border: `7px outset ${p[np.order[np.index]].border}`,
            }
        }
        else if (isPlayed(index,stateValues)){
            return{
                backgroundColor: p[pieces[index]].color,
                border: `7px outset ${p[pieces[index]].border}`
            }
        }
        else{
            return 
        }

    }

export const startGame = (stateFunctions)=>{
        stateFunctions.setStarted(true)
        stateFunctions.setAux(1)
    }
export const retry = (stateFunctions)=>{
        stateFunctions.setLose(false)
        stateFunctions.setScore(0)
        stateFunctions.setPieces(Array(220).fill(""))
        stateFunctions.setAux(0)
        stateFunctions.SetNp({
            order:Utils.genBag(),//order of the pieces
            index:0, //index of the bag
            next: Utils.genBag(), // next order of pieces
            rotate:0 
        })
        stateFunctions.setCont(4)
    }