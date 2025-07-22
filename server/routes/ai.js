const https = require('https');
const express = require('express');
const router = express.Router();

router.get('/generate', (req, res) => {
	const userPrompt = req.query.prompt;

	if (!userPrompt || userPrompt.trim() === '') {
		return res.status(400).json({ error: 'Prompt is required as a query parameter.' });
	}

	const query = encodeURIComponent(userPrompt.trim());

	const options = {
		method: 'GET',
		hostname: 'all-ai-in-one.p.rapidapi.com',
		port: null,
		path: `/chat?model=chatgpt&message=${query}`,
		headers: {
			'x-rapidapi-key': process.env.RAPIDAPI_KEY,
			'x-rapidapi-host': 'all-ai-in-one.p.rapidapi.com'
		}
	};

	const apiReq = https.request(options, (apiRes) => {
		let data = '';

		apiRes.on('data', (chunk) => {
			data += chunk;
		});

		apiRes.on('end', () => {
			try {
				const responseData = JSON.parse(data);
				res.json(responseData);
			} catch (error) {
				res.status(500).json({ error: 'Failed to parse API response.', detail: error.message });
			}
		});
	});

	apiReq.on('error', (e) => {
		res.status(500).json({ error: 'Error calling AI API.', detail: e.message });
	});

	apiReq.end();
});

module.exports = router;
