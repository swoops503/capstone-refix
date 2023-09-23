import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { SidebarContext } from '../contexts/SidebarContext'; 
import { CartContext } from '../contexts/CartContext'; 
import CartItem from './CartItem'; 
import CheckoutModal from './CheckoutModal';


const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext); // for opening closing sidebar
  const { cart, clearCart, total, itemAmount } = useContext(CartContext); // cart useState
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false); //popup for checkout
  const [isCheckoutSuccessful, setCheckoutSuccessful] = useState(false); //popup for checkout success

  const openCheckoutModal = () => {
    setCheckoutModalOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setCheckoutModalOpen(false);
    setCheckoutSuccessful(true);
  };

  return (
    <div
      className={`${
        isOpen ? 'right-0' : '-right-full'
      }  w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className='cursor-pointer w-8 h-8 flex justify-center items-center'
        >
          <IoMdArrowForward className='text-2xl' />
        </div>
      </div>
      <div className='flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b'>
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className='flex flex-col gap-y-3 py-4 mt-4'>
        <div className='flex w-full justify-between items-center'>
          <div className='uppercase font-semibold'>
            <span className='mr-2'>Total:</span>$ {parseFloat(total).toFixed(2)}
          </div>
          <div
            onClick={clearCart}
            className='cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to='/'
          className='bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium'
        >
          View cart
        </Link>
        <button
          onClick={openCheckoutModal} // Open the CheckoutModal when this button is clicked
          className='bg-primary flex p-4 justify-center items-center text-white w-full font-medium'
        >
          Checkout
        </button>
      </div>

      {/* Render the CheckoutModal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Render the success message */}
      {isCheckoutSuccessful && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
          <div className='bg-white w-[50%] p-4 shadow-2xl rounded-lg'>
            <p className='text-green-500 text-lg font-semibold text-center'>
              Order Successful!
            </p>
            <p className='text-center mt-4'>
              An email confirmation will be sent shortly.
            </p>
            <button
              onClick={() => setCheckoutSuccessful(false)}
              className='bg-primary flex p-4 justify-center items-center text-white w-full font-medium mt-4'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
