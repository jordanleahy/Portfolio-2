'use client';

import { useState } from 'react';
import { generateBlogPost } from '../../actions/blog-writer';
import { SITE_DATA } from '../../../lib/data';
import { saveReview } from '../../actions/video-reviews'; // Reuse save logic

export default function BlogWriter() {
    const [mode, setMode] = useState<'scratch' | 'remix'>('scratch');
    const [topic, setTopic] = useState('');
    const [selectedCaseStudy, setSelectedCaseStudy] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        setStatus('Drafting post... (Gemini is reading your case studies)');
        try {
            const context = mode === 'remix' ? selectedCaseStudy : undefined;
            const content = await generateBlogPost(topic, mode, context);
            setGeneratedContent(content);
            setStatus('Draft complete!');
        } catch (error) {
            console.error(error);
            setStatus('Error generating post. Check GEMINI_API_KEY.');
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async () => {
        if (!generatedContent) return;
        setLoading(true);
        setStatus('Publishing to blog...');

        // Basic parsing of the markdown to get title/excerpt/etc would go here
        // For now, we'll just save it as a raw post object for the demo
        const newPost = {
            title: topic || "New Blog Post",
            excerpt: generatedContent.substring(0, 100) + "...",
            content: generatedContent,
            date: new Date().toLocaleDateString(),
            readTime: "5 min read",
            image: "/blog/placeholder.png" // User would replace this
        };

        try {
            await saveReview(newPost);
            setStatus('Published successfully! Check /blog');
            setGeneratedContent('');
            setTopic('');
        } catch (error) {
            console.error(error);
            setStatus('Error publishing post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">AI Blog Writer</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setMode('scratch')}
                        className={`px-4 py-2 rounded ${mode === 'scratch' ? 'bg-black text-white' : 'bg-gray-100'}`}
                    >
                        New Topic
                    </button>
                    <button
                        onClick={() => setMode('remix')}
                        className={`px-4 py-2 rounded ${mode === 'remix' ? 'bg-black text-white' : 'bg-gray-100'}`}
                    >
                        Remix Case Study
                    </button>
                </div>

                {mode === 'remix' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Select Case Study</label>
                        <select
                            value={selectedCaseStudy}
                            onChange={(e) => setSelectedCaseStudy(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Choose a project --</option>
                            {SITE_DATA.caseStudies.map(c => (
                                <option key={c.id} value={c.id}>{c.title} ({c.subtitle})</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        {mode === 'scratch' ? 'What do you want to write about?' : 'What angle should I take?'}
                    </label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder={mode === 'scratch' ? "e.g., The future of AI in clinical workflows" : "e.g., Lessons learned about data visualization"}
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading || (mode === 'remix' && !selectedCaseStudy)}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Writing...' : 'Generate Draft'}
                </button>

                {status && <span className="ml-4 text-sm text-gray-500">{status}</span>}
            </div>

            {generatedContent && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Draft Preview</h2>
                    <textarea
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        className="w-full h-96 p-4 border rounded font-mono text-sm mb-4"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handlePublish}
                            disabled={loading}
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                            Publish to Blog
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
