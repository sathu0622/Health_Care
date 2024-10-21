import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorHeader from '../header/DoctorHeader';


const ViewArticles = () => {
  const [articles, setArticles] = useState([]);

  // Fetch articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/viewArticles'); // Replace with your actual API URL
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
    <DoctorHeader/>
   
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-10">Articles</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div key={article._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={article.imageURL}
              alt={article.title}
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-700">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ViewArticles;
