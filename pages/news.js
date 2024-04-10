import React, { useContext, useEffect, useState } from 'react';
import { CrowdFundingContext } from 'Context/CrowdFunding.js';
import AddNewsModal from '@/components/AddNewsModal';
import Link from 'next/link'; // Import Link for navigation
import { useRouter } from 'next/router'; // Import useRouter for navigation

const NewsPage = () => {
  const { getAllNews, currentAccount, admin, createNews } = useContext(CrowdFundingContext);
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // Access the useRouter hook for navigation

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedNews = await getAllNews();
        console.log('Fetched News:', fetchedNews);
        setNews(fetchedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [getAllNews]);

  const handleAddNews = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="min-h-screen bg-white-800 py-8 px-4">
      <Link href="/">
        <button className="absolute top-4 left-4 rounded-full bg-green-800 text-white px-5 py-3">
          {/* Back button */}
          Back
        </button>
      </Link>
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">GreenNews</h1>
      {currentAccount && admin && (
        <button
          onClick={handleAddNews}
          className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full absolute top-4 right-4"
        >
          Add News
        </button>
      )}
      {news.map((item) => (
        <div key={item.id} className="bg-green-50 p-4 rounded-md shadow-md mb-4 w-full">
          <h2 className="text-xl font-semibold mb-2">{item.headline}</h2>
          <p>{item.content}</p>
          <hr className="my-4" />
          <p className="text-gray-500">Published on: {new Date(item.timestamp * 1000).toLocaleDateString()}</p>
        </div>
      ))}
      <AddNewsModal isOpen={isModalOpen} onClose={handleCloseModal} createNews={createNews} />
    </div>
  );
};

export default NewsPage;
