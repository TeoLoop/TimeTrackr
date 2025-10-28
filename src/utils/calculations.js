export const calculateHours = (start, end) => {
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);

  let totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);

  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }

  return totalMinutes / 60;
};

export const formatHours = (hours) => {
  const sign = hours < 0 ? '-' : '';
  const absHours = Math.abs(hours);
  const h = Math.floor(absHours);
  const m = Math.round((absHours - h) * 60);
  return `${sign}${h}h ${m.toString().padStart(2, '0')}m`;
};
