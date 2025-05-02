import React, { useState } from 'react';
import sellers from '../../mock/sellers';

const AffiliateManager = () => {
  const [affiliateList, setAffiliateList] = useState(sellers.filter(s => s.name !== 'Godsplan'));
  const [newAffiliate, setNewAffiliate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (newAffiliate.trim()) {
      const newId = Math.max(...affiliateList.map(a => a.id), 0) + 1;
      setAffiliateList([...affiliateList, { id: newId, name: newAffiliate }]);
      setNewAffiliate('');
    }
  };

  const handleEdit = (affiliate) => {
    setEditingId(affiliate.id);
    setEditName(affiliate.name);
  };

  const handleUpdate = () => {
    setAffiliateList(affiliateList.map(a => 
      a.id === editingId ? { ...a, name: editName } : a
    ));
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (id) => {
    setAffiliateList(affiliateList.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newAffiliate}
          onChange={(e) => setNewAffiliate(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Nuevo afiliado"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Agregar
        </button>
      </div>

      <div className="space-y-2">
        {affiliateList.map(affiliate => (
          <div key={affiliate.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            {editingId === affiliate.id ? (
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
                <span>{affiliate.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(affiliate)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(affiliate.id)}
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

export default AffiliateManager;