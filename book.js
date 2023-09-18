const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

const URL_TO_SCRAPE = 'https://books.toscrape.com/catalogue/page-2.html'; // Replace with the actual URL

app.get('/api/books', async (req, res) => {
  try {
    const response = await axios.get(URL_TO_SCRAPE);
    const $ = cheerio.load(response.data);
    const books = [];

    $('.product_pod').each((index, element) => {
      const book_title=$(element).find("h3").find("a").attr("title")
      const book_price=$(element).find(".price_color").text()
      const book_stock=$(element).find(".availability").text().trim()
      const book_star=$(element).find(".image_container").next().attr("class").slice(12)
      const book_link="https://books.toscrape.com/"+$(element).find("h3").find("a").attr("href")
      const book_image="https://books.toscrape.com/"+$(element).find("img").attr("src")


      books.push({ book_title, book_price, book_stock,book_star,book_link,book_image});
    });

    res.json(books);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
