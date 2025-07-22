import React, { useState, useEffect } from "react";
import "./explore.css";
import axios from "axios";
import Post from "../../components/post/Post";

export default function Explore() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ user: "", cat: "" });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const query = new URLSearchParams(filter).toString();
                const res = await axios.get(`/posts?${query}`);
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [filter]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="explore">
            <div className="exploreFilter">
                <input
                    type="text"
                    name="user"
                    placeholder="Filter by username..."
                    value={filter.user}
                    onChange={handleFilterChange}
                    className="exploreInput"
                />
                <input
                    type="text"
                    name="cat"
                    placeholder="Filter by category..."
                    value={filter.cat}
                    onChange={handleFilterChange}
                    className="exploreInput"
                />
            </div>
            <div className="explorePosts">
                {posts.length > 0 ? (
                    posts.map((post) => <Post key={post._id} post={post} />)
                ) : (
                    <p className="exploreNoPosts">No posts found.</p>
                )}
            </div>
        </div>
    );
}