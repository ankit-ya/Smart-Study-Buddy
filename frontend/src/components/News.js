import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../News.css'; // Optional: Add custom CSS for styling

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en'); // Default language
  const [country, setCountry] = useState('us'); // Default country
  const [category, setCategory] = useState('general'); // Default category
  const [page, setPage] = useState(1); // Current page
  const [totalResults, setTotalResults] = useState(0); // Total results count

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;  
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&language=${language}&category=${category}&page=${page}&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.data.status === 'error') {
          setError(response.data.message);
        } else {
          setNews(response.data.articles);
          setTotalResults(response.data.totalResults);
        }
      } catch (error) {
        setError('Error fetching news');
      }
    };
    fetchNews();
  }, [apiUrl]); // Added apiUrl to the dependency array

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setPage(1); // Reset to first page on language change
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setPage(1); // Reset to first page on country change
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1); // Reset to first page on category change
  };

  const handleNextPage = () => {
    if (page < Math.ceil(totalResults / 20)) { // Assuming 20 articles per page
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="news-section">
      <h4>Latest News</h4>
      <div>
        <label>
          Language:
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="hi">Hindi</option>
            {/* Add more languages as needed */}
          </select>
        </label>
        <label>
          Country:
          <select value={country} onChange={handleCountryChange}>
            <option value="us">United States</option>
            <option value="gb">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="in">India</option>
            {/* Add more countries as needed */}
          </select>
        </label>
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
            {/* Add more categories as needed */}
          </select>
        </label>
      </div>
      {error && <p>{error}</p>}
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={page >= Math.ceil(totalResults / 20)}>Next</button>
      </div>
    </div>
  );
};

export default News;
