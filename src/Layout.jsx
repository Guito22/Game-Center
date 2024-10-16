import { useEffect } from "react"
import { Outlet,Link } from "react-router-dom"
export default function Layout(){

    const aside = document.querySelector("aside")
    const removetuto = ()=>{
        const video = document.querySelector("video")
        const videoDiv = document.querySelector("#videoDiv")
        video.src = ""
        videoDiv.style.zIndex = -100
        videoDiv.style.opacity = 0
        aside.style.zIndex =-100
        aside.style.opacity =0
    }

    useEffect(()=>{
        
        aside.addEventListener("click",removetuto)
        return(()=>{
            aside.removeEventListener("click",removetuto)
        })
    })

    return(
        <>
            <h1><Link to={"/"} id="homeButton">GAME CENTER</Link></h1>
            <Outlet/>
        
        </>
    )
}