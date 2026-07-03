const API_URL = "http://localhost:5000/api/jobs";

// GET ALL JOBS
export const getJobs = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return await res.json();
};

// CREATE JOB
export const createJob = async (newJob) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });

  if (!res.ok) {
    throw new Error("Failed to add job");
  }

  return await res.json();
};

// UPDATE JOB
export const updateJob = async (updatedJob) => {
  const res = await fetch(`${API_URL}/${updatedJob._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedJob),
  });

  if (!res.ok) {
    throw new Error("Failed to update job");
  }

  return await res.json();
};

// DELETE JOB
export const deleteJob = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete job");
  }

  return await res.json();
};