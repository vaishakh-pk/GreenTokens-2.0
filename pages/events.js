import React, { useContext, useEffect, useState } from 'react';
import { CrowdFundingContext } from 'Context/CrowdFunding.js';
import AddEventsModal from '@/components/AddEventsModal';
import Link from 'next/link'; // Import Link for navigation
import { useRouter } from 'next/router'; // Import useRouter for navigation
import EventsCard from 'Components/EventCard.jsx'

const EventsPage = () => {
  const { getAllEvents, currentAccount, admin, createEvent } = useContext(CrowdFundingContext);
  const [Events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // Access the useRouter hook for navigation

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents();
        console.log('Fetched Events:', fetchedEvents);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching Events:', error);
      }
    };

    fetchEvents();
  }, [getAllEvents]);

  const handleAddEvents = () => {
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
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">GreenEvents</h1>
      {currentAccount && admin && (
        <button
          onClick={handleAddEvents}
          className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full absolute top-4 right-4"
        >
          Add Event
        </button>
      )}
      <EventsCard allEvents={Events} /> {/* Corrected variable name */}
      <AddEventsModal isOpen={isModalOpen} onClose={handleCloseModal} createEvent={createEvent} />
    </div>
  );
};

export default EventsPage;
