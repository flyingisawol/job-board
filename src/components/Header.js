import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"

const Header = ({ user, setUser }) => {
  return (
    <>
      <div className="header">
        <div className="heading">
          <h2>Job Finder</h2>
        </div>
        <div className="header-nav">
          <div className="header-home">
            <span class="material-symbols-outlined md-36">home</span>
            <label>Home</label>
          </div>
          <div className="header-profile">
            <span class="material-symbols-outlined md-36">account_circle</span>
            <label>Profile</label>
          </div>
          {user ? (
          <LogoutButton setUser={setUser} />
          ) : (
            <Link to="/login"></Link>
            )}
        <br />
        </div>
      </div>
    </>
  )
}

export default Header
