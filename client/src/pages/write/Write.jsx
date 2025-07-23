import "./Write.css";
import { IoMdAdd } from "react-icons/io";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const { user } = useContext(Context);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [aiTopic, setAiTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setCategories((prev) =>
            checked ? [...prev, value] : prev.filter((cat) => cat !== value)
        );
    };

    const handleCustomCategory = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            const customCat = e.target.value.trim().toLowerCase();
            if (!categories.includes(customCat)) {
                setCategories([...categories, customCat]);
            }
            e.target.value = ""; // Clear input after adding
        }
    };

    const handleAiGenerate = async () => {
        if (!aiTopic.trim()) {
            setError("Please enter a topic");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("https://blogsy-jb29.onrender.com/server/posts/suggestions?prompt=" + aiTopic.trim());
            const aiData = JSON.parse(response.data.response);

            if (!aiData || typeof aiData !== "object") {
                throw new Error("Invalid AI response");
            }

            console.log("AI raw response:", aiData);

            setTitle(aiData.title || "AI Generated Title");
            setDesc(aiData.desc || "AI Generated Content");
            setCategories(aiData.categories || []);

            setAiModalOpen(false);
            setAiTopic("");
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Failed to generate content";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("https://blogsy-jb29.onrender.com/server/upload", data);
            } catch (error) {
                console.error("File upload error:", error);
            }
        }
        try {
            const res = await axios.post("https://blogsy-jb29.onrender.com/server/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (error) {
            console.error("Post submission error:", error);
        }
    };

    return (
        <div className="write">
            {file && (
                <div className="writeImageContainer">
                    <img className="writeImg" src={URL.createObjectURL(file)} alt="Uploaded preview" />
                </div>
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput" className="writeFileLabel">
                        <i className="writeIcon"><IoMdAdd /></i> Upload Image
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Enter your title..."
                        className="writeInput"
                        autoFocus={true}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <div className="writeCategories">
                        <label className="writeCategoryLabel">Categories:</label>
                        <div className="writeCategoryOptions">
                            {["Tech", "Lifestyle", "Travel", "Food"].map((category) => (
                                <label key={category} className="writeCategoryOption">
                                    <input
                                        type="checkbox"
                                        value={category.toLowerCase()}
                                        onChange={handleCategoryChange}
                                        checked={categories.includes(category.toLowerCase())}
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Add custom category (press Enter)"
                            className="writeInput writeCustomCategory"
                            onKeyDown={handleCustomCategory}
                        />
                        {categories.length > 0 && (
                            <div className="writeSelectedCategories">
                                {categories.map((cat) => (
                                    <span key={cat} className="writeCategoryTag">
                                        {cat}
                                        <button
                                            type="button"
                                            className="writeCategoryRemove"
                                            onClick={() => setCategories(categories.filter((c) => c !== cat))}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your story..."
                        className="writeInput writeText"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <div className="writeButtons">
                    <button className="writeSubmit" type="submit">
                        Publish
                    </button>
                     <button className="writeAiButton" onClick={() => setAiModalOpen(true)}>
                AI Write
            </button>
                </div>
            </form>
             
          
            {aiModalOpen && (
                <div className="aiModal">
                    <div className="aiModalContent">
                        <h3>Generate Blog with AI</h3>
                        <input
                            type="text"
                            placeholder="Enter topic (e.g., 'AI in 2025')"
                            className="writeInput aiTopicInput"
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                        />
                        {error && <p className="aiError">{error}</p>}
                        {loading ? (
                            <p className="aiLoading">Generating...</p>
                        ) : (
                            <div className="aiModalButtons">
                                <button className="writeSubmit" onClick={handleAiGenerate}>
                                    Generate
                                </button>
                                <button className="writeAiCancel" onClick={() => setAiModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}