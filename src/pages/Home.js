import { Link } from "react-router-dom";
import { Comment, CreatePost, FriendList, Loader } from "../components";
import styles from "../styles/home.module.css";
import { useAuth } from "../hooks/auth";
import { usePosts } from "../hooks/posts";

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();
  // here posts has two states loading and data

  if (posts.loading) {
    return <Loader />;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user-pic"
                />
                <div>
                  <Link
                    to={`user/${post.user._id}`}
                    className={styles.postAuthor}
                  >
                    {post.user.name}
                  </Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.content}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/456/456115.png"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                  <Comment comment={comment} key={`comment-${comment._id}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* show friendlist only for logged in users */}
      {auth.user && <FriendList />}
    </div>
  );
};

export default Home;
