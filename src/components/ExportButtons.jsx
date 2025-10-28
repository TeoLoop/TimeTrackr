import React from 'react';
import { Download } from 'lucide-react';
import { exportToCSV, exportToPDF } from '../utils/export';

const ExportButtons = ({ workdays, standardHours, standardMinutes }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <button
        onClick={() => exportToCSV(workdays)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
      >
        <Download size={20} />
        Exportar CSV
      </button>
      <button
        onClick={() => exportToPDF(workdays, standardHours, standardMinutes)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
      >
        <Download size={20} />
        Exportar HTML/PDF
      </button>
    </div>
  );
};

export default ExportButtons;