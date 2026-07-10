import { FaXmark,FaSpinner, FaBuilding, FaBriefcase, FaCalendar, FaDollarSign, FaLink, FaFileLines } from "react-icons/fa6";

function ViewJobModal({ isOpen, onClose, job }) {

  if (!isOpen || !job) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal viewModal" onClick={(e) => e.stopPropagation()}>

        <div className="modalHeader">
          <h2>Application Details</h2>

          <button className="closeBtn" onClick={onClose}>
            <FaXmark />
          </button>
        </div>

        <div className="detailsContainer">

          <div className="detailItem">
            <FaBuilding />
            <div>
              <label>Company</label>
              <p>{job.company}</p>
            </div>
          </div>

          <div className="detailItem">
            <FaBriefcase />
            <div>
              <label>Role</label>
              <p>{job.role}</p>
            </div>
          </div>

          <div className="detailItem">
            <FaSpinner />
            <div>
              <label>Status</label>
              <p>{job.status}</p>
            </div>
          </div>

          <div className="detailItem">
            <FaCalendar />
            <div>
              <label>Applied Date</label>
              <p>{job.appliedDate.slice(0,10) || "-"}</p>
            </div>
          </div>

          <div className="detailItem">
            <FaDollarSign />
            <div>
              <label>Salary</label>
              <p>{job.salary || "-"}</p>
            </div>
          </div>

          <div className="detailItem">
            <FaLink />
            <div>
              <label>Posting Link</label>
              {job.postingLink ? (
                <a href={job.postingLink} target="_blank" rel="noreferrer">Open Job Posting</a>
              ) : (
                <p>-</p>
              )}
            </div>
          </div>

          <div className="detailItem notes">
            <FaFileLines />
            <div>
              <label>Notes</label>
              <p>{job.notes || "No notes added."}</p>
            </div>
          </div>

        </div>

        <div className="modalFooter">
          <button
            className="cancelBtn"
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default ViewJobModal;