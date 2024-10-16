
const info = [
    {
        h2:"Minesweeper Rules",
        p1:"You have to find clear the board except for the tiles with mines",
        p2:"Make right click to put a flag where you think it is a mine",
        p3:"Make left click to reveal the tile content"
    },
    {
        h2:"2048 Rules",
        p1:"You move the tiles with the arrow keys",
        p2:"When 2 tiles with the same number fuse, they create a new one with the number duplicated",
        p3:"You win when you get a 2048 tile, in case the board is full with no possible movements you lose"
    },
    {
        h2:"Tetris Rules",
        p1:"There are pieces falling at the top of the board, you have to place them strategically",
        p2:"You can move the falling pieces right, left and down, with the up key you rotate the piece 90 degrees",
        p3:"The game is endless, you lose if part of piece is out of the visible board"
    },
    {
        h2:"Snake's Rules",
        p1:"You are a snake that moves with the arrow keys, you have to eat the apples",
        p2:"When you eat a apple you grow in size, you cannot touch the borders or part of your body",
        p3:"The game is endless, so you have to make your best effort to eat apples"
    }
]

export default class Videos{
    static showTutorial = (file,index) =>{
        const aside = document.querySelector("aside")
        const video = document.querySelector("video")
        const videoDiv = document.querySelector("#videoDiv")
        video.src = file

        aside.style.zIndex = 100
        aside.style.opacity = 0.95
        aside.style.transition= ".2s opacity ease-in-out"

        videoDiv.style.opacity =1   
        videoDiv.style.zIndex = 1000
        videoDiv.style.transition= ".2s opacity ease-in-out"
        videoDiv.children[1].children[0].textContent = info[index].h2
        videoDiv.children[1].children[1].textContent = info[index].p1
        videoDiv.children[1].children[2].textContent = info[index].p2
        videoDiv.children[1].children[3].textContent = info[index].p3
    }
}