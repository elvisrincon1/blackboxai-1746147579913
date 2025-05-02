import React from 'react';
import products from '../../mock/products';

const ProductSelect = ({ seller, onSelect }) => {
  const filteredProducts = seller === 'Godsplan' 
    ? products.filter(p => !p.name.startsWith('AF-'))
    : products;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Seleccione un producto</option>
        {filteredProducts.map(product => (
          <option key={product.id} value={product.name}>{product.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelect;