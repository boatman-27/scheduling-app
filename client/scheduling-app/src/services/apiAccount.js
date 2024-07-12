const BASE_URL = "http://localhost:3000/";
const BASE_URL2 = "https://scheduling-app-backend.vercel.app/account";

export async function login(loginData) {
  try {
    const res = await fetch(`${BASE_URL}account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signup(newAccount) {
  try {
    const res = await fetch(`${BASE_URL}account/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function checkStatus() {
  try {
    const res = await fetch(`${BASE_URL}auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.user) {
      return {
        loggedIn: true,
        user: data.user,
      };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function resetPassword(resetData) {
  try {
    const res = await fetch("http://localhost:3000/account/reset-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetData),
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Reset Password failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
