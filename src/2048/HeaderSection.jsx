export default function HeaderSection({score}){
    return(
        <header id="HeaderSection">
            <h1>2048</h1>

            <div id="scoreSection">
                <h3>SCORE</h3>
                <h3>{score}</h3>
            </div>

        </header>

    )
}

