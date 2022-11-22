import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Register = ({ setUser }) => {
  const [fields, setFields] = useState('')
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
      console.log(data)
      navigate("/")
    }
    setFields()
  }

  return (
    <>
      <div className="content-body">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="username"
            type="text"
            value={fields.username}
            onChange={handleChange}
          />

          <input
            name="password"
            placeholder="password"
            type="Password"
            onChange={handleChange}
            value={fields.password}
          />

          <label htmlFor="employer">Register as employer</label>
          <input
            type="radio"
            name="account_type"
            value="employer"
            id="employer"
            onChange={handleChange}
          />
          <label htmlFor="applicant">Register as applicant</label>
          <input
            type="radio"
            name="account_type"
            value="applicant"
            id="applicant"
            onChange={handleChange}
          />

          <input type="submit" value="Register" />
        </form>
      </div>
    </>
  )
}

export default Register
