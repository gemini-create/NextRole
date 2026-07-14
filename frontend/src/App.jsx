import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Board from "./components/Board";
import AddJobModal from "./components/AddJobModal";
import ViewJobModal from "./components/ViewJobModal";
import DeleteJobModal from "./components/DeleteJobModal";
import AuthModal from "./components/AuthModal";
import ForgetPasswordModal from "./components/ForgetPasswordModal";
import OTPModal from "./components/OTPModal";
import ResetPasswordModal from "./components/ResetPasswordModal";
import Toast from "./components/Toast";

import { getJobs,createJob,updateJob,deleteJob,} from "./services/jobService";
import { logout,getMe,forgetPassword,verifyOtp,resetPassword } from "./services/authService";

const App = () => {
  const [jobs, setJobs] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [toast,setToast] = useState(null);

    // login/signup
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  //forget password
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
   //verify-otp
  const [otpModal, setOtpModal] = useState(false);
  const [resetToken, setResetToken] = useState("");
   //reset password
  const [resetPasswordModal, setResetPasswordModal] = useState(false);

  const showToast = (message,type="success") => {
    setToast({message,type});
    setTimeout(() => { 
      setToast(null); 
    }, 3000);
};

  //fetch all jobs
  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } 
    catch (error) {
      showToast(error.message, "error");
    }
  };
// refresh effect
  useEffect(() => {
    const restoreUser  = async ()=>{
      try{
        const data = await getMe();
        setUser(data.user);
      }catch{
        setUser(null);
      }
    };
    restoreUser();
  },[]);
 
  //if logged in then show jobs
  useEffect(() => {
    if(user){
        fetchJobs();
    }
  }, [user]);

  //create job
  const handleAddJob = async (newJob) => {
    try {
      const data= await createJob(newJob);
      fetchJobs();
      setIsModalOpen(false);
      showToast(data.message);
    } 
    catch (error) {
      showToast(error.message, "error");
    }
  };

  //open view modal
  const handleView = (job) => {
    setSelectedJob(job);
    setIsViewOpen(true);
  };

  //open edit modal
  const handleEdit = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  //update
  const handleUpdateJob = async (updatedJob) => {
    try {
      const data = await updateJob(updatedJob);
      fetchJobs();
      setEditingJob(null);
      setIsModalOpen(false);
      showToast(data.message);
    } 
    catch (error) {
      showToast(error.message, "error");
    }
  };

  //open delete modal
  const handleDelete = (job) => {
    setSelectedJob(job);
    setIsDeleteOpen(true);
  };

  //delete
  const handleDeleteJob = async (id) => {
    try {
      const data=await deleteJob(id);
      fetchJobs();
      setIsDeleteOpen(false);
      setSelectedJob(null);
      showToast(data.message);
    } 
    catch (error) {
      showToast(error.message, "error");
    }
  };
  //setting the user state
  const handleLogin = (loggedInUser, message="Login Successful!") => {
    setUser(loggedInUser);
    setIsAuthOpen(false);
    showToast(message);
  };

  const handleForgetPassword = async (email)=>{
    try{
      const data = await forgetPassword(email);
      setResetEmail(email);
      setForgetPasswordModal(false);
      setOtpModal(true);
      showToast(data.message);
    }catch(error){
      showToast(error.message, "error");
    }
  }

   const handleVerifyOtp = async (email,otp)=>{
    try{
      const data = await verifyOtp(email,otp);
      setResetToken(data.resetToken);
      setOtpModal(false);
      showToast(data.message);
      setResetPasswordModal(true);
    }catch(error){
      showToast(error.message, "error");
    }
  }

  const handleResetPassword = async (password)=>{
    try{
      const data =await resetPassword(resetToken,password);
      setResetPasswordModal(false);
      showToast(data.message);
      setIsAuthOpen(true);
    }
    catch(error){
      showToast(error.message, "error");
    }
  }

  const handleLogout = async () => {
    try{
      const data= await logout();
      setUser(null);
      setJobs([]);
      showToast(data.message);
    }
     catch(error){
      showToast(error.message, "error");
     }
  };

  return (
    <div className="app">
      <Navbar
      user={user}
      onAddClick={() => {
        if(!user){
          setAuthMode("login");
          setIsAuthOpen(true);
          return;
        }
          setEditingJob(null);
          setIsModalOpen(true);
        }}

        onUserClick={()=>{
          setAuthMode("login");
          setIsAuthOpen(true);
        }}
        onLogout={handleLogout}
      />

      <Stats jobs={jobs} />

      <Board
        jobs={jobs}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        onAddJob={handleAddJob}
        onUpdateJob={handleUpdateJob}
        editingJob={editingJob}
      />

      <ViewJobModal
        isOpen={isViewOpen}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />

      <DeleteJobModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
        onDelete={handleDeleteJob}
      />

      <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          mode={authMode}
          setMode={setAuthMode}
          onLogin={handleLogin}
          onForgetPassword={()=>{
            setForgetPasswordModal(true)
            setIsAuthOpen(false)}}
       />

       <ForgetPasswordModal
          isOpen={forgetPasswordModal}
          onClose={()=> setForgetPasswordModal(false)}
          onForget={handleForgetPassword}
        />

        <OTPModal
          isOpen={otpModal}
          onClose={()=> setOtpModal(false)}
          email = {resetEmail}
          onVerify={handleVerifyOtp}
        />

        <ResetPasswordModal
          isOpen={resetPasswordModal}
          onClose={()=> setResetPasswordModal(false)}
          onReset={handleResetPassword}
        />

        {toast && <Toast message={toast.message} type={toast.type}/>}
    </div>

  );
};

export default App;