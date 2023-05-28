'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.detik.com/tag/maritim';

class DetikController {
  async getData({ request, response }) {
    try {
      const result = await axios.get(url);
      const $ = cheerio.load(result.data);

      const articles = [];
      $('article').each((index, element) => {
        const article = {};
        const linkElement = $(element).find('a');
        article.newsLink = linkElement.attr('href');
        article.title = $(element).find('h2.title').text().trim();
        article.date = $(element).find('span.date').text().trim();
        article.content = $(element).find('p').text().trim();
       
        articles.push(article);
      });

      return response.status(200).json({ data: articles });
    } catch (error) {
      return response.status(500).json({ error: 'Failed to fetch data from Detik' });
    }
  }
}

module.exports = DetikController;
