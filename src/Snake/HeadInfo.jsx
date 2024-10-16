import { useState } from "react"

export default function HeadInfo({time,score}){

    return(
        <nav>
            <div>
                <h2>🍎 : {score}</h2>
            </div>

        </nav>
    )

}