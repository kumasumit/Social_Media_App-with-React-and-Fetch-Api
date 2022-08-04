import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const auth = useAuth();
  // console.log(auth.user);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : "");
  const [password, setPassword] = useState(
    auth.user?.password ? auth.user.password : ""
  );
  const [confirmPassword, setConfirmPassword] = useState(
    auth.user?.password ? auth.user.password : ""
  );
  const [savingForm, setSavingForm] = useState(false);
  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
  };
  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.error("Please enter all the fields", {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
      error = true;
    }
    if (password !== confirmPassword) {
      toast.error(
        "Please make sure both password and ConfirmPassword are same",
        {
          position: "top-left",
          autoClose: 5000,
          closeOnClick: true,
        }
      );
      error = true;
    }
    if (error) {
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();
      return toast.success("User updated Successfully", {
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
    setSavingForm(false);
  };
  return (
    <>
      <div className={styles.settings}>
        <div className={styles.imgContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/560/560216.png"
            alt=""
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>Email</div>
          <div className={styles.fieldValue}>{auth.user?.email}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>Name</div>
          {editMode ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <div className={styles.fieldValue}>{auth.user?.name}</div>
          )}
        </div>
        {editMode && (
          <>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>Confirm Password</div>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </>
        )}

        <div className={styles.btnGrp}>
          {editMode ? (
            <>
              <button
                className={`button ${styles.saveBtn}`}
                onClick={updateProfile}
                disabled={savingForm}
              >
                {savingForm ? "Saving Profile..." : "Save Profile"}
              </button>
              <button
                className={`button ${styles.editBtn}`}
                onClick={() => setEditMode(false)}
              >
                Go back
              </button>
            </>
          ) : (
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Settings;
