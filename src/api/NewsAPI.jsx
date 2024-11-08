// NewsAPI.js
import axios from 'axios';

const API_KEY = '4c06d98b8110491e9d0a651befb46430'; // Replace with your News API key

export const fetchCarbonFootprintNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: 'carbon footprint OR carbon reduction',
        apiKey: API_KEY,
        language: 'en',
        sortBy: 'relevancy',
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
