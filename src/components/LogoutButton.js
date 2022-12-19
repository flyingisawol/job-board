import { useNavigate } from "react-router-dom"

const LogoutButton = ({ setUser }) => {
    const navigate = useNavigate()
    
    const handleClick = async () => {
        const res = await fetch('/api/logout/', {
            method: 'POST'
        })
        const data = await res.json()
        setUser(null)
        navigate('/login/')
    }
    
    return (
        <div className="header-logout">
            <span class="material-symbols-outlined md-36" onClick={handleClick}>logout</span>
            <label>Logout</label>
        </div>
    )
}

export default LogoutButton