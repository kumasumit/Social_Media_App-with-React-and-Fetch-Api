import { CreatePost, FriendList, Loader, Post } from "../components";
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
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {/* show friendlist only for logged in users */}
      {auth.user && <FriendList />}
    </div>
  );
};

export default Home;
