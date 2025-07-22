const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");


const axios = require('axios');

router.get('/suggestions', async (req, res) => {
    const userPrompt = req.query.prompt;

    if (!userPrompt || userPrompt.trim() === '') {
        return res.status(400).json({ error: 'Prompt is required as a query parameter.' });
    }

    const query = userPrompt.trim();

    const promptBlog = `Generate a blog post idea based on the topic: ${query}. 

        Return a JSON object with the following structure:
        {
        "title": "Suggested blog post title",
        "desc": "A short, engaging introduction or description for the post.",
        "categories": ["list", "of", "relevant", "categories"]
        }

        Keep the title under 100 characters. Keep the description under 300 characters. Categories should be 1–3 words each and relevant to the topic.
`

  try {
    const response = await axios.get('https://all-ai-in-one.p.rapidapi.com/chat', {
        params: {
            model: 'chatgpt',
            prompt: promptBlog  
        },
        headers: {
            'x-rapidapi-key': '5ce354ea5amshdcd75914a29fa69p1f74e8jsn6d3235b6cea4',
            'x-rapidapi-host': 'all-ai-in-one.p.rapidapi.com'
        }
    });

    res.status(200).json(response.data); // ✅ Send only the response data
} catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
        error: 'Failed to fetch AI suggestions.',
        detail: error.response?.data || error.message
    });
}

});


// router.get("/", async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

//CREATE POST 
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error saving post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            }
            catch (error) {
                res.status(500).json(error);
            }
        }
        else {
            res.status(401).json("You can update only your post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});



// DELETE POST 
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                // await post.remove();
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("Post has been deleted...");
            }
            catch (error) {
                res.status(500).json(error);
            }
        }
        else {
            res.status(401).json("You can delete only your post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});



// GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});




//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        }
        else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        }
        else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router 