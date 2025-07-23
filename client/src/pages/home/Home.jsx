import "./Home.css";
import Hero from "../../components/hero/Hero";
import Posts from "../../components/posts/Posts";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/server/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <header>
        <Hero />
      </header>

      <main className="home-container">
        <h2 className="home-title">Latest Posts</h2>

        {posts.length ? (
          <div className="posts-grid">
            <Posts posts={posts} />
          </div>
        ) : (
          <p className="no-posts">No posts found.</p>
        )}
      </main>

      <Footer />
    </>
  );
}
