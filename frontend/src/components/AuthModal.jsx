import { FaXmark,FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState,useEffect } from "react";
import { signup, login,logout } from "../services/authService";

const AuthModal = ({isOpen,onClose,mode,setMode,onLogin}) => {
    const isSignUp = mode ==="signup";
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialForm = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [inputs, setInputs] = useState(initialForm);
    const [errors, setErrors] = useState({})
    //reset form when model opens
    useEffect(() => {
        if (!isOpen) return;
        setInputs(initialForm);
        setErrors({});
    }, [isOpen, mode]);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({...prev,[name]: value,}));
        setErrors({});
        setServerError("");
    }

    const validate = () => {
        const newErrors = {};
        const hasUppercase =/[A-Z]/;
        const hasLowercase =/[a-z]/;
        const hasNumber =/[0-9]/;
        const hasSpecialChar =/[^A-Za-z0-9]/;

        if (isSignUp && !inputs.username.trim()) 
            newErrors.username = "Username is required.";

        if (!inputs.email.trim()) 
            newErrors.email = "Email is required.";

        else if (!/\S+@\S+\.\S+/.test(inputs.email)) 
            newErrors.email = "Enter a valid email.";

        if (!inputs.password.trim()) 
            newErrors.password = "Password is required.";

        else if (inputs.password.length < 8) 
            newErrors.password = "Password must be at least 8 characters.";

        else if (!hasUppercase.test(inputs.password)) 
            newErrors.password = "Password must contain one capital alphabet.";

        else if (!hasLowercase.test(inputs.password)) 
            newErrors.password = "Password must contain lowercase alphabets.";

        else if (!hasNumber.test(inputs.password)) 
            newErrors.password = "Password must contains numbers (0-9).";

        else if (!hasSpecialChar.test(inputs.password)) 
            newErrors.password = "Password must contain atleast one special character.";

        if (isSignUp && inputs.password !== inputs.confirmPassword) 
            newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try{
            setLoading(true);
            setServerError("");

            if (isSignUp){
                const data = await signup({
                    username: inputs.username,
                    email: inputs.email,
                    password: inputs.password,
                });
                onLogin(data.user,"Account Created Successfully!")
                console.log(data);
            }
            else {
                const data = await login({
                    email: inputs.email,
                    password: inputs.password,
                });
                onLogin(data.user,"Login Successfully!");
            }
        }catch(error){
            setServerError(error.message);

        }finally {
        setLoading(false);
        }
    }
    if (!isOpen) return null;
  return (
    <div className="modalOverlay" onClick={onClose}>
        <div className="modal authModal" onClick={(e)=>e.stopPropagation()}>
            <div className="modalHeader">
                <h2>{isSignUp? "Create Account" :"Welcome Back"}</h2>
                <button className="closeBtn"  onClick={onClose}><FaXmark/></button>
            </div>
            {serverError && ( <div className="errorBanner">{serverError}</div>)}
            <form onSubmit={handleSubmit}>
                {isSignUp &&
                <div className="formGroup">
                    <label>Userame</label>
                    <input
                    type="text"
                    name="username"
                    placeholder="userame"
                    value={inputs.username}
                    onChange={handleChange}
                    />
                    {errors.username && (<span className="errorText"> {errors.username}</span>)}

                </div>
                }
                <div className="formGroup">
                    <label>Email</label>
                    <input
                    type="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    value={inputs.email}
                    onChange={handleChange}
                    />
                {errors.email && (<span className="errorText"> {errors.email}</span>)}
                </div>

                <div className="formGroup">
                    <label>Password</label>
                    <div className="passwordInput">
                        <input
                            type={showPassword? "text" :"password"}
                            name="password"
                            placeholder="Minimum 8 characters"
                            value={inputs.password}
                            onChange={handleChange}
                            />
                        <button type="button" className="eyeBtn" onClick={()=>setShowPassword(!showPassword)}>
                            {showPassword? <FaEyeSlash/>: <FaEye/>}
                        </button>
                    </div>
                {errors.password && (<span className="errorText"> {errors.password}</span>)}
                </div>

                {isSignUp &&
                <div className="formGroup">
                    <label>Confirm Password</label>
                    <div className="passwordInput">
                        <input
                            type= {showConfirmPassword? "text": "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={inputs.confirmPassword}
                            onChange={handleChange}
                        />
                        <button type="button" className="eyeBtn" onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword? <FaEyeSlash/>: <FaEye/>}
                        </button>
                     </div>
                {errors.confirmPassword && (<span className="errorText"> {errors.confirmPassword}</span>)}
                </div>
                }

                <div className="modalFooter">
                    <button type="button"className="cancelBtn" onClick={onClose}>Cancel</button>
                    <button type="submit" className="submitBtn" disabled={loading}>
                        {loading? "Please Wait":
                         isSignUp? "Create Account" : "Login"}
                        </button>
                </div>
            </form>
            {isSignUp ? (
            <p className="authSwitch">Already have an account?
                <span onClick={() => {setMode("login"); setServerError("")}}> Login</span>
            </p>
            ):(
            <p className="authSwitch">Don't have an account?
                <span onClick={() => {setMode("signup"); setServerError("");}}> SignUp</span>
            </p>
            )}
        </div>
    </div>
  )
}
export default AuthModal
