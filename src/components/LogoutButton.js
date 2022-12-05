import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const LogoutButton = ({ setUser }) => {

    const navigate = useNavigate()
    const handleClick = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST'
        })
        const data = await res.json()
        setUser(null)
        navigate('/login/')
    }
    
    return (
        <div className="logoutButton">
            <button onClick={handleClick}><img src="./public/logout.png" alt=""></img></button>
        </div>
    )
}

export default LogoutButton