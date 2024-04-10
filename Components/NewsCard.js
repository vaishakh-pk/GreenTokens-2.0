// components/NewsCard.jsx
import React from 'react';

const NewsCard = ({ headline, content, timestamp }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4 w-full">
      <h2 className="text-xl font-semibold mb-2">{headline}</h2>
      <p>{content}</p>
      <hr className="my-4" />
      <p className="text-gray-500">Published on: {new Date(timestamp * 1000).toLocaleDateString()}</p>
    </div>
  );
};

export default NewsCard;
