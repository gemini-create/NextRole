import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const ForgotPasswordModal = ({ isOpen, onClose,onForget }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [serverError,setServerError] =useState("");
  const [loading,setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    
    try{
       setLoading(true);
       await onForget(email)
    }catch(error){
        setServerError(error.message)
    }finally{
       setLoading(false);
    }
    setEmail("");
    setError("");
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div  className="modal authModal" onClick={(e) => e.stopPropagation()}>
        
        <div className="modalHeader">
          <h2>Forgot Password</h2>
          <button className="closeBtn" onClick={onClose}><FaXmark /></button>
        </div>
        {serverError && ( 
            <div className="errorBanner"> {serverError} </div>)}

        <p className="forgotInfo">
          Enter your registered email address. We'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Email</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            {error && <span className="errorText">{error}</span>}
          </div>

          <div className="modalFooter">
            <button type="button" className="cancelBtn" onClick={onClose}> Cancel</button>
            <button type="submit" className="submitBtn" disabled={loading}>
              {loading? "Please Wait" :"Send Reset Link"} </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;