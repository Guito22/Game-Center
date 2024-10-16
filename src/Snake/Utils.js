export const startGame = (stateFunctions)=>{
    stateFunctions.StateStarted(true)
    stateFunctions.StateTime(1)
  }

export const retry = (stateFunctions)=>{
    stateFunctions.StatePos([112])
    stateFunctions.StateDir("Right")
    stateFunctions.StateScore(0)
    stateFunctions.StateLose(false)
    stateFunctions.StateTime(0)
    let num =Math.floor(Math.random()*225)
    while(num===112){
      num =Math.floor(Math.random()*225)
    }
    stateFunctions.StateApple(num)
  }

//function to determine wether should be valid the move or not
export const changePos = (stateValues,stateFunctions) =>{
    let {pos,direc} =  stateValues
    switch(direc){
        case "Right":
            if((pos[0]+1)>Math.floor((pos[0]+1)/15)*15){

                let snake = [pos[0]]
                for (let i = 1; i < pos.length; i++) {
                snake[i]=pos[i-1]
                
                }
                snake[0]=pos[0]+1
                stateFunctions.StatePos(snake)
            }
            else{
                stateFunctions.StateLose(true)
            }
            break
        case "Left":
            if((pos[0])%15!==0){
                let snake = [pos[0]]
                for (let i = 1; i < pos.length; i++) {
                snake[i]=pos[i-1]
                
                }
                snake[0]=pos[0]-1
                stateFunctions.StatePos(snake)

            }
            else{
                stateFunctions.StateLose(true)
            }
            break
        case "Up":
            if(pos[0]>=15){
                let snake = [pos[0]]
                for (let i = 1; i < pos.length; i++) {
                snake[i]=pos[i-1]
                
                }
                snake[0]=pos[0]-15
                stateFunctions.StatePos(snake)
            }
            else{
                stateFunctions.StateLose(true)
            }
            break  
        case "Down":
            if(pos[0]<210){
                let snake = [pos[0]]
                for (let i = 1; i < pos.length; i++) {
                snake[i]=pos[i-1]
                
                }
                snake[0]=pos[0]+15
                stateFunctions.StatePos(snake)
            }
            else{
                stateFunctions.StateLose(true)
            }
            break
  }
}

export const addScore = (stateValues,stateFunctions)=>{
    let {pos,direc,apple,score} = stateValues
    if(apple===pos[0]){
      let newApple = Math.floor(Math.random()*225)
      for (let i =0;i<pos.length;++i) {
        while (newApple===pos[i]) {
          newApple = Math.floor(Math.random()*225)
        }
        
      }
      stateFunctions.StateApple(newApple)
      stateFunctions.StateScore(score+1)
      switch (direc) {
        case "Right":
          stateFunctions.StatePos([...pos,pos[pos.length-1]-1])
          break;
        case "Left":
          stateFunctions.StatePos([...pos,pos[pos.length-1]+1])
          break;
        case "Up":
          stateFunctions.StatePos([...pos,pos[pos.length-1]+15])
          break;
        case "Down":
          stateFunctions.StatePos([...pos,pos[pos.length-1]-15])
          break;

      }
    }
  }

export const isLost = (stateValues,stateFunctions)=>{
    if(stateValues.lose) return true
       for (let i = 1; i < stateValues.pos.length; i++) {
        if(stateValues.pos[0]===stateValues.pos[i]){
          stateFunctions.StateLose(true)
          return true
        }
        
    }
    return false
  }

  //function to change the direction of the snake
export const changeDir = (e,stateValues,stateFunctions)=>{
    switch(e.key){
      case "ArrowUp":
        e.preventDefault()

            stateFunctions.StateDir("Up")
        break
      case "ArrowDown":
        e.preventDefault()

          stateFunctions.StateDir("Down")
        break
      case "ArrowRight":
        e.preventDefault()

          stateFunctions.StateDir("Right")
        break
      case "ArrowLeft":
        e.preventDefault()

          stateFunctions.StateDir("Left")
        break
    }
  }

  //function that makes changes in the board every 500ms
export const changeBoard = (stateValues,stateFunctions)=>{
  const {pos} = stateValues
  const {StatePrevPos} = stateFunctions
    return new Promise((res,rej)=>{
      setTimeout(()=>{
        if(isLost(stateValues,stateFunctions)) return res("yes")
        
        changePos(stateValues,stateFunctions)
        addScore(stateValues,stateFunctions)

        stateFunctions.StateTime(stateValues.time+1)


        window.addEventListener("keydown",(e)=>{
          changeDir(e,stateValues,stateFunctions)
        })
        return ()=>{
            window.removeEventListener("keydown",changeDir)
            res("yes")
          }
        
      },100 - (10*(stateValues.score/10)))})
  }