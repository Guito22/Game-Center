class GameFunctions{

    static getChildren = () =>{
        const board = document.querySelector("#mineboard")
        return board.children
    }

    static getIndex = (e) =>{
        const children = this.getChildren()
        //we get the children of the board and find the right index
        for (let i = 0;i<children.length;i++) {
            if(children[i]===e.target){
                return i
            }
        }   
    }



    static getSurroundings = (index)=>{
        let surr = [1,-1,15,-15,-14,14,16,-16]
        
        if(index%15===0){
            surr = [1,15,-15,-14,16]
        }
        if((index+1)%15===0){
            surr = [-1,15,-15,-16,14]
        }
        if(index<15){
            surr = [1,-1,15,14,16]
        }
        if(index>210){
            surr = [1,-1,-15,-14,-16]
        }
        if(index===0){
            surr = [1,15,16]
        }
        if(index===14){
            surr = [-1,15,14]
        }
        if(index===210){
            surr = [1,-15,-14]
        }
        if(index===224){
            surr = [-1,-15,-16]
        }
        return surr
    }
    
    static SetNumber = (index,tiles)=>{
        tiles[index]=-2

        const numColors = ["blue","darkgreen","red","purple","orange","pink","lightblue","black"]

        const children = this.getChildren()
        let cont = 0
        const surr = this.getSurroundings(index)
        for (let j = 0; j < surr.length; j++) {
            if(tiles[index+surr[j]]===-1){
                ++cont
            }
                    
        }
        if(cont>0){
            children[index].textContent = `${cont}`
            children[index].style.color = numColors[cont-1]
        }

        children[index].style.backgroundColor = "yellowgreen"
        return {tiles,"empty":cont===0}

    }

    static getWinner = (tiles)=>{
        let cont = 0
        const children = this.getChildren()
        for (let i = 0; i < children.length; i++) {
            if(tiles[i]===-1 && children[i].textContent==="🚩"){
                ++cont
            }
        }

        return cont===40
    }
    static isSourrounding = (e,index)=>{
        const i = this.getIndex(e)
        if(i===index) return true
        const surr = this.getSurroundings(i)
        for (let j = 0; j < surr.length; j++) {
            if(i+surr[j]===index) return true
            
        }
        return false
    }

    static removeTile = (e,stateValues,stateFunctions)=>{
        let {tiles} = stateValues
        let {setTiles,SetGame} = stateFunctions
        let index = this.getIndex(e)
        const children = this.getChildren(e)

        if(children[index].textContent === "🚩") return
        //set lose if it was a mine
        if(tiles[index]===-1){
            
            SetGame("lose")
            return
        }
        let tileInfo,newtiles,indexesChecked = [],aux
        let surr = this.getSurroundings(index)
        if(children[index].textContent ===""){
            tileInfo = this.SetNumber(index,tiles)
            newtiles = tileInfo.tiles
            // checks if it's empty to remove its surroundings 
            do {
                aux=false
                for (let a = 0; a < 255; a++) {
                    if(this.isTileEmpty(newtiles,a) && newtiles[a]===-2 && !indexesChecked.includes(a)){
                        indexesChecked.push(a)
                        let surr = this.getSurroundings(a)
                        aux=true
                            for (let i = 0; i < surr.length; i++) {
                                if(a+surr[i]>=0 && a+surr[i]<255){

                                    tileInfo = this.SetNumber(a+surr[i],newtiles)
                                    newtiles = tileInfo.tiles
                                }

                            
                        }

                    }
                    
                }
            } while (aux);
        }
        else{
            tileInfo = this.SetNumber(index,tiles)
            newtiles = tileInfo.tiles
            for (let i = 0; i < surr.length; i++) {
                
                if(children[index+surr[i]].textContent!=='🚩'){
                    if(tiles[index+surr[i]]===-1){
                        SetGame("lose")
                        return 
                    }
                    tileInfo = this.SetNumber(index+surr[i],newtiles)
                    newtiles = tileInfo.tiles  
                }
                
            }
        }
        setTiles(newtiles)
        if(this.getWinner(newtiles)===true) SetGame("win")


    }

    //different colors for different numbers
    //function that creates an array of 225 el with 40 "mines"
    static createBoard = (e,stateValues,stateFunctions)=>{
        let {tiles} = stateValues
        for (let i = 0; i < 40; i++) {
            let num = Math.floor(Math.random()*225)
            for (let j = 0; j < 225; j++) {
                while(tiles[num]===-1 || GameFunctions.isSourrounding(e,num)){
                    num = Math.floor(Math.random()*225)
                }
                
            }
            tiles[num]=-1
        }
        stateFunctions.setTiles(tiles)
        
    }


    //function to add or remove a flag from a tile
    static addFlag = (e,stateValues,stateFunctions)=>{
        let {flags,tiles} = stateValues
        if(flags===0) return
        if(tiles[GameFunctions.getIndex(e)]==-2) return 
        if(e.target.textContent==="🚩"){

            e.target.textContent = ""
            stateFunctions.SetFlags(flags+1)
        }
        else{
            e.target.textContent = "🚩"
            stateFunctions.SetFlags(flags-1)
        }
    }   
    //function to remove a tile, if it's numberless it removes its surroundings  

    //function to create a new board
    static resetBoard = (stateFunctions)=>{
        const sqs = document.querySelector("#mineboard").children
        for (let i = 0; i < sqs.length; i++) {
            sqs[i].textContent = ""
            if((i+1)%2!==0){
                sqs[i].style.backgroundColor = "green"
            }
            else{
                sqs[i].style.backgroundColor = "darkgreen"

            }
            
        }
        stateFunctions.SetFlags(40)
        stateFunctions.setTiles(Array(225).fill(""))
        stateFunctions.SetGame("normal")

    }
    static isTileEmpty = (tiles,index)=>{
        const indexes = [-16,-15,-14,-1,1,14,15,16]
        for (let i = 0; i < indexes.length; i++) {
            if(index+indexes[i]>=0 && index+indexes[i]<255){
                if(tiles[index+indexes[i]]===-1){
                    return false
                }
            }
            
        }
        return true
    }

    static isEmpty = (stateValues)=>{
        const {tiles} = stateValues
        for (let i = 0; i < tiles.length; i++) {
            if(tiles[i]!=='') return false
            
        }
        return true
    }

    //self explanatory
    static leftClick = (e,stateValues,stateFunctions)=>{
        if(this.isEmpty(stateValues)) this.createBoard(e,stateValues,stateFunctions)
        if(stateValues.game==="lose") return
        this.removeTile(e,stateValues,stateFunctions)
    }

    static rightClick = (e,stateValues,stateFunctions)=>{
        e.preventDefault()
        if(this.isEmpty(stateValues)) return 
        //to avoid adding flags outside the board
        this.addFlag(e,stateValues,stateFunctions)
    }

    static tileSelected = (e,stateValues)=>{
        const children = GameFunctions.getChildren()
        const tile = GameFunctions.getIndex(e)
        const surr = GameFunctions.getSurroundings(tile)
        for (let i = 0; i < surr.length; i++) {
        
            if(stateValues.tiles[tile+surr[i]]!==-2){
                return
            }
            
        }
        children[tile].style.border = "none"
        children[tile].style.borderRadius = "0px"
        children[tile].style.cursor = "default"
    }


}

export default GameFunctions