import React, { useState } from 'react';
import products from '../../mock/products';
import providers from '../../mock/providers';

const ProductManager = () => {
  const [productList, setProductList] = useState(products);
  const [newProduct, setNewProduct] = useState({
    name: '',
    buyPrice: '',
    sellPrice: '',
    providers: []
  });
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const handleAdd = () => {
    if (newProduct.name && newProduct.buyPrice && newProduct.sellPrice) {
      const newId = Math.max(...productList.map(p => p.id), 0) + 1;
      setProductList([...productList, {
        id: newId,
        name: newProduct.name,
        buyPrice: parseFloat(newProduct.buyPrice),
        sellPrice: parseFloat(newProduct.sellPrice),
        providers: newProduct.providers
      }]);
      setNewProduct({
        name: '',
        buyPrice: '',
        sellPrice: '',
        providers: []
      });
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditProduct({...product});
  };

  const handleUpdate = () => {
    if (!editProduct.name || !editProduct.buyPrice || !editProduct.sellPrice) {
      alert('Por favor complete todos los campos');
      return;
    }
    
    const updatedList = productList.map(p => 
      p.id === editingId ? {
        ...editProduct,
        buyPrice: parseFloat(editProduct.buyPrice),
        sellPrice: parseFloat(editProduct.sellPrice)
      } : p
    );
    
    setProductList(updatedList);
    setEditingId(null);
    setEditProduct(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este producto?');
    if (confirmDelete) {
      setProductList(productList.filter(p => p.id !== id));
    }
  };

  const toggleProvider = (providerId, isEdit = false) => {
    if (isEdit) {
      const newProviders = editProduct.providers.includes(providerId)
        ? editProduct.providers.filter(id => id !== providerId)
        : [...editProduct.providers, providerId];
      setEditProduct({...editProduct, providers: newProviders});
    } else {
      const newProviders = newProduct.providers.includes(providerId)
        ? newProduct.providers.filter(id => id !== providerId)
        : [...newProduct.providers, providerId];
      setNewProduct({...newProduct, providers: newProviders});
    }
  };

  const calculateProfit = (product) => {
    return product.sellPrice - product.buyPrice;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-3">Agregar Nuevo Producto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Nombre del producto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio Compra</label>
            <input
              type="number"
              value={newProduct.buyPrice}
              onChange={(e) => setNewProduct({...newProduct, buyPrice: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Precio de compra"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio Venta</label>
            <input
              type="number"
              value={newProduct.sellPrice}
              onChange={(e) => setNewProduct({...newProduct, sellPrice: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Precio de venta"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proveedores</label>
            <div className="flex flex-wrap gap-2">
              {providers.map(provider => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => toggleProvider(provider.id)}
                  className={`px-3 py-1 text-sm rounded-full ${newProduct.providers.includes(provider.id) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Agregar Producto
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compra</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedores</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productList.map((product) => (
              <tr key={product.id}>
                {editingId === product.id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={editProduct.name}
                        onChange={(e) => setEditProduct({...editProduct, name: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editProduct.buyPrice}
                        onChange={(e) => setEditProduct({...editProduct, buyPrice: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editProduct.sellPrice}
                        onChange={(e) => setEditProduct({...editProduct, sellPrice: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${(editProduct.sellPrice - editProduct.buyPrice).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {providers.map(provider => (
                          <button
                            key={provider.id}
                            type="button"
                            onClick={() => toggleProvider(provider.id, true)}
                            className={`px-2 py-0.5 text-xs rounded-full ${editProduct.providers.includes(provider.id) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                          >
                            {provider.name}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded"
                      >
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.buyPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.sellPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`${calculateProfit(product) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${calculateProfit(product).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.providers.map(id => 
                        providers.find(p => p.id === id)?.name
                      ).join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;

// DONE