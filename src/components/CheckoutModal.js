import React, { useContext, useState } from 'react'
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { CartContext } from '../contexts/CartContext'; // Import CartContext
import CartItem from './CartItem'; // Import CartItem component


const CheckoutModal = ({ isOpen, onClose, onCheckoutSuccess }) => {
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    shippingAddress: '',
    billingAddress: '',
    // Add more fields as needed
  });
  const [isCheckoutSuccessful, setCheckoutSuccessful] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleCheckout = () => {
    setTimeout(() => {
      setCheckoutSuccessful(true);
      clearCart();
    }, 2000); 
  };

  const closeModal = () => {
    setCheckoutSuccessful(false);
    onClose();
  };

  return (
    <>
      {/* Checkout Modal */}
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
        <div className="bg-white w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] p-4 shadow-2xl rounded-lg">
          <div className="text-center uppercase text-sm font-semibold">
            Shopping Bag ({itemAmount})
          </div>
          {cart.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })}
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              name="shippingAddress"
              value={shippingInfo.shippingAddress}
              onChange={handleInputChange}
              placeholder="Shipping Address"
            />
            <input
              type="text"
              name="billingAddress"
              value={shippingInfo.billingAddress}
              onChange={handleInputChange}
              placeholder="Billing Address"
            />
            {/* Add more input fields for shipping and billing info */}
          </div>
          <div className="font-semibold">
            <span>Total:</span> $ {parseFloat(total).toFixed(2)}
          </div>
          <div onClick={clearCart} className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl">
            <FiTrash2 />
          </div>
          <button onClick={handleCheckout} className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium">
            Checkout
          </button>
          <div onClick={onClose} className="absolute top-2 right-2 cursor-pointer">
            <IoMdArrowForward className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Success Message Modal */}
      {isCheckoutSuccessful && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white w-[50%] p-4 shadow-2xl rounded-lg">
            <p className="text-green-500 text-lg font-semibold text-center">Order Successful!</p>
            <p className="text-center mt-4">An email confirmation will be sent shortly.</p>
            <button onClick={closeModal} className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutModal;