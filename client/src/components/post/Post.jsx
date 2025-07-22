import "./Post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
    const PF = "http://localhost:5000/images/";
    return (
        <div className="post">
            {post.photo && (
                <div className="postImageContainer">
                    <img className="postImg" src={PF + post.photo} alt={post.title} />
                </div>
            )}
            <div className="postContent">
                <div className="postInfo">
                    <div className="postCats">
                        {post.categories.map((c, index) => (
                            <span key={index} className="postCat">
                                {c}
                            </span>
                        ))}
                    </div>
                    <Link to={`/post/${post._id}`} className="link">
                        <span className="postTitle">{post.title}</span>
                    </Link>
                    <hr className="postDivider" />
                    <span className="postDate">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </div>
                <p className="postDesc">{post.desc}</p>
            </div>
        </div>
    );
}