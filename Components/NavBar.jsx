import React,{useState,useContext} from 'react'

import { CrowdFundingContext } from '@/Context/CrowdFunding';
import {Logo,Menu} from "../Components/index";

const NavBar = () => {
  const {currentAccount, connectWallet} = useContext (CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MenuList = ["White Paper", "Project", "Donation", "Members"];
  return (
    <div className ="backgroundMain ">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="relative flex items-center justify-between">
          <div className="flex item-center">
            <a href='/' aria-label='Company' title='Company' className = "inline-flex items-center mr-8">
              <Logo color="text-white"/>
              <sapn className ="ml-2 text-xl font-bold tracking-wide text-white">
                GreenTokens
              </sapn>
            </a>
            <ul className="flex items-center hidden space-x-8 lg:flex">
              {MenuList.map((el,i) => (
                <li key={i+1}>
                  <a
                    href='/'
                    aria-label='Our Product'
                    title='Our Product'
                    className = "font-medium tracking-wide text-white transition-colors duration-200 hover:text-teal-accent-400">
                      {el}
                    </a>
                </li>
              ))}
            </ul>
          </div>
          {!currentAccount && (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <button onClick={ ()=> connectWallet()}
                  className = "inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-wide transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
                  aria-label='Sign Up'
                  title='Sign Up'
                  >
                    Connect Wallet
                  </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
