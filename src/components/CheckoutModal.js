import React, { useContext, useState } from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { CartContext } from '../contexts/CartContext'; // Import CartContext
import CartItem from './CartItem'; // Import CartItem component

const CheckoutModal = ({ isOpen, onClose, onCheckoutSuccess }) => {
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    shippingAddress: '',
    billingAddress: '',
    fullName: '', // New field for full name
    city: '', // New field for city
    state: '', // New field for state
    zipCode: '', // New field for zip code
    creditCard: '', // New field for credit card
    cvv: '', // New field for CVV
    billingZipCode: '', // New field for billing zip code
  });
  const [isCheckoutSuccessful, setCheckoutSuccessful] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleCheckout = () => {
    if (
      !shippingInfo.shippingAddress ||
      !shippingInfo.billingAddress ||
      !shippingInfo.fullName ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zipCode ||
      !shippingInfo.creditCard ||
      !shippingInfo.cvv ||
      !shippingInfo.billingZipCode
    ) {
      setError('Please fill in all required fields.');
    } else {
      setError('');
      setTimeout(() => {
        setCheckoutSuccessful(true);
        onCheckoutSuccess();
        clearCart();
      }, 2000);
    }
  };

  const closeModal = () => {
    setCheckoutSuccessful(false);
    setError('');
    onClose();
  };

  return (
    <>
      {/* Checkout Modal */}
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
        <div className="bg-white w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] p-4 shadow-2xl rounded-lg relative">
          <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
            <IoMdArrowForward className="text-2xl" />
          </div>
          <div className="text-center uppercase text-sm font-semibold">
            Shopping Bag ({itemAmount})
          </div>
          {cart.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })}
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleInputChange}
              placeholder="Full Name*"
              required
            />
            <input
              type="text"
              name="shippingAddress"
              value={shippingInfo.shippingAddress}
              onChange={handleInputChange}
              placeholder="Shipping Address*"
              required
            />
            <input
              type="text"
              name="billingAddress"
              value={shippingInfo.billingAddress}
              onChange={handleInputChange}
              placeholder="Billing Address*"
              required
            />
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleInputChange}
              placeholder="City*"
              required
            />
            <input
              type="text"
              name="state"
              value={shippingInfo.state}
              onChange={handleInputChange}
              placeholder="State*"
              required
            />
            <input
              type="text"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={handleInputChange}
              placeholder="Zip Code*"
              required
            />
            <hr className="my-4 border-t border-gray-300" />
            <input
              type="text"
              name="creditCard"
              value={shippingInfo.creditCard}
              onChange={handleInputChange}
              placeholder="Credit Card (16 digits)*"
              required
            />
            <input
              type="text"
              name="cvv"
              value={shippingInfo.cvv}
              onChange={handleInputChange}
              placeholder="CVV (3 digits)*"
              required
            />
            <input
              type="text"
              name="billingZipCode"
              value={shippingInfo.billingZipCode}
              onChange={handleInputChange}
              placeholder="Billing Zip Code (6 digits)*"
              required
            />
          </div>
          <hr className="my-4 border-t border-gray-300" />
          <div className="font-semibold">
            <span>Total:</span> $ {parseFloat(total).toFixed(2)}
          </div>
          <div onClick={clearCart} className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl">
            <FiTrash2 />
          </div>
          {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
          <button onClick={handleCheckout} className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium">
            Checkout
          </button>
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
