import React from 'react';

const Card = ({ allCampaign, setOpenModel, setDonate, title, ID }) => {

    const daysLeft = (deadline) => {
        const difference = new Date(deadline).getTime() - Date.now();
        const remainingDays = difference / (1000 * 3600 * 24);
        return remainingDays.toFixed(0);
    };

    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20' id={ID}>
            <p className='py-16 text-2xl font-bold leading-5'>{title}</p>
            <div className='sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-5'> {/* Grid container */}
                {allCampaign?.map((campaign, i) => {
                    if (ID === 'AllCampaigns' && daysLeft(campaign.deadline) < 0) {
                        return null; // Skip rendering if days left is negative
                    }
                    return (
                        <div
                            key={i + 1}
                            className="cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded"
                            onClick={() => (setDonate(campaign), setOpenModel(true))}
                        >
                            <img
                                src="https://images.pexels.com/photos/1643402/pexels-photo-1643402.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                                className='object-cover w-full h-64 rounded'
                                alt=''
                            />

                            <div className='py-5 pl-2'>

                                <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
                                    Days Left: {daysLeft(campaign.deadline)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {campaign.reportsCount > 0 && (
                                        <span className="bg-red-500 rounded px-2 ml-2 text-white">
                                            Reported: {campaign.reportsCount}
                                        </span>
                                    )}
                                </p>


                                <a
                                    aria-label='Article'
                                    className='inline-block mb-3 text-black transition-colors duration-200 
                                    hover:text-deep-purple-accent-700'
                                >
                                    <p className='text-2xl font-bold leading-5'>{campaign.title}</p>
                                </a>
                                <p className='mb-4 text-gray-700'>{campaign.description}</p>
                                <div className='flex space-x-4'>
                                    <p className='font-semibold'>Target: {campaign.target} ETH</p>
                                    <p className='font-semibold'>
                                        Raised: {campaign.amountCollected} ETH
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Card;
