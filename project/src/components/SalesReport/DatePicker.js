import React, { useState } from 'react';

const DatePicker = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          onDateChange(e.target.value);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default DatePicker;