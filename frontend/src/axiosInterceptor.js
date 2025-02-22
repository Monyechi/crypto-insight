// src/axiosInterceptor.js

import axios from "axios";

/**
 * Sets up a global Axios interceptor that listens for 401 Unauthorized responses.
 * If a 401 is encountered, it removes the access token and redirects to /login.
 */
export function setupAxiosInterceptors() {
  axios.interceptors.response.use(
    // Success handler: just return the response
    (response) => response,

    // Error handler
    (error) => {
      // Check if it's a 401 from the server
      if (error.response && error.response.status === 401) {
        // 1) Remove the token from localStorage
        localStorage.removeItem("accessToken");

        // 2) (Optional) Show a toast/message:
        alert("Session expired. Please log in again.");

        // 3) Redirect to login page (or wherever your login route is)
        window.location.href = "/"; 
        // If your login page is at "/login", do: window.location.href = "/login";
      }

      // Always reject so the calling code knows there was an error
      return Promise.reject(error);
    }
  );
}
