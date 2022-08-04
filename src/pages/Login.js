import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();

  // console.log(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // this prevents the form from reloading
    setLoggingIn(true);
    if (!email || !password) {
      return toast.warn("Please enter both email and password", {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
    }
    const response = await auth.login(email, password);
    if (response.success) {
      toast.success("Successful Login.", {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
    } else {
      toast.error(response.message, {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
    }
    setLoggingIn(false);
  };
  if (auth.user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <span className={styles.loginSignupHeader}>Log In</span>
        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <button disabled={loggingIn}>
            {loggingIn ? " Logging In... " : " Log In "}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
