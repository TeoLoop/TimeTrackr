import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ConfigPanel from './components/ConfigPanel';
import WorkdayForm from './components/WorkdayForm';
import FilterBar from './components/FilterBar';
import ExportButtons from './components/ExportButtons';
import WorkdayTable from './components/WorkdayTable';
import { loadFromStorage, saveToStorage } from './utils/storage';
import { calculateHours } from './utils/calculations';
import { loadTheme } from './utils/theme';


const App = () => {
  useEffect(() => {
    loadTheme();
  }, []);

  const [workdays, setWorkdays] = useState([]);
  const [standardHours, setStandardHours] = useState(8);
  const [standardMinutes, setStandardMinutes] = useState(30);
  const [showConfig, setShowConfig] = useState(false);

  // 🔹 Filtro por defecto: solo el mes actual
  const today = new Date().toISOString().split('T')[0];
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  const firstDay = firstDayOfMonth.toISOString().split('T')[0];

  const [filterStartDate, setFilterStartDate] = useState(firstDay);
  const [filterEndDate, setFilterEndDate] = useState(today);

  // 🔹 Cargar datos al iniciar
  useEffect(() => {
    const loadData = async () => {
      const workdaysData = await loadFromStorage('workdays');
      const configData = await loadFromStorage('config');
      
      if (workdaysData) setWorkdays(workdaysData);
      if (configData) {
        setStandardHours(configData.hours);
        setStandardMinutes(configData.minutes);
      }
    };
    loadData();
  }, []);

  // 🔹 Agregar una jornada
 const addWorkday = async (date, startTime, endTime) => {
  const workedHours = calculateHours(startTime, endTime);
  const standardTotal = standardHours + standardMinutes / 60;
  const overtime = workedHours - standardTotal;

  const newWorkday = {
    id: Date.now(),
    date,
    startTime,
    endTime,
    workedHours,
    overtime
  };

  const newWorkdays = [...workdays, newWorkday].sort((a, b) => new Date(a.date) - new Date(b.date));
  setWorkdays(newWorkdays);

  await saveToStorage('workdays', newWorkdays);
};


  // 🔹 Eliminar jornada
  const deleteWorkdayHandler = async (id) => {
    const newWorkdays = workdays.filter(w => w.id !== id);
    setWorkdays(newWorkdays);

    // 🔹 Actualizar backend
    await saveToStorage('workdays', newWorkdays);
  };

  // 🔹 Actualizar horas estándar
  const updateStandardHours = async (hours, minutes) => {
    setStandardHours(hours);
    setStandardMinutes(minutes);

    await saveToStorage('config', { hours, minutes });

    const newWorkdays = workdays.map(w => ({
      ...w,
      overtime: w.workedHours - (hours + minutes / 60)
    }));

    setWorkdays(newWorkdays);
    await saveToStorage('workdays', newWorkdays);
    setShowConfig(false);
  };

  // 🔹 Filtrar jornadas
  const getFilteredWorkdays = () => {
    if (!filterStartDate && !filterEndDate) return workdays;

    return workdays.filter(w => {
      const workDate = new Date(w.date);
      const start = filterStartDate ? new Date(filterStartDate) : null;
      const end = filterEndDate ? new Date(filterEndDate) : null;
      if (start && workDate < start) return false;
      if (end && workDate > end) return false;
      return true;
    });
  };

  const filteredWorkdays = getFilteredWorkdays();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <Header onConfigClick={() => setShowConfig(!showConfig)} />

          {showConfig && (
            <ConfigPanel
              standardHours={standardHours}
              standardMinutes={standardMinutes}
              onUpdate={updateStandardHours}
            />
          )}

          <WorkdayForm onAdd={addWorkday} />

          <FilterBar
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onStartDateChange={setFilterStartDate}
            onEndDateChange={setFilterEndDate}
            onClearFilters={() => {
              setFilterStartDate(firstDay);
              setFilterEndDate(today);
            }}
          />

          <ExportButtons
            workdays={filteredWorkdays}
            standardHours={standardHours}
            standardMinutes={standardMinutes}
          />

          <WorkdayTable
            workdays={filteredWorkdays}
            onDelete={deleteWorkdayHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
