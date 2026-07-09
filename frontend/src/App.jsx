import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Board from "./components/Board";
import AddJobModal from "./components/AddJobModal";
import ViewJobModal from "./components/ViewJobModal";
import DeleteJobModal from "./components/DeleteJobModal";
import AuthModal from "./components/AuthModal";

import { getJobs,createJob,updateJob,deleteJob,} from "./services/jobService";
import { logout,getMe } from "./services/authService";

const App = () => {
  const [jobs, setJobs] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [error, setError] = useState("");

    // login/signup
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");

  //fetch all jobs
  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
      setError("");
    } 
    catch (error) {
      setError(error.message);
      setTimeout(() => { setError("");}, 3000);
    }
  };

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
      setError(""); 
    } 
    catch (error) {
      setError(error.message);
      setTimeout(() => {setError("");}, 3000);
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
      setError(""); 
    } 
    catch (error) {
      setError(error.message);
      setTimeout(() => { setError("");}, 3000);
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
      setError("");  
      setIsDeleteOpen(false);
      setSelectedJob(null);
    } 
    catch (error) {
      setError(error.message);
      setTimeout(() => {setError("");}, 3000);
    }
  };
  //setting the user state
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setIsAuthOpen(false);
  };

  const handleLogout = async () => {
    try{
      await logout();
      setUser(null);
      setJobs([]);
    }
     catch(error){
      setError(error.message);
      setTimeout(() => {setError("");}, 3000);
     }
  };

  return (
    <div className="app">
       {error && (
      <div className="errorBanner">
        {error}
      </div>
    )}
    
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
          />
    </div>

  );
};

export default App;