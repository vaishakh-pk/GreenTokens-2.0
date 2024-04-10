import React from 'react';

const Card = ({ allEvents }) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp.toNumber() * 1000); // Convert BigNumber to number and milliseconds
        return date.toDateString(); // Format the date as desired
    };

    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20' id='events'>
            <p className='py-16 text-2xl font-bold leading-5'>All Events</p>
            <div className='sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-5'> {/* Grid container */}
                {allEvents?.map((event, i) => (
                    <div
                        key={i + 1}
                        className="cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded"
                    >
                        <img
                            src="https://images.pexels.com/photos/1423600/pexels-photo-1423600.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                            className='object-cover w-full h-64 rounded'
                            alt=''
                        />
                        <div className='py-5 pl-2'>
                            <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
                                Date: {formatDate(event.date)}
                            </p>
                            <a
                                href='/'
                                aria-label='Article'
                                className='inline-block mb-3 text-black transition-colors duration-200 
                                hover:text-deep-purple-accent-700'
                            >
                                <p className='text-2xl font-bold leading-5'>{event.title}</p>
                            </a>
                            <p className='mb-4 text-gray-700'>{event.content}</p>
                            <div className='flex space-x-4'>
                                <p className='font-semibold'>Location: {event.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
