// File: netlify/functions/openai-request.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                prompt: body.prompt,
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' }),
        };
    }
};
