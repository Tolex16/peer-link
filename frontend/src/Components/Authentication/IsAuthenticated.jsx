import { jwtDecode } from 'jwt-decode';

// Function to retrieve the JWT token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to check if a JWT token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token); // Decode the token to retrieve payload
    // Check if the expiration time is less than the current time
    return decoded.exp < Date.now() / 1000; 
  } catch (err) {
    // If decoding fails, consider the token invalid
    return true;
  }
};

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = getToken();
  // Check if a token exists and it's not expired
  return token && !isTokenExpired(token);
};

// Export the isAuthenticated function
export default isAuthenticated;
