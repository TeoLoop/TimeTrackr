const API_URL = 'http://localhost:3001/api/horas';

export const loadFromStorage = async (key) => {
  try {
    if (key === 'workdays') {
      const res = await fetch(API_URL);
      return await res.json();
    } else if (key === 'config') {
      const res = await fetch(`${API_URL}/config`);
      return await res.json();
    }
    return null;
  } catch (error) {
    console.error('Error al cargar:', error);
    return null;
  }
};

export const saveToStorage = async (key, data) => {
  try {
    if (key === 'workdays') {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else if (key === 'config') {
      await fetch(`${API_URL}/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }
  } catch (error) {
    console.error('Error al guardar:', error);
  }
};

export const deleteFromStorage = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error al eliminar:', error);
  }
};
