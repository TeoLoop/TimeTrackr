import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatHours } from '../utils/calculations';

const WorkdayTable = ({ workdays, onDelete }) => {
  const calculateAccumulated = (index) => {
    return workdays.slice(0, index + 1).reduce((acc, w) => acc + w.overtime, 0);
  };

  const totalOvertime = workdays.reduce((acc, w) => acc + w.overtime, 0);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Fecha</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Entrada</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Salida</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Horas Trabajadas</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Horas Extras</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Acumulado</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">Acción</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workdays.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                No hay registros. Agrega tu primera jornada laboral.
              </td>
            </tr>
          ) : (
            workdays.map((w, i) => (
              <tr key={w.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm">{w.date}</td>
                <td className="px-4 py-3 text-sm">{w.startTime}</td>
                <td className="px-4 py-3 text-sm">{w.endTime}</td>
                <td className="px-4 py-3 text-sm font-medium">{formatHours(w.workedHours)}</td>
                <td className={`px-4 py-3 text-sm font-semibold ${w.overtime >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {w.overtime >= 0 ? '+' : ''}{formatHours(w.overtime)}
                </td>
                <td className={`px-4 py-3 text-sm font-bold ${calculateAccumulated(i) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {calculateAccumulated(i) >= 0 ? '+' : ''}{formatHours(calculateAccumulated(i))}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onDelete(w.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        {workdays.length > 0 && (
          <tfoot className="bg-gray-100 font-bold">
            <tr>
              <td colSpan="4" className="px-4 py-3 text-sm text-right">Total Horas Extras:</td>
              <td colSpan="3" className={`px-4 py-3 text-sm ${totalOvertime >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {totalOvertime >= 0 ? '+' : ''}{formatHours(totalOvertime)}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default WorkdayTable;