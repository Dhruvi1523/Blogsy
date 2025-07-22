import { useLocation } from "react-router";
import "./SinglePost.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get("/posts/" + path);
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.desc);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {
                data: { username: user.username },
            });
            window.location.replace("/");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put("/posts/" + path, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="singlePost">
            <div className="postWrapper">
                {post.photo && (
                    <div className="postImageContainer">
                        <img className="singlePostImg" src={PF + post.photo} alt={post.title} />
                    </div>
                )}
                <div className="postHeader">
                    {updateMode ? (
                        <input
                            className="singlePostTitleInput"
                            type="text"
                            value={title}
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username && (
                                <div className="singlePostEdit">
                                    <span
                                        className="singlePostIcon"
                                        onClick={() => setUpdateMode(true)}
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </span>
                                    <span
                                        className="singlePostIcon"
                                        onClick={handleDelete}
                                        title="Delete"
                                    >
                                        <RiDeleteBin6Line />
                                    </span>
                                </div>
                            )}
                        </h1>
                    )}
                </div>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:{" "}
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                    {post.categories && post.categories.length > 0 && (
                        <div className="singlePostCats">
                            {post.categories.map((c, index) => (
                                <span key={index} className="singlePostCat">
                                    {c}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className="singlePostDesc">{desc}</p>
                )}
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}