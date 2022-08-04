import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/home.module.css";
import { addPost } from "../api";
import { usePosts } from "../hooks/posts";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);

  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);
    if (post.length < 1 || post.trim().length <= 0) {
      setAddingPost(false);
      return toast.warn("Post cannot be blank or empty", {
        position: "top-left",
        autoClose: 5000,
        closeOnClick: true,
      });
    }
    const response = await addPost(post);
    if (response.success) {
      setPost("");
      posts.addPostToState(response.data.post);
      toast.success("Post created successfully", {
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
    setAddingPost(false);
  };

  return (
    <>
      <div className={styles.createPost}>
        <textarea
          className={styles.addPost}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <div>
          <button
            className={styles.addPostBtn}
            onClick={handleAddPostClick}
            disabled={addingPost}
          >
            {addingPost ? "Adding post..." : "Add post"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
