export function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
  return isDark;
}

export function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  let isDark = false;
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    isDark = true;
  } else if (savedTheme === null) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
      isDark = true;
    }
  }
  
  updateThemeIcon(isDark);
  return isDark;
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = isDark ? '☀️' : '🌙';
  }
}

export function getCurrentTheme() {
  return document.body.classList.contains('dark') ? 'dark' : 'light';
}