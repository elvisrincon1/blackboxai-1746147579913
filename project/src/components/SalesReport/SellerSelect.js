import React, { useState } from 'react';
import sellers from '../../mock/sellers';

const SellerSelect = ({ onSelect }) => {
  const [selectedSeller, setSelectedSeller] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedSeller(value);
    onSelect(value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Vendedor</label>
      <select
        value={selectedSeller}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Seleccione un vendedor</option>
        {sellers.sort((a, b) => a.name === 'Godsplan' ? -1 : 1).map(seller => (
          <option key={seller.id} value={seller.name}>{seller.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SellerSelect;