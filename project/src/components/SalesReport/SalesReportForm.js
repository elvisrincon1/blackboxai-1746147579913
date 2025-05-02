import React, { useState } from 'react';
import SellerSearch from './SellerSearch';
import ProductSearch from './ProductSearch';
import DatePicker from './DatePicker';
import SubmitButton from './SubmitButton';

const SalesReportForm = () => {
  const [saleData, setSaleData] = useState({
    seller: '',
    product: null,
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = () => {
    if (!saleData.seller || !saleData.product) {
      alert('Por favor complete todos los campos');
      return;
    }
    console.log('Venta reportada:', saleData);
    alert(`Venta reportada: ${saleData.product.name} por ${saleData.seller}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Reporte de Ventas</h2>
      <SellerSearch onSelect={(seller) => setSaleData({...saleData, seller})} />
      <ProductSearch 
        seller={saleData.seller} 
        onSelect={(product) => setSaleData({...saleData, product})} 
      />
      {saleData.product && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Precio de venta:</span> ${saleData.product.sellPrice}
          </p>
        </div>
      )}
      <DatePicker onDateChange={(date) => setSaleData({...saleData, date})} />
      <SubmitButton onClick={handleSubmit} />
    </div>
  );
};

export default SalesReportForm;