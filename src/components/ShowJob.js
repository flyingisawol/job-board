import { Routes, Route, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Job = () => {
  const [job, setJob] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const showJob = async () => {
      const res = await fetch(`/api/job/${id}`)
      const data = await res.json()
      setJob(data)
    }
    showJob()
  }, [])

  const onClick = () => {
    const apply = async () => {
      const res = await fetch(`/api/jobApply/${id}`, {
        method: "POST",
      })
      return
    }
    apply()
    window.location.href='/applicant-dashboard/'
  }

  return (
    job && (
      <>
        <h2>{job.title}</h2>
        <button onClick={onClick}>apply</button>
      </>
    )
  )
}

export default Job
