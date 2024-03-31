import React, { useState, useContext, useEffect } from 'react';
import { CrowdFundingContext } from '@/Context/CrowdFunding';
import { Logo } from '../Components/index';

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const menuItems = ["All Campaigns", "My Campaign", "About Us"];
  const sectionIds = {
    "All Campaigns": "AllCampaigns",
    "My Campaign": "UserCampaigns",
    "About Us": "aboutUsSection",
    "Hero" : "heroSection"
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [navBackground, setNavBackground] = useState('transparent');
  const [textColor, setTextColor] = useState('text-white'); // Initial text color

  const handleScroll = () => {
    const currentPosition = window.pageYOffset;
    const heroSectionHeight = document.getElementById('heroSection').offsetHeight -100;
    if (currentPosition > heroSectionHeight) {
      setNavBackground('#ffffff'); // Change background color to white after hero section
      setTextColor('text-black'); // Change text color to black after hero section
    } else {
      setNavBackground('#052e16'); // Keep background color transparent before hero section
      setTextColor('text-white'); // Keep text color white before hero section
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: navBackground }}>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex item-center">
            <a href="/" aria-label="Company" title="Company" className="inline-flex items-center mr-8">
              <Logo color={textColor} />
              <span className={`ml-2 text-xl font-bold tracking-wide ${textColor}`}>GreenTokens</span>
            </a>
            <ul className="flex items-center hidden space-x-8 lg:flex">
              {menuItems.map((menuItem, i) => (
                <li key={i + 1}>
                  <a
                    href={`#${sectionIds[menuItem]}`}
                    onClick={() => scrollToSection(sectionIds[menuItem])}
                    aria-label={menuItem}
                    title={menuItem}
                    className={`font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400 ${textColor}`}
                  >
                    {menuItem}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {!currentAccount && (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <button
                  onClick={() => connectWallet()}
                  className={`inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-wide transition duration-200 rounded shadow-md hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background text-white bg-green-600`}
                  aria-label="Sign Up"
                  title="Sign Up"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          )}
          {currentAccount && (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <button
                  onClick={() => scrollToSection(sectionIds["Hero"])}
                  className={`inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-wide transition duration-200 rounded shadow-md hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background text-white bg-green-600`}
                  aria-label="Create Campaign"
                  title="Create Campaign"
                >
                  Create Campaign
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
