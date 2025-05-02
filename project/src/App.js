import React, { useState } from 'react';
import SalesReportForm from './components/SalesReport/SalesReportForm';
import InventoryList from './components/Inventory/InventoryList';
import ProviderManager from './components/Providers/ProviderManager';
import AffiliateManager from './components/Affiliates/AffiliateManager';
import ReportGenerator from './components/Reports/ReportGenerator';

const App = () => {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">SalesMaster</h1>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8" role="tablist" aria-label="Main navigation">
                <button
                  onClick={() => setActiveTab('sales')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                    activeTab === 'sales'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  role="tab"
                  aria-selected={activeTab === 'sales'}
                  aria-controls="sales-panel"
                  id="sales-tab"
                >
                  <i className="fas fa-chart-line mr-2"></i>
                  Ventas
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                    activeTab === 'inventory'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  role="tab"
                  aria-selected={activeTab === 'inventory'}
                  aria-controls="inventory-panel"
                  id="inventory-tab"
                >
                  <i className="fas fa-boxes mr-2"></i>
                  Inventario
                </button>
                <button
                  onClick={() => setActiveTab('providers')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                    activeTab === 'providers'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  role="tab"
                  aria-selected={activeTab === 'providers'}
                  aria-controls="providers-panel"
                  id="providers-tab"
                >
                  <i className="fas fa-truck mr-2"></i>
                  Proveedores
                </button>
                <button
                  onClick={() => setActiveTab('affiliates')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                    activeTab === 'affiliates'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  role="tab"
                  aria-selected={activeTab === 'affiliates'}
                  aria-controls="affiliates-panel"
                  id="affiliates-tab"
                >
                  <i className="fas fa-users mr-2"></i>
                  Afiliados
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                    activeTab === 'reports'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  role="tab"
                  aria-selected={activeTab === 'reports'}
                  aria-controls="reports-panel"
                  id="reports-tab"
                >
                  <i className="fas fa-file-alt mr-2"></i>
                  Informes
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'sales' && <SalesReportForm id="sales-panel" aria-labelledby="sales-tab" />}
        {activeTab === 'inventory' && <InventoryList id="inventory-panel" aria-labelledby="inventory-tab" />}
        {activeTab === 'providers' && <ProviderManager id="providers-panel" aria-labelledby="providers-tab" />}
        {activeTab === 'affiliates' && <AffiliateManager id="affiliates-panel" aria-labelledby="affiliates-tab" />}
        {activeTab === 'reports' && <ReportGenerator id="reports-panel" aria-labelledby="reports-tab" />}
      </div>
    </div>
  );
};

export default App;
