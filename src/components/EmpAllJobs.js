import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const EmpAllJobs = () => {
  const [allJobs, setAllJobs] = useState([])

  useEffect(() => {
    const jobList = async () => {
      const res = await fetch("/api/employer-jobs/")
      const data = await res.json()
      setAllJobs(data)
    }
    jobList()
  }, [])

  const renderedJobs = allJobs.map((jobs) => {
    return (
      <>
        <div className="roles">
          <div className="job-title">
            <p><Link to={`/job/${jobs.id}`}>{jobs.title}</Link></p>
          </div>
          <div className="current-applications">
            (Current applications: {jobs.application_count})
          </div>
        </div>
      </>
    )
  })

  return (
    <div className="open-roles">
      <h4>Advertised Positions</h4>
      {renderedJobs}
    </div>
  )
}

export default EmpAllJobs
