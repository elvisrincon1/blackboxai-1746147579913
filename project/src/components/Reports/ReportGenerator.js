import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import sellers from '../../mock/sellers';
import sales from '../../mock/products'; // Assuming sales data is in products or create mock sales data

const ReportGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Mock sales data structure for demonstration (replace with real sales data if available)
  // Each sale should have: id, sellerId, productName, buyPrice, sellPrice, date
  // For now, we will create a mock sales array combining sellers and products with random dates
  const mockSales = [
    // Example data
    { id: 1, sellerId: 1, productName: 'Producto A', buyPrice: 10, sellPrice: 15, date: '2023-06-01' },
    { id: 2, sellerId: 2, productName: 'Producto B', buyPrice: 20, sellPrice: 30, date: '2023-06-05' },
    { id: 3, sellerId: 1, productName: 'Producto C', buyPrice: 5, sellPrice: 8, date: '2023-06-10' },
    { id: 4, sellerId: 3, productName: 'Producto D', buyPrice: 12, sellPrice: 18, date: '2023-06-15' },
    // Add more as needed
  ];

  const filterSalesByDate = (salesData, start, end) => {
    const startD = new Date(start);
    const endD = new Date(end);
    return salesData.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= startD && saleDate <= endD;
    });
  };

  const groupSalesBySeller = (salesData) => {
    const grouped = {};
    salesData.forEach(sale => {
      if (!grouped[sale.sellerId]) {
        const seller = sellers.find(s => s.id === sale.sellerId);
        grouped[sale.sellerId] = {
          sellerName: seller ? seller.name : 'Desconocido',
          sales: [],
          totalBuyPrice: 0,
          totalSellPrice: 0,
          totalProfit: 0,
        };
      }
      grouped[sale.sellerId].sales.push(sale);
      grouped[sale.sellerId].totalBuyPrice += sale.buyPrice;
      grouped[sale.sellerId].totalSellPrice += sale.sellPrice;
      grouped[sale.sellerId].totalProfit += (sale.sellPrice - sale.buyPrice);
    });
    return grouped;
  };

  const generateReport = () => {
    if (!startDate || !endDate) {
      alert('Por favor selecciona un rango de fechas válido.');
      return;
    }

    const filteredSales = filterSalesByDate(mockSales, startDate, endDate);
    const groupedSales = groupSalesBySeller(filteredSales);

    const doc = new jsPDF('landscape');
    doc.setFontSize(18);
    doc.text('Reporte de Ventas por Vendedor', 14, 22);
    doc.setFontSize(12);
    doc.text(`Período: ${startDate} - ${endDate}`, 14, 30);

    let finalY = 40;
    let grandTotalBuy = 0;
    let grandTotalSell = 0;
    let grandTotalProfit = 0;

    Object.values(groupedSales).forEach(group => {
      doc.setFontSize(14);
      doc.text(`Vendedor: ${group.sellerName}`, 14, finalY);
      finalY += 6;

      const tableColumn = ['Producto', 'Precio Compra', 'Precio Venta', 'Utilidad'];
      const tableRows = [];

      group.sales.forEach(sale => {
        const profit = sale.sellPrice - sale.buyPrice;
        tableRows.push([
          sale.productName,
          `$${sale.buyPrice.toFixed(2)}`,
          `$${sale.sellPrice.toFixed(2)}`,
          `$${profit.toFixed(2)}`
        ]);
      });

      // Add totals row
      tableRows.push([
        'Total',
        `$${group.totalBuyPrice.toFixed(2)}`,
        `$${group.totalSellPrice.toFixed(2)}`,
        `$${group.totalProfit.toFixed(2)}`
      ]);

      grandTotalBuy += group.totalBuyPrice;
      grandTotalSell += group.totalSellPrice;
      grandTotalProfit += group.totalProfit;

      doc.autoTable({
        startY: finalY,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });

      finalY = doc.lastAutoTable.finalY + 10;
    });

    // Grand totals
    doc.setFontSize(14);
    doc.text('Totales Generales:', 14, finalY);
    doc.autoTable({
      startY: finalY + 6,
      head: [['Total Compra', 'Total Venta', 'Total Utilidad']],
      body: [[
        `$${grandTotalBuy.toFixed(2)}`,
        `$${grandTotalSell.toFixed(2)}`,
        `$${grandTotalProfit.toFixed(2)}`
      ]],
      theme: 'grid',
      headStyles: { fillColor: [39, 174, 96] },
      styles: { fontSize: 12, halign: 'center' },
      margin: { left: 14, right: 14 },
    });

    doc.save(`Reporte_Ventas_${startDate}_a_${endDate}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Generar Informe Personalizado</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={generateReport}
              disabled={!startDate || !endDate}
              className={`w-full py-2 px-4 rounded-md ${!startDate || !endDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
            >
              Generar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
