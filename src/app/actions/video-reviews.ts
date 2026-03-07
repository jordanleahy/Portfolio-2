'use server';

import { ApifyClient } from 'apify-client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';

// Initialize clients
const apifyClient = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

// YouTube Scraper Actor ID
const YOUTUBE_SCRAPER_ID = 'streamers/youtube-scraper';

export async function fetchRecentVideos(channelUrl: string) {
    if (!process.env.APIFY_TOKEN) {
        throw new Error('APIFY_TOKEN is missing from .env');
    }

    try {
        // Run the actor
        const run = await apifyClient.actor(YOUTUBE_SCRAPER_ID).call({
            searchKeywords: "",
            startUrls: [{ url: channelUrl }],
            maxResults: 5,
            downloadSubtitles: true, // we need this for the review!
        });

        // Fetch results from the dataset
        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
        return items;
    } catch (error: any) {
        console.error('Error fetching videos:', error);
        throw new Error(`Failed to fetch videos: ${error.message || 'Unknown error'}`);
    }
}

export async function generateReview(videoData: any) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is missing from .env');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const transcript = videoData.subtitles ? videoData.subtitles.map((s: any) => s.text).join(' ') : "No transcript available.";

    const prompt = `
        You are an expert design & AI critic. Review this video based on its transcript.
        
        Video Title: ${videoData.title}
        Transcript: ${transcript.substring(0, 10000)}... (truncated)

        Output a JSON object with:
        - title: A catchy blog post title
        - excerpt: A 2-sentence summary/hook
        - content: A 3-paragraph review focusing on the implications for design and AI in healthcare/tech.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Basic cleanup to get JSON
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Error generating review:', error);
        throw new Error('Failed to generate review with Gemini');
    }
}

export async function saveReview(reviewData: any) {
    const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');

    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');

        // This is a naive implementation. In a real app, use a proper DB. 
        // We are parsing the file to find the 'blogPosts' array and injecting the new post.

        // 1. Find the start of blogPosts array
        const blogPostsRegex = /blogPosts:\s*\[/;
        const match = fileContent.match(blogPostsRegex);

        if (!match || match.index === undefined) {
            throw new Error('Could not find blogPosts array in data.ts');
        }

        const insertionIndex = match.index + match[0].length;

        const newPost = `
        {
            id: "review-${Date.now()}",
            title: "${reviewData.title.replace(/"/g, '\\"')}",
            excerpt: "${reviewData.excerpt.replace(/"/g, '\\"')}",
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            readTime: "5 min read",
            link: "#", 
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop", // Placeholder
            content: \`${reviewData.content}\` // Custom field for now
        },`;

        const newFileContent = fileContent.slice(0, insertionIndex) + newPost + fileContent.slice(insertionIndex);

        await fs.writeFile(dataFilePath, newFileContent);
        return { success: true };
    } catch (error) {
        console.error('Error saving review:', error);
        throw new Error('Failed to save review to file');
    }
}
