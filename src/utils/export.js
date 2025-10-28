import { formatHours } from './calculations';

export const exportToCSV = (workdays) => {
  const headers = ['Fecha', 'Entrada', 'Salida', 'Horas Trabajadas', 'Horas Extras', 'Acumulado'];
  
  const calculateAccumulated = (index) => {
    return workdays.slice(0, index + 1).reduce((acc, w) => acc + w.overtime, 0);
  };
  
  const rows = workdays.map((w, i) => [
    w.date,
    w.startTime,
    w.endTime,
    formatHours(w.workedHours),
    formatHours(w.overtime),
    formatHours(calculateAccumulated(i))
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
  
  const totalOvertime = workdays.reduce((acc, w) => acc + w.overtime, 0);

  const content = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #2563eb; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #2563eb; color: white; }
          .total { font-weight: bold; background-color: #f3f4f6; }
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
            <th>Horas Extras</th>
            <th>Acumulado</th>
          </tr>
          ${workdays.map((w, i) => `
            <tr>
              <td>${w.date}</td>
              <td>${w.startTime}</td>
              <td>${w.endTime}</td>
              <td>${formatHours(w.workedHours)}</td>
              <td>${formatHours(w.overtime)}</td>
              <td>${formatHours(calculateAccumulated(i))}</td>
            </tr>
          `).join('')}
          <tr class="total">
            <td colspan="4">Total Horas Extras</td>
            <td colspan="2">${formatHours(totalOvertime)}</td>
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