import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";
import Comment from "./Comment";
import { usePosts } from "../hooks/posts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createComment } from "../api";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const posts = usePosts();
  const handleAddComment = async (e) => {
    if (e.key === "Enter") {
      const response = await createComment(comment, post._id);
      if (response.success) {
        setComment("");
        posts.addComment(response.data.comment, post._id);
        toast.success("Comment created successfully!", {
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
    }
  };
  return (
    <>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="user-pic"
            />
            <div>
              <Link to={`user/${post.user._id}`} className={styles.postAuthor}>
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
            <input
              placeholder="Start typing a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleAddComment}
            />
          </div>

          <div className={styles.postCommentsList}>
            {post.comments.map((comment) => (
              <Comment comment={comment} key={`comment-${comment._id}`} />
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Post;
