import Post from "../post/Post";
import "./Posts.css";

export default function Posts({posts = []}) {

  // if (!Array.isArray(posts)) {
  //   console.error("Expected posts to be an array but got:", typeof posts);
  //   return null; // or return some fallback UI
  // }

  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} key={p.id}/>
      ))}
        
    </div>
  )
}
