import React, { useState } from 'react';
import providers from '../../mock/providers';

const ProviderManager = () => {
  const [providerList, setProviderList] = useState(providers);
  const [newProvider, setNewProvider] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (newProvider.trim()) {
      const newId = Math.max(...providerList.map(p => p.id), 0) + 1;
      setProviderList([...providerList, { id: newId, name: newProvider }]);
      setNewProvider('');
    }
  };

  const handleEdit = (provider) => {
    setEditingId(provider.id);
    setEditName(provider.name);
  };

  const handleUpdate = () => {
    setProviderList(providerList.map(p => 
      p.id === editingId ? { ...p, name: editName } : p
    ));
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (id) => {
    setProviderList(providerList.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newProvider}
          onChange={(e) => setNewProvider(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Nuevo proveedor"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Agregar
        </button>
      </div>

      <div className="space-y-2">
        {providerList.map(provider => (
          <div key={provider.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            {editingId === provider.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded"
                />
                <button
                  onClick={handleUpdate}
                  className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Guardar
                </button>
              </>
            ) : (
              <>
                <span>{provider.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(provider)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(provider.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderManager;