import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const WorkdayForm = ({ onAdd }) => {
  const getToday = () => new Date().toISOString().split('T')[0];
  
  const [date, setDate] = useState(getToday());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = () => {
    if (!date || !startTime || !endTime) {
      alert('Por favor completa todos los campos');
      return;
    }

    onAdd(date, startTime, endTime);
    
    setDate(getToday());
    setStartTime('');
    setEndTime('');
  };

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Plus size={20} />
        Agregar Jornada
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Entrada</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salida</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkdayForm;