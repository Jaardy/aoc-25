// @ts-nocheck
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const YEAR = 2025;
const AOC_URL = `https://adventofcode.com/${YEAR}`;

// --- Helper Functions ---

async function fetchUrl(url) {
  const sessionCookie = process.env.AOC_SESSION_COOKIE;
  if (!sessionCookie) {
    throw new Error('AOC_SESSION_COOKIE environment variable is not set. Please create a .env file with your session cookie.');
  }

  const response = await fetch(url, {
    headers: { Cookie: `session=${sessionCookie}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}\n${errorText}`);
  }

  return response.text();
}

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// --- Main Logic Functions ---

async function getPuzzlePage(day) {
  const url = `${AOC_URL}/day/${day}`;
  console.log(`Fetching puzzle page: ${url}`);
  const html = await fetchUrl(url);
  return cheerio.load(html);
}

async function saveInput(day, dir) {
  const filePath = path.join(dir, 'input.txt');
  if (fs.existsSync(filePath)) {
    console.log('Input file already exists. Skipping.');
    return;
  }

  const url = `${AOC_URL}/day/${day}/input`;
  console.log(`Fetching input: ${url}`);
  const input = await fetchUrl(url);
  fs.writeFileSync(filePath, input.trim());
  console.log(`Input saved to ${filePath}`);
}

async function saveInstructions(day, dir, $, force = false) {
  const filePath = path.join(dir, 'instructions.html');
  if (fs.existsSync(filePath) && !force) {
    console.log('Instructions file already exists. Skipping. (use --force to override)');
    return;
  }

  console.log(force ? 'Re-fetching instructions...' : 'Extracting instructions...');
  const instructionHTML = $('article.day-desc').html();
  if (instructionHTML) {
    fs.writeFileSync(filePath, instructionHTML.trim());
    console.log(`Instructions saved to ${filePath}`);
  } else {
    console.warn('Could not find instructions on the puzzle page.');
  }
}

async function saveExample(day, dir, $, force = false) {
  const filePath = path.join(dir, 'example.txt');
  if (fs.existsSync(filePath) && !force) {
    console.log('Example file already exists. Skipping. (use --force to override)');
    return;
  }

  console.log(force ? 'Re-fetching example...' : 'Extracting example...');
  // Heuristic: The first <pre><code> block in the article is usually the example.
  const exampleText = $('article.day-desc pre code').first().text();
  if (exampleText) {
    fs.writeFileSync(filePath, exampleText.trim());
    console.log(`Example saved to ${filePath}`);
  } else {
    console.warn('Could not find a suitable example on the puzzle page.');
  }
}

/**
 * Main function to fetch all assets for a given day.
 */
async function main() {
  try {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    const force = process.argv.includes('--force');

    if (month !== 11) {
      console.error('This script is designed to be run in December for Advent of Code.');
      process.exit(1);
    }

    console.log(`--- Fetching assets for Day ${day}, ${YEAR} ---`);
    if (force) {
      console.log('Force flag detected. Will re-fetch page content.');
    }

    const dayDir = path.join(__dirname, `day-${day}`);
    ensureDirExists(dayDir);

    // Fetch and save the puzzle input (never forced)
    await saveInput(day, dayDir);

    // Fetch puzzle page if instructions/example are missing, or if --force is used
    const instructionsPath = path.join(dayDir, 'instructions.html');
    const examplePath = path.join(dayDir, 'example.txt');
    const shouldFetchPage = !fs.existsSync(instructionsPath) || !fs.existsSync(examplePath) || force;

    if (shouldFetchPage) {
      const $ = await getPuzzlePage(day);
      await saveInstructions(day, dayDir, $, force);
      await saveExample(day, dayDir, $, force);
    } else {
      console.log('Instructions and example files already exist. Skipping page fetch. (use --force to re-fetch)');
    }

    console.log(`--- Successfully finished for Day ${day} ---`);
  } catch (error) {
    console.error('\nAn error occurred:');
    console.error(error.message);
    process.exit(1);
  }
}

main();
