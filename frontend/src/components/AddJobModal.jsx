import { useState, useEffect  } from 'react';
import { STATUSES } from '../data/status';
import { FaXmark } from "react-icons/fa6";
import DropDown from "./DropDown";

const AddJobModal = ({ isOpen, onClose,onAddJob,editingJob,onUpdateJob }) => {
    const isEditing = Boolean(editingJob);

    const initialForm = {
    company: "",
    role: "",
    status: "Applied",
    appliedDate: new Date().toISOString().slice(0,10),
    postingLink: "",
    salary: "",
    notes: ""
   };

   useEffect(() => {

  if (!isOpen) return;

  if (editingJob) {
    setInputs({
      company: editingJob.company || "",
      role: editingJob.role || "",
      status: editingJob.status || "Applied",
      appliedDate: editingJob.appliedDate || new Date().toISOString().slice(0,10),
      postingLink: editingJob.postingLink || "",
      salary: editingJob.salary || "",
      notes: editingJob.notes || "",
    });
  } else {
    setInputs(initialForm);
  }
  setErrors({});
}, [editingJob, isOpen]);


    const [inputs, setInputs] = useState(initialForm);
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({...prev,[name]: value,}));
        setErrors((prev) => ({ ...prev, [name]: "",})); // clear errors while typing
        }
    
    const validate = () => {
        const newErrors = {};
         
        if (!inputs.company.trim()) {
            newErrors.company = "Company is required.";
        }
         if (!inputs.role.trim()) {
            newErrors.role = "Role is required.";
        }
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validate()) return;

        if (isEditing) {
            onUpdateJob({...editingJob,...inputs});
        } 
        else {
            onAddJob({
                ...inputs
            });
        }
        onClose();
    };
    
    if (!isOpen) return null;
    
    return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modalHeader">
          <h2>{isEditing ? "Edit Application" : "Add Application"}</h2>
          <button className="closeBtn"  onClick={onClose}><FaXmark/></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="formRow">

            <div className="formGroup">
              <label>Company</label>
              <input
                type="text"
                name="company"
                placeholder="Google"
                value={inputs.company}
                onChange={handleChange}
                className={errors.company ? "inputError" : ""}
              />
              {errors.company && (<span className="errorText"> {errors.company}</span>)}
            </div>

            <div className="formGroup">
              <label>Role</label>
              <input
                type="text"
                name="role"
                placeholder="Frontend Developer"
                value={inputs.role}
                onChange={handleChange}
                className={errors.role ? "inputError" : ""}
              />
                {errors.role && (<span className="errorText"> {errors.role}</span>)}
            </div>
          </div>

          <div className="formRow">

            <div className="formGroup">
              <label>Status</label>
              <DropDown options={STATUSES.map(status=>status.key)} selected={inputs.status}
                onSelect={(value) => setInputs(prev => ({...prev,status: value}))}/>
            </div>

            <div className="formGroup">
              <label>Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                value={inputs.appliedDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formGroup">
            <label>Posting Link (optional)</label>
            <input
              type="url"
              name="postingLink"
              placeholder="https://google.com."
              value={inputs.postingLink}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>Salary (optional)</label>
            <input
              type="text"
              name="salary"
              placeholder="Rs 80k - Rs 100k"
              value={inputs.salary}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>Notes (optional)</label>
            <textarea
              rows="4"
              name="notes"
              placeholder="Referral, recruiter details, interview notes..."
              value={inputs.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="modalFooter">
            <button
              type="button"
              className="cancelBtn"
              onClick={onClose} >Cancel</button>

            <button type="submit" className="submitBtn">{isEditing ? "Save Changes" : "Add Application"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJobModal;
