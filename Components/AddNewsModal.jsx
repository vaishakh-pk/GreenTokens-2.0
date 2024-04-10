// AddNewsModal.jsx
import React, { useState } from 'react';

const AddNewsModal = ({ isOpen, onClose, createNews }) => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Check if heading or description is empty
    if (!heading.trim() || !description.trim()) {
      setError('Both heading and description are required');
      return;
    }

    try {
      await createNews(heading, description);
      setHeading('');
      setDescription('');
      setError('');
      onClose();
    } catch (error) {
      console.error('Error creating news:', error);
      setError('Error creating news. Please try again.');
    }
  };

  if (!isOpen) return null; // Render nothing if modal is closed

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Add News</h3>
                <div className="mt-2 w-full">
                  <div>
                    <label htmlFor="heading" className="block text-sm font-medium text-gray-700">Heading:</label>
                    <input
                      type="text"
                      id="heading"
                      className="mt-1 px-3 py-2 block w-full max-w-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                      id="description"
                      className="mt-1 px-3 py-2 block w-full max-w-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewsModal;
