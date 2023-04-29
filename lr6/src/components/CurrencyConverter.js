import React, { useState, useEffect } from 'react';
import {useLogger} from './myHooks';

const CurrencyConverter = ({ priceInUAH, exchangeRate }) => {
  const [currency, setCurrency] = useState('UAH');

  useLogger(currency, "currency");

  useEffect(() => {
    const handleReset = () => {
      setCurrency('UAH');
    };
    return handleReset;
  }, []);

  const handleCurrencyChange = () => {
    setCurrency(currency === 'UAH' ? 'USD' : 'UAH');
  };

  const convertCurrency = () => {
    return currency === 'UAH' ? priceInUAH : (priceInUAH / exchangeRate).toFixed(2);
  };

  return (
    <div>
      <p className='product-price'>Price: {convertCurrency()} {currency}</p>
      <button onClick={handleCurrencyChange}>
        Convert to {currency === 'UAH' ? 'USD' : 'UAH'}
      </button>
    </div>
  );
};

export default CurrencyConverter;
