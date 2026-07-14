import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const OTPModal = ({ isOpen, onClose, email, onVerify }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp.trim()) {
            setError("OTP is required.");
            return;
        }

        if (otp.length !== 6) {
            setError("OTP must be 6 digits.");
            return;
        }

        try {
            setLoading(true);
            await onVerify(email, otp);
            setOtp("");
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
                    <h2>Verify OTP</h2>

                    <button className="closeBtn" onClick={onClose}><FaXmark /></button>
                </div>

                <p className="forgotInfo">
                    Enter the 6-digit verification code sent to your email.
                </p>

                {error && <div className="errorBanner">{error}</div>}

                <form onSubmit={handleSubmit}>

                    <div className="formGroup">
                        <label>OTP</label>

                        <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setError("");
                            }}
                            placeholder="123456"
                        />
                    </div>

                    <div className="modalFooter">
                        <button type="button" className="cancelBtn" onClick={onClose}> Cancel</button>
                        <button type="submit" className="submitBtn" disabled={loading}>
                            {loading? "Please Wait": "Verify OTP"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPModal;