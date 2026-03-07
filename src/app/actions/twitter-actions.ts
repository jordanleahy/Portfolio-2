'use server';

import { ApifyClient } from 'apify-client';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize clients
const apifyClient = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

// Twitter Scraper Actor ID
// const TWITTER_ACTOR_ID = 'kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest';
// Using a known reliable free/cheap one or the one found
const TWITTER_ACTOR_ID = 'kaitoeasyapi/twitter-x-data-tweet-scraper-pay-per-result-cheapest';

export async function fetchTwitterRecent(keywords: string) {
    if (!process.env.APIFY_TOKEN) {
        throw new Error('APIFY_TOKEN is missing from .env');
    }

    try {
        // Construct search query
        const query = keywords.split(',').map(k => k.trim()).join(' OR ');

        // Run the actor
        const run = await apifyClient.actor(TWITTER_ACTOR_ID).call({
            "searchTerms": [query],
            "maxItems": 10,
            "sort": "Latest"
        });

        // Fetch results from the dataset
        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
        return items;
    } catch (error: any) {
        console.error('Error fetching tweets:', error);
        throw new Error(`Failed to fetch tweets: ${error.message || 'Unknown error'}`);
    }
}

export async function generateTweetPost(tweetData: any) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is missing from .env');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        You are an expert design & healthcare trend analyst. 
        Create a short "Trend Watch" blog post based on this tweet.
        
        Tweet Author: ${tweetData.user_name} (@${tweetData.screen_name})
        Tweet Content: "${tweetData.text}"
        Likes: ${tweetData.favorites} | Retweets: ${tweetData.retweets}

        Output a JSON object with:
        - title: A trend-focused headline
        - excerpt: A 1-sentence hook about why this matters.
        - content: A 2-paragraph analysis connecting this tweet to broader Revenue Cycle or Design trends.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Basic cleanup to get JSON
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Error generating tweet post:', error);
        throw new Error('Failed to generate post with Gemini');
    }
}
