 // JavaScript simples para abrir e fechar modal
  const modal = document.getElementById('filterModal');
  const openBtn = document.getElementById('openFilterBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('filterForm');

  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Fechar modal clicando fora do conteúdo
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Exemplo de captura do filtro e fechamento do modal
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;

    // Aqui você pode fazer o filtro atualizar seu dashboard
    console.log('Filtro aplicado:', { name, startDate, endDate });

    // Fechar o modal
    modal.style.display = 'none';

    // Resetar formulário se quiser
    // form.reset();
  });