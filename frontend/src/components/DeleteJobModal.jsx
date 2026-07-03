import { FaXmark } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";

function DeleteJobModal({isOpen,onClose,job,onDelete,}) {
  if (!isOpen || !job) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>

      <div
        className="deleteModal"
        onClick={(e) => e.stopPropagation()}>

        <div className="modalHeader">
          <h2>Delete Application</h2>

          <button
            className="closeBtn"
            onClick={onClose}
          >
            <FaXmark />
          </button>
        </div>

        <div className="deleteBody">

          <div className="deleteIcon">
            <FiTrash2 />
          </div>

          <h3>Are you sure?</h3>

          <p>
            This will permanently delete
            <strong> {job.company}</strong>'s application
            for the position of
            <strong> {job.role}</strong>.
          </p>

        </div>

        <div className="modalFooter">

          <button
            className="cancelBtn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="deleteBtn"
            onClick={() => onDelete(job._id)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteJobModal;