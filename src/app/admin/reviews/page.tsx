'use client';

import { useState } from 'react';
import { fetchRecentVideos, generateReview, saveReview } from '../../actions/video-reviews';

export default function VideoReviewsAdmin() {
    const [channelUrl, setChannelUrl] = useState('https://www.youtube.com/@AIExplained');
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    const [generatedReview, setGeneratedReview] = useState<any>(null);
    const [status, setStatus] = useState('');

    const handleFetch = async () => {
        setLoading(true);
        setStatus('Fetching videos from YouTube...');
        try {
            const results = await fetchRecentVideos(channelUrl);
            setVideos(results);
            setStatus('Videos fetched!');
        } catch (error) {
            console.error(error);
            setStatus('Error fetching videos. Check APIFY_TOKEN.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async (video: any) => {
        setSelectedVideo(video);
        setLoading(true);
        setStatus(`Generating review for "${video.title}"...`);
        try {
            // In a real app we'd pass the full video data, but for now just the title/url/subtitles
            const review = await generateReview(video);
            setGeneratedReview(review);
            setStatus('Review generated! Please review below.');
        } catch (error) {
            console.error(error);
            setStatus('Error generating review. Check GEMINI_API_KEY.');
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async () => {
        if (!generatedReview) return;
        setLoading(true);
        setStatus('Publishing to blog...');
        try {
            await saveReview(generatedReview);
            setStatus('Published successfully! Check /blog');
            setGeneratedReview(null);
            setSelectedVideo(null);
        } catch (error) {
            console.error(error);
            setStatus('Error publishing review.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Video Review Automation</h1>

            <div className="flex gap-4 mb-8">
                <input
                    type="text"
                    value={channelUrl}
                    onChange={(e) => setChannelUrl(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="YouTube Channel URL"
                />
                <button
                    onClick={handleFetch}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Fetch Videos'}
                </button>
            </div>

            {status && <div className="p-4 mb-4 bg-gray-100 rounded text-sm">{status}</div>}

            <div className="grid gap-6">
                {videos.map((video) => (
                    <div key={video.id} className="border p-4 rounded flex justify-between items-center group hover:border-blue-300 transition-colors">
                        <div>
                            <h3 className="font-semibold text-lg">{video.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(video.date).toLocaleDateString()}</p>
                        </div>
                        <button
                            onClick={() => handleGenerate(video)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Generate Review
                        </button>
                    </div>
                ))}
            </div>

            {generatedReview && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Review Draft</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={generatedReview.title}
                                    onChange={(e) => setGeneratedReview({ ...generatedReview, title: e.target.value })}
                                    className="w-full p-2 border rounded mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                                <textarea
                                    value={generatedReview.excerpt}
                                    onChange={(e) => setGeneratedReview({ ...generatedReview, excerpt: e.target.value })}
                                    className="w-full p-2 border rounded mt-1 h-20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    value={generatedReview.content}
                                    onChange={(e) => setGeneratedReview({ ...generatedReview, content: e.target.value })}
                                    className="w-full p-2 border rounded mt-1 h-60"
                                />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => setGeneratedReview(null)}
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
