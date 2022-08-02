import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks";
import styles from "../styles/login.module.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields", {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
      error = true;
    }

    if (password !== confirmPassword) {
      toast.error("Make sure password and confirm password matches", {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      toast.success('User registered successfully, please login now"', {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
      // navigate("/login");
    } else {
      toast.error(response.message, {
        position: "top-left",
        autoClose: 5000,
      });
    }
    setSigningUp(false);
  };

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleFormSubmit}>
        <span className={styles.loginSignupHeader}> Signup</span>
        <div className={styles.field}>
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className={styles.field}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className={styles.field}>
          <input
            placeholder="Confirm password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <input
            placeholder="Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <button disabled={signingUp}>
            {signingUp ? "Signing up..." : "Signup"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default SignUp;
