import { formatHours } from './calculations';

export const exportToCSV = (workdays) => {
  const headers = [
    'Fecha',
    'Entrada',
    'Salida',
    'Horas Trabajadas',
    'Horas Efectivas (-30m)',
    'Horas Extras',
    'Acumulado'
  ];
  
  const calculateAccumulated = (index) => {
    return workdays.slice(0, index + 1).reduce((acc, w) => acc + w.overtime, 0);
  };
  
  const rows = workdays.map((w, i) => [
    w.date,
    w.startTime,
    w.endTime,
    formatHours(w.workedHours),
    formatHours(w.workedHours - 0.5), // restamos 30 minutos
    formatHours(w.overtime),
    formatHours(calculateAccumulated(i))
  ]);

  const totalWorked = workdays.reduce((acc, w) => acc + w.workedHours, 0);
  const totalEffective = totalWorked - 0.5 * workdays.length;
  const totalOvertime = workdays.reduce((acc, w) => acc + w.overtime, 0);

  // Agregar fila de totales al final
  rows.push([
    'Totales',
    '',
    '',
    formatHours(totalWorked),
    formatHours(totalEffective),
    formatHours(totalOvertime),
    ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `horas_trabajadas_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};


export const exportToPDF = (workdays, standardHours, standardMinutes) => {
  const calculateAccumulated = (index) => {
    return workdays.slice(0, index + 1).reduce((acc, w) => acc + w.overtime, 0);
  };
  
  const totalWorked = workdays.reduce((acc, w) => acc + w.workedHours, 0);
  const totalEffective = totalWorked - 0.5 * workdays.length;
  const totalOvertime = workdays.reduce((acc, w) => acc + w.overtime, 0);

  const content = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
          h1 { color: #2563eb; margin-bottom: 5px; }
          p { margin: 4px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #2563eb; color: white; }
          .total { font-weight: bold; background-color: #f3f4f6; }
          .blue { color: #2563eb; font-weight: bold; }
          .green { color: #16a34a; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Registro de Horas Trabajadas</h1>
        <p>Jornada estándar: ${formatHours(standardHours + standardMinutes / 60)}</p>

        <table>
          <tr>
            <th>Fecha</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Horas Trabajadas</th>
            <th>Horas Efectivas (-30m)</th>
            <th>Horas Extras</th>
            <th>Acumulado</th>
          </tr>
          ${workdays.map((w, i) => `
            <tr>
              <td>${w.date}</td>
              <td>${w.startTime}</td>
              <td>${w.endTime}</td>
              <td>${formatHours(w.workedHours)}</td>
              <td>${formatHours(w.workedHours - 0.5)}</td>
              <td>${formatHours(w.overtime)}</td>
              <td>${formatHours(calculateAccumulated(i))}</td>
            </tr>
          `).join('')}
          <tr class="total">
            <td>Totales</td>
            <td></td>
            <td></td>
            <td class="blue">${formatHours(totalWorked)}</td>
            <td class="blue">${formatHours(totalEffective)}</td>
            <td class="green">${formatHours(totalOvertime)}</td>
            <td></td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `horas_trabajadas_${new Date().toISOString().split('T')[0]}.html`;
  a.click();
  URL.revokeObjectURL(url);
};