import axios from 'axios';
let apiKey = process.env.API_KEY;
import { appendArticle } from './domMethods';

export async function fetchNews(term) {
  const params = {
    q: term,
    pageSize: 20,
    page: 1
  };

  const url = `https://newsapi.org/v2/everything?q=${term}&apiKey=${apiKey}&pageSize=${params.pageSize}&page=${params.page}&sortBy=publishedAt`;

  const res = await axios.get(url);
  const articles = res.data.articles;
  return articles;
}

export async function fetchMoreNews(term) {
  const button = document.querySelector('.load-more');
  let page = button.dataset.page;
  page = parseInt(page);
  page++;
  button.setAttribute('data-page', page.toString());
  const params = {
    q: term,
    pageSize: 20,
    page
  };

  const url = `https://newsapi.org/v2/everything?q=${term}&apiKey=${apiKey}&pageSize=${params.pageSize}&page=${params.page}`;

  const res = await axios.get(url);
  const articles = res.data.articles;
  articles.map(el => {
    appendArticle(el);
  });
}
