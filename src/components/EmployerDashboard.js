import { useNavigate } from "react-router-dom"
import CreateJob from "./CreateJob"
import EmpAllJobs from "./EmpAllJobs"

const EmployerDashboard = () => {
  return (
    <>
      <h2>Employer Dashboard</h2>

      <CreateJob />
      <EmpAllJobs />
    </>
  )
}

export default EmployerDashboard
