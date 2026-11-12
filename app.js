'use strict';

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-category]')];
const status = document.getElementById('filter-status');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    projects.forEach(project => {
      const show = selected === 'all' || project.dataset.category.split(' ').includes(selected);
      project.hidden = !show;
      if (show) visible++;
    });
    status.textContent = `${visible} ${visible === 1 ? 'projeto exibido' : 'projetos exibidos'}.`;
  });
});

document.getElementById('copy-email').addEventListener('click', async () => {
  const copyStatus = document.getElementById('copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('migueltranslatorbr@gmail.com');
    copyStatus.textContent = 'E-mail copiado!';
  } catch {
    copyStatus.textContent = 'Selecione o e-mail acima para copiar.';
  }
});

document.getElementById('year').textContent = String(new Date().getFullYear());
