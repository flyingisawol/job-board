import { useNavigate } from "react-router-dom"

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
            <p>Post a new job:</p>
            <form onSubmit={onSubmit}>
            <input type="text" name="title" placeholder="emter job title" required />
            <textarea type="text" name="description" placeholder="emter job description" required />
            <input type="submit" value='submit' />
            </form>
        </>
    )
}

export default CreateJob