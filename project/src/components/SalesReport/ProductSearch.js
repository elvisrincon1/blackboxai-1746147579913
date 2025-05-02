import React, { useState, useEffect } from 'react';
import products from '../../mock/products';

const ProductSearch = ({ seller, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      let filtered = products;
      if (seller === 'Godsplan') {
        filtered = filtered.filter(p => !p.name.startsWith('AF-'));
      }
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, seller]);

  const handleSelect = (product) => {
    setSearchTerm(product.name);
    onSelect(product);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Buscar producto..."
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
          {suggestions.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelect(product)}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
            >
              {product.name} - ${product.sellPrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;