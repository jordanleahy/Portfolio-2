const { ApifyClient } = require('apify-client');
const fs = require('fs');
const path = require('path');

// CONFIGURATION
const APIFY_TOKEN = process.env.APIFY_TOKEN; // Ensure this is set in your env
const ACTOR_ID = 'curious_coder/linkedin-profile-scraper'; // Replace with preferred actor if different
const INPUT_FILE = '/Users/jordanleahy/Downloads/dataset_linkedin-profile-scraper_2026-02-12_14-37-03-912.json';
const OUTPUT_FILE = path.join(__dirname, '../data/enriched_linkedin_profiles.json');

async function main() {
    if (!APIFY_TOKEN) {
        console.error('Error: APIFY_TOKEN not found in environment variables.');
        return;
    }

    const client = new ApifyClient({ token: APIFY_TOKEN });

    // 1. Read the dataset
    console.log(`Reading dataset from: ${INPUT_FILE}`);
    let profiles;
    try {
        const rawData = fs.readFileSync(INPUT_FILE, 'utf8');
        profiles = JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading input file:', error.message);
        return;
    }

    // 2. Extract URLs
    const urls = profiles
        .map(p => p.linkedinUrl)
        .filter(url => url && url.includes('linkedin.com/in/'));

    // Deduplicate
    const uniqueUrls = [...new Set(urls)];

    console.log(`Found ${profiles.length} profiles.`);
    console.log(`Extracted ${uniqueUrls.length} unique LinkedIn URLs to enrich.`);

    if (uniqueUrls.length === 0) {
        console.log('No URLs found to process.');
        return;
    }

    // 3. Run the Actor
    console.log(`Starting actor: ${ACTOR_ID}...`);
    try {
        const run = await client.actor(ACTOR_ID).call({
            urls: uniqueUrls.map(url => ({ url })),
            // Add other inputs like 'deepScrape': true if supported/needed
        });

        console.log(`Actor run started. Run ID: ${run.id}`);
        console.log(`Waiting for finish...`);

        // 4. Fetch Results
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        console.log(`Run finished. Fetched ${items.length} results.`);

        // 5. Save Output
        fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(items, null, 2));
        console.log(`Enriched data saved to: ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error running Apify actor:', error);
        if (error.message.includes('limit exceeded')) {
            console.error('\nNOTE: Your Apify monthly usage limit seems to be exceeded. Please check your billing.');
        }
    }
}

main();
