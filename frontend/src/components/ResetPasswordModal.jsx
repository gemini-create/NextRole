import { useState } from "react";
import { FaEye, FaEyeSlash, FaXmark } from "react-icons/fa6";

const ResetPasswordModal = ({ isOpen, onClose, onReset }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await onReset(password);
        }
        catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modal authModal" onClick={(e) => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2>Reset Password</h2>
                    <button className="closeBtn" onClick={onClose}><FaXmark /></button>
                </div>

                {error && <div className="errorBanner">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label>New Password</label>
                        <div className="passwordInput">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                            />
                            <button type="button"  className="eyeBtn"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label>Confirm Password</label>
                        <div className="passwordInput">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError("");
                                }}
                            />

                            <button
                                type="button"
                                className="eyeBtn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}> 
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                     <div className="modalFooter">
                        <button type="button" className="cancelBtn" onClick={onClose}> Cancel</button>
                        <button type="submit" className="submitBtn" disabled={loading}>{
                        loading? "Please Wait" :"Reset Password"} </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ResetPasswordModal;