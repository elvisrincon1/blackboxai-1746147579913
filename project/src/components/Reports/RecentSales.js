import React from 'react';

const RecentSales = () => {
  // Datos de ejemplo - en una app real estos vendrían de una API
  const recentSales = [
    { id: 1, seller: 'Godsplan', product: 'Laptop', price: 1200, date: '2023-05-15', buyPrice: 800 },
    { id: 2, seller: 'Juan Perez', product: 'AF-Phone', price: 600, date: '2023-05-14', buyPrice: 400 },
    { id: 3, seller: 'Maria Garcia', product: 'Monitor', price: 300, date: '2023-05-13', buyPrice: 200 },
    { id: 4, seller: 'Carlos Lopez', product: 'AF-Headphones', price: 150, date: '2023-05-12', buyPrice: 80 },
    { id: 5, seller: 'Godsplan', product: 'Tablet', price: 450, date: '2023-05-11', buyPrice: 300 }
  ];

  const calculateProfit = (sale) => {
    return sale.price - sale.buyPrice;
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Ventas Recientes (Últimos 30 días)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Compra</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Venta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilidad</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentSales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.seller}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${sale.buyPrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${sale.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`${calculateProfit(sale) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${calculateProfit(sale).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSales;