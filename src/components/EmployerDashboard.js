import { useNavigate, Link } from "react-router-dom"
import CreateJob from "./CreateJob"
import EmpAllJobs from "./EmpAllJobs"

const EmployerDashboard = ({ user }) => {
  return (
    <>
    <div className="dashboard-container">
      <CreateJob />
      <EmpAllJobs />
    </div>
    </>
  )
}

export default EmployerDashboard
