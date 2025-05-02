import React from 'react';

const SubmitButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Reportar Venta
    </button>
  );
};

export default SubmitButton;