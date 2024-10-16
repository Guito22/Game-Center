import { Link } from "react-router-dom"

export default function GameButton({name,logo,route}){
    return(
        <Link to={route} className="gameBtn">
            <img src={logo} alt={name} />
            {name}
        </Link>
    )
}