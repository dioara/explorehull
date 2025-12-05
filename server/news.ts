import axios from 'axios';

const NEWS_API_KEY = 'dd299bf1f5ce43f78842ff35e7a98262';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

/**
 * Fetch latest news about Hull from NewsAPI
 * @param limit Number of articles to fetch (default: 10)
 * @returns Array of news articles
 */
export async function getHullNews(limit: number = 10): Promise<NewsArticle[]> {
  try {
    const response = await axios.get<NewsResponse>(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: 'Hull UK OR "Kingston upon Hull"',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: limit,
        apiKey: NEWS_API_KEY,
      },
    });

    if (response.data.status === 'ok') {
      return response.data.articles;
    }

    console.warn('[News API] Unexpected status:', response.data.status);
    return [];
  } catch (error) {
    console.error('[News API] Failed to fetch Hull news:', error);
    return [];
  }
}

/**
 * Fetch top UK headlines (fallback if Hull-specific news is limited)
 * @param limit Number of articles to fetch (default: 10)
 * @returns Array of news articles
 */
export async function getUKTopHeadlines(limit: number = 10): Promise<NewsArticle[]> {
  try {
    const response = await axios.get<NewsResponse>(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        country: 'gb',
        pageSize: limit,
        apiKey: NEWS_API_KEY,
      },
    });

    if (response.data.status === 'ok') {
      return response.data.articles;
    }

    console.warn('[News API] Unexpected status:', response.data.status);
    return [];
  } catch (error) {
    console.error('[News API] Failed to fetch UK headlines:', error);
    return [];
  }
}
