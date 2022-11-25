import { useState, useEffect } from "react"

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
        <p>
          <h3>{jobs.title}:</h3> (Current applications: {jobs.application_count})
        </p>
        <p>{jobs.description}</p>
      </>
    )
  })

  return (
    <div>
      <h3>Advertised Positions</h3>
      {renderedJobs}
    </div>
  )
}

export default EmpAllJobs
