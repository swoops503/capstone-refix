import React, { useContext, useState } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Hero';

const Home = () => {
  const { products } = useContext(ProductContext);

  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products
    .filter((product) => {
      return selectedCategory === 'All' || product.category === selectedCategory;
    })
    .filter((product) => {
      return !minPrice || parseFloat(product.price) >= parseFloat(minPrice);
    })
    .filter((product) => {
      return !maxPrice || parseFloat(product.price) <= parseFloat(maxPrice);
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceLowToHigh':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'priceHighToLow':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  return (
    <div>
      <Hero />
      <section className='py-16'>
        <div className='container mx-auto'>
          <div className='mb-4 flex justify-between items-center space-x-4'>
            <div className='flex space-x-2 items-center'>
              <label htmlFor='sortBy'>Sort by:</label>
              <select
                id='sortBy'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value='default'>Default</option>
                <option value='priceLowToHigh'>Price: Low to High</option>
                <option value='priceHighToLow'>Price: High to Low</option>
                <option value='category'>Category</option>
              </select>
            </div>
            <div className='flex space-x-2 items-center'>
              <label htmlFor='minPrice'>Min Price:</label>
              <input
                type='number'
                id='minPrice'
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className='w-16 px-2 py-1 border rounded'
              />
            </div>
            <div className='flex space-x-2 items-center'>
              <label htmlFor='maxPrice'>Max Price:</label>
              <input
                type='number'
                id='maxPrice'
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className='w-16 px-2 py-1 border rounded'
              />
            </div>
            <div className='flex space-x-2 items-center'>
              <label htmlFor='category'>Category:</label>
              <select
                id='category'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value='All'>All</option>
                <option value='jewelery'>Jewelry</option>
                <option value='electronics'>Electronics</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {sortedProducts.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
