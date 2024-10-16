//function that determines if there is a 2048 tile 
export const win = (numbers) =>{
  for (const i of numbers) {
    if(i===2048)
      return true
  }
  return false
}
// function that determines there is no possible moves
export const lose = (numbers) =>{
  let c1=0,c2=0,m=[[],[],[],[]]
  for (let i = 0; i < 16; i++) {
    if(numbers[i]===0) return false
    m[c1][c2]=numbers[i]
    if(c2<3){
      c2++
    }
    else{
      c2=0
      c1++
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if(m[i][j]===m[i][j+1]) return false
      if(m[j][i]===m[j+1][i]) return false
    }
  }
  return true

}

export const moveUp = (stateValues,stateFunctions)=>{
  let aux = stateValues.sqnums
  let cont = 0
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if(aux[j*4+i]!==0){
        let k = j
        while(k>0 && aux[(k-1)*4+i]===0){
          k--
        }
        if(k!==j){
          aux[k*4+i]=aux[j*4+i]
          aux[j*4+i]=0
          cont++
        }
        if(k>0 && aux[(k-1)*4+i]===aux[k*4+i]){
          aux[(k-1)*4+i]*=2
          aux[k*4+i]=0
          cont++
          let aux2 = stateValues.score
          aux2+=aux[(k-1)*4+i]
          stateFunctions.StateScore(aux2)

        }
        
      }
    }
  }
  stateFunctions.StateNums([...aux])
  stateFunctions.StateReturnPrev(true)
  return cont !== 0 

}

export const moveDown = (stateValues,stateFunctions)=>{
  let aux = stateValues.sqnums
  let cont = 0
  for (let i = 0; i < 4; i++) {
    for (let j = 3; j >= 0; j--) {
      if(aux[j*4+i]!==0){
        let k = j
        while(k<3 && aux[(k+1)*4+i]===0){
          k++
        }
        if(k!==j){
          aux[k*4+i]=aux[j*4+i]
          aux[j*4+i]=0
          cont++
        }
        if(k<3 && aux[(k+1)*4+i]===aux[k*4+i]){
          aux[(k+1)*4+i]*=2
          aux[k*4+i]=0
          cont++
          let aux2 = stateValues.score
          aux2+=aux[(k+1)*4+i]
          stateFunctions.StateScore(aux2)
        }
      }
    }
  }

  stateFunctions.StateNums([...aux])
  stateFunctions.StateReturnPrev(true)
  return cont !== 0
}

export const moveLeft = (stateValues,stateFunctions)=>{
  let aux = stateValues.sqnums
  let cont = 0
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if(aux[i*4+j]!==0){
        let k = j
        while(k>0 && aux[i*4+k-1]===0){
          k--
        }
        if(k!==j){
          aux[i*4+k]=aux[i*4+j]
          aux[i*4+j]=0
          cont++
        }
        if(k>0 && aux[i*4+k-1]===aux[i*4+k]){
          aux[i*4+k-1]*=2
          aux[i*4+k]=0
          cont++
          let aux2 = stateValues.score
          aux2+=aux[i*4+k-1]
          stateFunctions.StateScore(aux2)
        }
      }
    }
  }

  stateFunctions.StateNums([...aux])
  stateFunctions.StateReturnPrev(true)
  return cont !== 0 
}

export const moveRight = (stateValues,stateFunctions)=>{
  let aux = stateValues.sqnums
  let cont = 0
  for (let i = 0; i < 4; i++) {
    for (let j = 3; j >= 0; j--) {
      if(aux[i*4+j]!==0){
        let k = j
        while(k<3 && aux[i*4+k+1]===0){
          k++
        }
        if(k!==j){
          aux[i*4+k]=aux[i*4+j]
          aux[i*4+j]=0
          cont++
        }
        if(k<3 && aux[i*4+k+1]===aux[i*4+k]){
          aux[i*4+k+1]*=2
          aux[i*4+k]=0
          cont++
          let aux2 = stateValues.score
          aux2+=aux[i*4+k+1]
          stateFunctions.StateScore(aux2)
        }
      }
    }
  }
  
  stateFunctions.StateNums([...aux])
  stateFunctions.StateReturnPrev(true)
  return cont !== 0 
}


  
export const clean = (stateValues,stateFunctions)=>{
  let aux = stateValues.sqnums
  aux.fill(0)
  
  const n = Math.floor(Math.random()*16)
  aux[n]=2
  stateFunctions.StateNums([...aux])
  stateFunctions.StateScore(0)
  stateFunctions.StateReturnPrev(false)
}
export const undo = (stateValues,stateFunctions)=>{
  stateFunctions.StateNums([...stateValues.prev])
  stateFunctions.StateScore(stateValues.prevScore)
  stateFunctions.StateReturnPrev(false)
}

