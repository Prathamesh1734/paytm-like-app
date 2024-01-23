import axios from "axios";

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        { username, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  getAuthToken: () => {
    return localStorage.getItem("token");
  },
  isAuthenticated: () => {
    const token = AuthService.getAuthToken();
    return token != null && token != "undefined";
  },
};

export default AuthService;
