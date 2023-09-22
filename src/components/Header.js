import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import { BsBag } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg';
import LoginPopup from './LoginPopup'; // Import the LoginPopup component
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to control the login pop-up
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <header
      className={`${
        isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'
      } fixed w-full z-10 transition-all`}
    >
      <div className='container mx-auto flex items-center justify-between h-full'>
        <Link to={'/'}>
          <div>
            <img className='w-[40px]' src={Logo} alt='' />
          </div>
        </Link>
        <div className='flex items-center'>
          {/* Cart */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className='cursor-pointer flex relative mr-4'
          >
            <BsBag className='text-2xl' />
            <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>
              {itemAmount}
            </div>
          </div>
          {/* Profile */}
          <div className='cursor-pointer' onClick={toggleLoginPopup}>
            <CgProfile className='text-2xl' />
          </div>
          {/* Display the login pop-up if showLoginPopup is true */}
          {showLoginPopup && <LoginPopup onClose={toggleLoginPopup} />}
          {/* Display the user's name or "Login" based on the login status */}
          {user ? (
            <div>Welcome, johnd</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
