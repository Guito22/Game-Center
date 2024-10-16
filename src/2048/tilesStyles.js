const colors = ["#eee4da","#ede0c8","#f2b179","#f59563","#f67c5f","#f65e3b","#edcf72","#edcc61","#edc850","#edc53f","#edc22e","#3c3a32"]
export const setColor = (num)=>{
    let cont = -1
    while(num%2===0 && num!==0){
        cont++
        num/=2
    }
    if(cont===-1) return "thistle"
    return colors[cont]
}
export const setSize = (num)=>{
    const number = num.toString()
    if(number.length<=4){
        return "1.5rem"
    }
    else{
        return "1rem"
    }
}
export const setColorFont = (num)=>{
    if(num<=4) return "#232323"
    return "white"
}