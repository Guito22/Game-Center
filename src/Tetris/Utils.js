class Utils{
     figures =[
        {
            "nums":[[0,1,2,-1],[0,-10,10,20],[0,1,-1,-2],[0,10,-10,-20]],
            "color" : "cyan",
            "border": "darkcyan"

        },
        {
            "nums":[[0,1,-1,-11],[0,10,-9,-10],[0,1,11,-1],[0,9,10,-10]],
            "color" : "blue",
            "border": "darkblue"

        },
        {
            "nums":[[0,1,-1,-9],[0,10,11,-10],[0,1,9,-1],[0,10,-10,-11]],
            "color" : "orange",
            "border": "darkorange"

        },
        {
            "nums":[[0,1,10,11],[0,1,10,11],[0,1,10,11],[0,1,10,11]],
            "color" : "yellow",
            "border": "gold"

        },
        {
            "nums":[[0,1,9,10],[0,10,-1,-11],[0,-1,-9,-10],[0,1,11,-10]],
            "color" : "green",
            "border": "darkgreen"

        },
        {
            "nums":[[0,1,-10,-11],[0,1,10,-9],[0,10,11,-1],[0,-1,9,-10]],
            "color" : "red",
            "border": "darkred"

        },
        {
            "nums":[[0,1,-1,-10],[0,1,-10,10],[0,1,10,-1],[0,10,-1,-10]],
            "color" : "magenta",
            "border": "darkmagenta"

        },

        
    ] 

    static genBag = ()=>{
        let pieces = []
        let num
        while(pieces.length<7){
            do{
                num = Math.floor(Math.random()*7)
            } while(pieces.includes(num))
            pieces.push(num)

        }
        return pieces
    }
    static getChildren = ()=>{
        const children = document.querySelector("#tetrisBoard").children
        return children
    }

}

export default Utils