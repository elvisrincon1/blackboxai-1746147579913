import React, { useState } from 'react';

const PriceInput = ({ onPriceChange }) => {
  const [price, setPrice] = useState('');

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Precio de Venta</label>
      <input
        type="number"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
          onPriceChange(e.target.value);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default PriceInput;