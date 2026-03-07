'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { SITE_DATA } from '../../lib/data';

export async function generateBlogPost(topic: string, type: 'scratch' | 'remix', context?: string) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is missing from .env');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct a rich context from SITE_DATA
    const authorContext = `
        You are writing as ${SITE_DATA.author.name}, a ${SITE_DATA.author.role}.
        Bio: ${SITE_DATA.author.bio}
        
        Writing Style:
        - Direct, professional but conversational.
        - Use concrete examples from your experience (SmarterDx, PrescriberPoint).
        - Focus on the intersection of Design, Engineering (React/Next.js), and AI (LLMs, Agents).
        - "Product Design Engineering" is a core theme: closing the gap between Figma and code.
        - Avoid generic fluff. Be opinionated.
    `;

    let prompt = '';

    if (type === 'remix' && context) {
        // Find the case study data if context is an ID, or use raw text
        const caseStudy = SITE_DATA.caseStudies.find(c => c.id === context);
        const caseStudyText = caseStudy ? JSON.stringify(caseStudy) : context;

        prompt = `
            ${authorContext}

            TASK: Rewrite the following Case Study into a compelling "How I Built This" or "Lessons Learned" blog post.
            
            CASE STUDY DATA:
            ${caseStudyText}

            TOPIC/ANGLE: ${topic}
            
            Format: Markdown (h2, h3, bullet points).
        `;
    } else {
        prompt = `
            ${authorContext}

            TASK: Write a blog post about "${topic}".

            Use my background/experience as proof points where relevant.
            
            Format: Markdown (h2, h3, bullet points).
        `;
    }

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error('Error generating blog post:', error);
        throw new Error(`Failed to generate post: ${error.message}`);
    }
}
