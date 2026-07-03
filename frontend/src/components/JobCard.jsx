import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

function JobCard({ job, onView,onEdit,onDelete}) {
  return (
    <div className="jobCard">

        <div className="jobCardHeader">
            <div>
                <h4>{job.company}</h4>
                <p>{job.role}</p>
            </div>

            <div className="jobActions">
                <button className="iconBtn" onClick={() => onView(job)} title="View" >
                    <FiEye />
                </button>

                <button className="iconBtn" onClick={() => onEdit(job)} title="Edit">
                    <FiEdit2 />
                </button>

                <button className="iconBtn delete" onClick={() => onDelete(job)} title="Delete">
                    <FiTrash2/>
                </button>
            </div>
        </div>

    </div>
  );
}

export default JobCard;