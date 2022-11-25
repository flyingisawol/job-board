import { Link } from "react-router-dom"
import LogoutButton from './LogoutButton'

const Header = ({ user, setUser }) => {

    return (
        <>
        <LogoutButton setUser={setUser} />
        </>
    )
}

export default Header