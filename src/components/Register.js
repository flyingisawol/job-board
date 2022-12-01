import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { Form, FormGroup, Label, Input } from "reactstrap"
import "../App.css"

const Register = ({ setUser }) => {
  const [fields, setFields] = useState("")
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
    const res = await fetch("/api/register/", {
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
      setUser(data)
      navigate("/")
    }
    setFields()
  }

  return (
    <>
      <div className="content-container">
        <div className="login-form">
          <Form>
            <h2 className="text-center heading">Register</h2>
            <FormGroup onSubmit={handleSubmit}>
              <Label>Username</Label>
              <Input
                name="username"
                placeholder="username"
                type="text"
                value={fields.username}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                name="password"
                placeholder="password"
                type="Password"
                onChange={handleChange}
                value={fields.password}
              />
            </FormGroup>
            <input
            name="image_url"
            type="file"
            onChange={handleChange}
            value={fields.image_url}
            />
            <div className="login-selection">
              <label className="selection" htmlFor="applicant">
                I'm an Applicant
              </label>
              <input
                type="radio"
                name="account_type"
                value="applicant"
                id="applicant"
                onChange={handleChange}
              />
              <label className="selection" htmlFor="employer">
                I'm an Employer
              </label>
              <input
                type="radio"
                name="account_type"
                value="employer"
                id="employer"
                onChange={handleChange}
              />
            </div>

            <button
              className="login-btn"
              type="submit"
              value="register"
              onClick={handleSubmit}
            >
              Register
            </button>
            <div className="register-button">
              <Link to="/login" style={{ textDecoration: "none" }}>
                Already Registered? Sign in
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Register
