import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import "../App.css"

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
      setUser(data.user)
      if (data.user.account_type === "applicant") {
        navigate("/dashboard")
      } else if (data.user.account_type === "employer") {
        navigate("/employer-dashboard")
      }
    }
    setFields(initialState)
  }

  return (
    <>
    <div className="content-container">
      <div className="login-form">
        <form>
          <h2 className="text-center heading">Find Your Dream Job</h2>
          <FormGroup onSubmit={handleSubmit}>
            <Label>Username</Label>
            <Input
              onChange={handleChange}
              value={fields.username}
              name="username"
              id="login-username"
              type="text"
              placeholder="username"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              onChange={handleChange}
              value={fields.password}
              name="password"
              id="login-password"
              type="Password"
              placeholder="password"
            />
          </FormGroup>
          <div className="login-selection">
            <label className="selection" htmlFor="applicant">Applicant</label>
            <input
              type="radio"
              name="account_type"
              value="applicant"
              id="applicant"
              onChange={handleChange}
            />
            <label className="selection" htmlFor="employer">Employer</label>
            <input
              type="radio"
              name="account_type"
              value="employer"
              id="employer"
              onChange={handleChange}
            />
          </div>
          <div className="full-width">
            <button 
              className="login-btn"
              type="submit"
              value="login"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <div className="register-button">
            <Link to="/register" style={{ textDecoration: 'none'}}>Not Registered?</Link>
            </div>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default Login
