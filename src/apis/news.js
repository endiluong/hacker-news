import axios from 'axios';
import { handleError } from './utils';

export const getNewsIdList = () => {
  const url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
  return axios.get(url)
    .then(response => ({ response }))
    .catch(handleError);
};

export const getNewsItem = (newsId) => {
  const url = `https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`;
  return axios.get(url)
    .then(response => ({ response }))
    .catch(handleError);
};