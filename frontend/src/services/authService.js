const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (userData) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Signup failed");
  }
  return data;
};

export const login = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

export const logout = async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Logout failed");
  }
  return data;
};

export const getMe = async ()=>{
  const res = await fetch(`${API_URL}/auth/me`,{
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to refresh");
  }

  return data;
}

export const forgetPassword = async (email)=>{
  const res = await fetch(`${API_URL}/auth/forget-password`,{
    method:"POST",
    credentials: "include",
     headers: {
            "Content-Type": "application/json",
        },

    body: JSON.stringify({email})
})
  const data = await res.json();
  if (!res.ok){
    throw new Error(data.message || "Failed to Sent Email");
  }
  return data;
}

export const verifyOtp = async (email,otp)=>{
  const res = await fetch(`${API_URL}/auth/verify-otp`,{
    method: 'POST',
    credentials:"include",
    headers: {
            "Content-Type": "application/json",
        },

    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await res.json();
   if (!res.ok){
    throw new Error(data.message);
  }
  return data;
}

export const resetPassword = async (resetToken,password)=>{
  const res = await fetch(`${API_URL}/auth/reset-password`,{
    method: 'POST',
    credentials:"include",
    headers: {
            "Content-Type": "application/json",
        },

    body: JSON.stringify({
      resetToken,
      password
  })
});
  const data = await res.json();
   if (!res.ok){
    throw new Error(data.message);
  }
  return data;
}