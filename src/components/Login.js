import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'

const initialState = { username: "", password: "" }

const Login = ({ setUser }) => {
  const [fields, setFields] = useState(initialState)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFields({
      ...fields,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    })
    const data = await res.json()
    if (res.status === 401) {
      setError(data)
    } else if (res.status === 200) {
      setError(null)
      // setUser(data) // data.user (once a setUser exists)
      console.log(data)
      navigate("/")
    }
    setFields(initialState)
  }

    return (
        <>
        <div className="login">
            <form onSubmit={handleSubmit}>
            <input
                onChange={handleChange}
                value={fields.username}
                name="username"
                id="login-username"
                type="text"
                placeholder="username"
                />
                <input
                onChange={handleChange}
                value={fields.password}
                name="password"
                id="login-password"
                type="Password"
                placeholder="password"
                 />
                <label htmlFor="employer" >Login as employer</label>
                <input type="radio" name="account_type" value="employer" id="employer" onChange={handleChange}/>
                <label htmlFor="applicant">Login as applicant</label>
                <input type="radio" name="account_type" value="applicant" id="applicant" onChange={handleChange}/>

                <div className="login">
                <input type="submit" value="Login" />
                </div>
                <Link to="/register">Register</Link>
            </form>
        </div>
        </>
    )
}

export default Login