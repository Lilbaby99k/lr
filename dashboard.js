// Dashboard interactions: burger menu, dark mode, overlay
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const sidebar = document.querySelector('.sidebar');
  const app = document.getElementById('app');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  // toggle sidebar (mobile)
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }

  burger.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) closeSidebar();
    else openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);

  // close sidebar when clicking nav item on mobile
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth < 720) closeSidebar();
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Dark mode toggle
  const darkToggle = document.getElementById('darkToggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('gm_theme');
  if (saved === 'dark' || (!saved && prefersDark)) document.documentElement.setAttribute('data-theme', 'dark');

  function updateDarkIcon() {
    const icon = darkToggle.querySelector('i');
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-regular fa-moon';
    }
  }
  updateDarkIcon();

  darkToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('gm_theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('gm_theme', 'dark');
    }
    updateDarkIcon();
  });

  // responsive: close sidebar on resize if desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 720) {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    }
  });
});
