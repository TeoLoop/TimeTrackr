import React from 'react';
import { Clock, Settings } from 'lucide-react';

const Header = ({ onConfigClick }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Clock className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Registro de Horas</h1>
      </div>
      <button
        onClick={onConfigClick}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
      >
        <Settings size={20} />
        <span className="hidden md:inline">Configuración</span>
      </button>
    </div>
  );
};

export default Header;
