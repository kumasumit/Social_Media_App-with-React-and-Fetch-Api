import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks/auth";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../components";
import { addFriend, fetchUserProfile, removeFriend } from "../api";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  console.log(userId);
  const navigate = useNavigate();
  const auth = useAuth();
  // console.log(userId);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.error, {
          position: "top-left",
          autoClose: 5000,
          closeOnClick: true,
        });
        return navigate("/");
      }

      setLoading(false);
    };

    getUser();
  }, [userId, navigate]);

  // A function to check whether user is a friend or not
  const checkIfUserIsAFriend = () => {
    // creating a reference for friends array in auth.user.friends and naming it friends.
    const friends = auth.user.friends;
    console.log(friends);
    //creating an array freindsIds to store Ids of all friends in the friends array
    const friendIds = friends?.map((friend) => friend.to_user._id);
    const index = friendIds?.indexOf(userId);
    //if index is not -1, means the userId is a friend if the user, hence return true.
    if (index !== -1) {
      return true;
    }
    //if user is not a friend return false.
    return false;
  };

  //if loading is true display the loader
  if (loading) {
    return <Loader />;
  }
  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      console.log(friendship);
      auth.updateUserFriends(true, friendship);
      toast.success("Friend addded successfully", {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
    } else {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
    }
    setRequestInProgress(false);
  };
  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);
    const response = await removeFriend(userId);
    if (response.success) {
      const friendship = auth.user.friends?.filter(
        (friend) => friend.to_user._id === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      toast.success("Friend Removed successfully", {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
    } else {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
    }
    setRequestInProgress(false);
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
          <div className={styles.fieldValue}>{user?.email}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>Name</div>
          <div className={styles.fieldValue}>{user?.name}</div>
        </div>

        <div className={styles.btnGrp}>
          {/* if userId is a fried show remove friend else show Add Friend Button */}
          {checkIfUserIsAFriend() ? (
            <button
              className={`button ${styles.saveBtn}`}
              onClick={handleRemoveFriendClick}
              disabled={requestInProgress}
            >
              {requestInProgress ? "Removing Friend..." : "Remove Friend"}
            </button>
          ) : (
            <button
              className={`button ${styles.saveBtn}`}
              onClick={handleAddFriendClick}
              disabled={requestInProgress}
            >
              {requestInProgress ? "Adding Friend..." : "Add Friend"}
            </button>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default UserProfile;
