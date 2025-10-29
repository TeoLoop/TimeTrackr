import React from 'react';
import { Clock, Settings } from 'lucide-react';
import { toggleDarkMode } from '../utils/theme';

function Header({ onConfigClick, showConfig }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Título */}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-gray-800">
          <Clock className="text-blue-600" size={32} /> Calculadora de Horas
        </h1>
      </div>
      
      {/* Botones a la derecha */}
      <div className="flex items-center gap-2">
        {/* Botón Config */}
        <button
          onClick={onConfigClick}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-700 font-medium"
        >
        <Settings size={20} /> {showConfig ? 'Ocultar' : 'Configurar'}
        </button>
        
        {/* Botón Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          aria-label="Toggle Dark Mode"
          title="Cambiar tema"
        >
          <span id="theme-icon" style={{ fontSize: '1.25rem' }}>🌙</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
