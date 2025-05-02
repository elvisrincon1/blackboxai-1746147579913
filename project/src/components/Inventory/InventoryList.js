import React from 'react';
import products from '../../mock/products';
import providers from '../../mock/providers';

const InventoryList = () => {
  const getProviderNames = (providerIds) => {
    return providerIds.map(id => 
      providers.find(p => p.id === id)?.name || 'Desconocido'
    ).join(', ');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Compra</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Venta</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedores</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.buyPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.sellPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getProviderNames(product.providers)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;