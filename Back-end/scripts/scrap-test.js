const axios = require('axios');
const cheerio = require('cheerio');

// Local URL of your generated page
const url = 'http://127.0.0.1:5500/landing-sc/index.html';

async function scrapeLocalInternships() {
  try {
    const { data } = await axios.get(url); // Fetch the HTML
    const $ = cheerio.load(data);

    const internships = [];

    // Iterate over each internship <li>
    $('li').each((i, el) => {
      const title = $(el).find('a').text().trim();
      const link = $(el).find('a').attr('href');
      const company = $(el).find('.company').text().trim();
      const location = $(el).find('.location').text().trim();
      const deadline = $(el).find('.deadline').text().trim();

      if (title && link) {
        internships.push({ title, link, company, location, deadline });
      }
    });

    console.log(internships); // Output results
  } catch (error) {
    console.error('Error scraping local page:', error);
  }
}

scrapeLocalInternships();
