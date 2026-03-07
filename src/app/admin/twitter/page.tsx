'use client';

import { useState } from 'react';
import { fetchTwitterRecent, generateTweetPost } from '../../actions/twitter-actions';
import { saveReview } from '../../actions/video-reviews'; // Reusing the save logic

export default function TwitterMonitor() {
    const [keywords, setKeywords] = useState('revenue cycle, healthcare design, AI agents');
    const [tweets, setTweets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [generatedPost, setGeneratedPost] = useState<any>(null);
    const [status, setStatus] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setStatus('Searching Twitter (this might take a few seconds)...');
        try {
            const results = await fetchTwitterRecent(keywords);
            setTweets(results || []);
            setStatus(`Found ${results?.length || 0} tweets.`);
        } catch (error) {
            console.error(error);
            setStatus('Error fetching tweets. Check APIFY_TOKEN.');
        } finally {
            setLoading(false);
        }
    };

    const handleDraft = async (tweet: any) => {
        setLoading(true);
        setStatus('Drafting trend post with Gemini...');
        try {
            const post = await generateTweetPost(tweet);
            setGeneratedPost(post);
            setStatus('Draft ready! Review below.');
        } catch (error) {
            console.error(error);
            setStatus('Error generating draft. Check GEMINI_API_KEY.');
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async () => {
        if (!generatedPost) return;
        setLoading(true);
        setStatus('Publishing to blog...');
        try {
            await saveReview(generatedPost); // Reusing the save function from video reviews
            setStatus('Published successfully! Check /blog');
            setGeneratedPost(null);
        } catch (error) {
            console.error(error);
            setStatus('Error publishing post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Twitter Trend Monitor</h1>
                <a href="/admin/reviews" className="text-blue-600 hover:underline">Go to Video Reviews →</a>
            </div>

            <div className="flex gap-4 mb-8">
                <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Keywords (comma separated)"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Search X'}
                </button>
            </div>

            {status && <div className="p-4 mb-4 bg-gray-100 rounded text-sm">{status}</div>}

            <div className="grid gap-4">
                {tweets.map((tweet, i) => (
                    <div key={i} className="border p-4 rounded bg-white hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <div className="font-bold">{tweet.user_name} <span className="text-gray-500 font-normal">@{tweet.screen_name}</span></div>
                            <div className="text-xs text-gray-400">{tweet.created_at}</div>
                        </div>
                        <p className="text-gray-800 mb-3">{tweet.text}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex gap-4">
                                <span>❤️ {tweet.favorites}</span>
                                <span>Mf {tweet.retweets}</span>
                            </div>
                            <button
                                onClick={() => handleDraft(tweet)}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Draft Trend Post
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {generatedPost && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Trend Post Draft</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={generatedPost.title}
                                    onChange={(e) => setGeneratedPost({ ...generatedPost, title: e.target.value })}
                                    className="w-full p-2 border rounded mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                                <textarea
                                    value={generatedPost.excerpt}
                                    onChange={(e) => setGeneratedPost({ ...generatedPost, excerpt: e.target.value })}
                                    className="w-full p-2 border rounded mt-1 h-20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    value={generatedPost.content}
                                    onChange={(e) => setGeneratedPost({ ...generatedPost, content: e.target.value })}
                                    className="w-full p-2 border rounded mt-1 h-60"
                                />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => setGeneratedPost(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePublish}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Publish to Blog
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
