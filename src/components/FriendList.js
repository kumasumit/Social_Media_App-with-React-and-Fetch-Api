import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import styles from "../styles/home.module.css";

const FriendList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user;
  useEffect(() => {
    const getFriends = async () => {
      await auth.fetchFriends();
      console.log(auth.user);
    };
    getFriends();
  }, []);

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>
      {/* if there are no friends */}
      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>NO friends found!</div>
      )}
      {/* if there are friends, display the div below */}
      {friends &&
        friends.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
              <div className={styles.friendsImg}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/560/560216.png"
                  alt=""
                />
              </div>
              <div className={styles.friendsName}>{friend.to_user.email}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendList;
