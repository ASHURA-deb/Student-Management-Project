import { useState } from "react";
import '../Styles/Form.css'; 
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const Login = ({ type, onSubmit, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // NEW: default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url;
      let payload;

      if (type === "signup") {
        url = "http://localhost:5000/register";
        payload = { name: formData.name, email: formData.email, password: formData.password };
      } else {
        // Different login endpoints depending on role
        url =
          formData.role === "student"
            ? "http://localhost:5000/student-login"
            : "http://localhost:5000/login";

        // Student login uses student_id instead of email
        payload =
          formData.role === "student"
            ? { student_id: formData.email, password: formData.password }
            : { email: formData.email, password: formData.password };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong!");
        return;
      }

      if (type === "login" && data.token) {
        localStorage.setItem("token", data.token);
        if (setIsAuthenticated) setIsAuthenticated(true);
        toast.success("Login successful!");

        // Redirect based on role
        if (formData.role === "student") {
          navigate("/StudentDashboard");
        } else {
          navigate("/dashboard");
        }
      } else if (type === "signup") {
        toast.success("Signup successful! You can now log in.");
        navigate("/login");
      }

      if (onSubmit) onSubmit(data);

    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error, please try again later.");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="form_area">
          <p className="title">{type === "signup" ? "SIGN UP" : "LOGIN"}</p>
          <form onSubmit={handleSubmit}>
            {type === "signup" && (
              <div className="form_group">
                <label className="sub_title" htmlFor="name">
                  Name
                </label>
                <input
                  placeholder="Enter your full name"
                  name="name"
                  className="form_style"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form_group">
              <label className="sub_title">Login As</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form_style"
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="form_group">
              <label className="sub_title" htmlFor="email">
                {formData.role === "student" ? "Student ID" : "Email"}
              </label>
              <input
                placeholder={
                  formData.role === "student"
                    ? "Enter your student ID"
                    : "Enter your email"
                }
                name="email"
                className="form_style"
                type={formData.role === "student" ? "text" : "email"}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form_group">
              <label className="sub_title" htmlFor="password">
                Password
              </label>
              <input
                placeholder="Enter your password"
                name="password"
                className="form_style"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn2" type="submit">
              {type === "signup" ? "SIGN UP" : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
