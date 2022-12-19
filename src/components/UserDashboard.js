import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Index = () => {
    const [jobs, setJobs] = useState([])
    const [employers, setEmployers] = useState([])
    const [visible, setVisible] = useState(false)
    const [applications, setApplications] = useState([])


    useEffect(() => {
        const jobList = async () => {
            const res = await fetch("/api/user-dashboard/")
            const data = await res.json()
            setJobs(data.jobs)
            setEmployers(data.employers)
            setApplications(data.job_applications)
        }
        jobList()
      }, [])
    
    const renderedJobs = jobs.map((job) => {
        return (
            <p><Link to={`/job/${job.id}`}>{job.title}</Link></p>
        )
    })

    const renderedEmployers = employers.map((employer) => {
        return (
            <p><Link to={employer.username}>{employer.username}</Link></p>
            
        )
    })
    
    const employerImages = employers.map((employer) => {
        return (
            <img src={employer.image_url} alt={employer.image_url}/>
            )
        })

    const renderedApplications = applications.map((application) => {
        return (
        <p>{application.status}</p>
        )
    })
    
    return (
        <>
        <div className="index">
            <h3>Welcome back</h3> 
            <h4>Current Applications</h4>
            {renderedApplications}
            <h4>Employers currently hiring</h4>
            {renderedEmployers}
            {employerImages}

            <button onClick={() => setVisible(!visible)}>{visible ? 'Availble jobs below' : 'Show all available jobs'}</button>
            {visible && <div>{renderedJobs}</div>}
            
        </div>
        </>
    )
}

export default Index