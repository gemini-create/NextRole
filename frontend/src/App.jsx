

import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Board from "./components/Board";
import AddJobModal from "./components/AddJobModal";
import ViewJobModal from "./components/ViewJobModal";
import DeleteJobModal from "./components/DeleteJobModal";

import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "./services/jobService";

const App = () => {
  const [jobs, setJobs] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [error, setError] = useState("");

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
      setError("");   // Clear old errors
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
    setError("");
  }, 3000);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // CREATE
  const handleAddJob = async (newJob) => {
    try {
      await createJob(newJob);
      fetchJobs();
      setIsModalOpen(false);
      setError("");   // Clear old errors
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
    setError("");
  }, 3000);
    }
  };

  // READ
  const handleView = (job) => {
    setSelectedJob(job);
    setIsViewOpen(true);
  };

  // OPEN EDIT MODAL
  const handleEdit = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  // UPDATE
  const handleUpdateJob = async (updatedJob) => {
    try {
      await updateJob(updatedJob);

      fetchJobs();

      setEditingJob(null);
      setIsModalOpen(false);
      setError("");   // Clear old errors
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
    setError("");
  }, 3000);
    }
  };

  // OPEN DELETE MODAL
  const handleDelete = (job) => {
    setSelectedJob(job);
    setIsDeleteOpen(true);
  };

  // DELETE
  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);

      fetchJobs();
      setError("");   // Clear old errors
      setIsDeleteOpen(false);
      setSelectedJob(null);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
    setError("");
  }, 3000);
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
        onAddClick={() => {
          setEditingJob(null);
          setIsModalOpen(true);
        }}
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
    </div>
  );
};

export default App;