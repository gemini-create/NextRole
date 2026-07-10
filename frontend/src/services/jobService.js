const API_URL = import.meta.env.VITE_API_URL;

// GET ALL JOBS
export const getJobs = async () => {
  const res = await fetch(`${API_URL}/jobs`,{
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("500: Server Error");
  }
  return await res.json();
};

// CREATE JOB
export const createJob = async (newJob) => {
  const res = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });

  if (!res.ok) {
    throw new Error("500: Server Error");
  }

  return await res.json();
};

// UPDATE JOB
export const updateJob = async (updatedJob) => {
  const res = await fetch(`${API_URL}/jobs/${updatedJob._id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedJob),
  });

  if (!res.ok) {
    throw new Error("500: Server Error");
  }
  return await res.json();
};

// DELETE JOB
export const deleteJob = async (id) => {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("500: Server Error");
  }
  return await res.json();
};