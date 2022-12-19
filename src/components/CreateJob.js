import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"


const CreateJob = () => {
  const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const res = await fetch('/api/createJob/', {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()
        console.log(data)
        navigate(`/job/${data.id}`)
    }

    return (
        <>
        <div className="emp-dash">
            <div className="create-form">
            <h4>Post New Role</h4>
            <form onSubmit={onSubmit}>
            <Label className="create">Title</Label>
            <Input className="input" type="text" name="title" placeholder="Enter job title" required />
            <Label className="create">Description</Label>
            <Input type="text" name="description" placeholder="Enter job description" required />
            <button 
            type="submit" 
            value='submit'
            className="login-btn"
            >Submit
            </button>
            </form>
            </div>
        </div>
        </>
    )
}

export default CreateJob