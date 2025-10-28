import React, { useState } from 'react';
import { formatHours } from '../utils/calculations';

const ConfigPanel = ({ standardHours, standardMinutes, onUpdate }) => {
  const [hours, setHours] = useState(standardHours);
  const [minutes, setMinutes] = useState(standardMinutes);

  const handleSave = () => {
    onUpdate(hours, minutes);
  };

  return (
    <div className="mb-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Jornada Laboral Estándar</h3>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Horas</label>
          <input
            type="number"
            min="0"
            max="23"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value) || 0)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minutos</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Guardar
        </button>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Jornada actual: <span className="font-semibold">{formatHours(hours + minutes / 60)}</span>
      </p>
    </div>
  );
};

export default ConfigPanel;