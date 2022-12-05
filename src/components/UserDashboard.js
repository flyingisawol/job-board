import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

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

    const renderedApplications = applications.map((application) => {
        return (
        <p>{application.status}</p>
        )
    })
    
    return (
        <>
        <div className="index">
            <h1>Welcome back</h1>
            <h2>Current Applications</h2>
            {renderedApplications}
            <h2>Employers currently hiring</h2>
            {renderedEmployers}

            <button onClick={() => setVisible(!visible)}>{visible ? 'Availble jobs below' : 'Show all available jobs'}</button>
            {visible && <div>{renderedJobs}</div>}
            
        </div>
        </>
    )
}

export default Index