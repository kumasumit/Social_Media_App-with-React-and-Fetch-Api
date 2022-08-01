import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
const Navbar = () => {
  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <a href="/">
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                alt=""
                className={styles.userDp}
              />
            </a>
            <span>{auth.user.name}</span>
          </div>
        )}
        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
