document.addEventListener('DOMContentLoaded', () => {
  setupMenuToggle();
  setupAbas();
  setupFiltrosPainel();
  setupFiltrosApp();
});

function setupMenuToggle() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    toggle.setAttribute('aria-expanded', String(aberto));
  });
}

function setupAbas() {
  const abas = document.querySelectorAll('.abas [role="tab"]');
  if (!abas.length) return;

  abas.forEach((aba) => {
    aba.addEventListener('click', () => {
      abas.forEach((a) => a.setAttribute('aria-selected', 'false'));
      aba.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.tela').forEach((tela) => {
        const isAlvo = tela.id === aba.getAttribute('aria-controls');
        tela.classList.toggle('ativa', isAlvo);
        tela.hidden = !isAlvo;
      });
    });
  });
}

function setupFiltrosPainel() {
  const opcoes = document.querySelectorAll('.filtros button.opcao');
  const busca = document.getElementById('busca-painel');
  const limpar = document.getElementById('limpar-filtros');
  if (!opcoes.length) return;

  opcoes.forEach((opcao) => {
    opcao.addEventListener('click', () => {
      opcoes.forEach((o) => o.setAttribute('aria-pressed', 'false'));
      opcao.setAttribute('aria-pressed', 'true');
      aplicarFiltroPainel();
    });
  });

  if (busca) busca.addEventListener('input', aplicarFiltroPainel);

  if (limpar) {
    limpar.addEventListener('click', () => {
      opcoes.forEach((o) => o.setAttribute('aria-pressed', o.dataset.filtro === 'todas'));
      if (busca) busca.value = '';
      aplicarFiltroPainel();
    });
  }
}

function aplicarFiltroPainel() {
  const ativa = document.querySelector('.filtros button.opcao[aria-pressed="true"]');
  const filtro = ativa ? ativa.dataset.filtro : 'todas';
  const buscaInput = document.getElementById('busca-painel');
  const termo = (buscaInput ? buscaInput.value : '').trim().toLowerCase();

  const linhas = document.querySelectorAll('#tabela-redes tbody tr');
  let visiveis = 0;

  linhas.forEach((linha) => {
    const tipoOk = filtro === 'todas' || linha.dataset.tipo === filtro;
    const texto = linha.textContent.toLowerCase();
    const buscaOk = termo === '' || texto.includes(termo);
    const mostra = tipoOk && buscaOk;
    linha.style.display = mostra ? '' : 'none';
    if (mostra) visiveis += 1;
  });

  const total = linhas.length;
  const contagem = document.getElementById('contagem-tabela');
  if (contagem) contagem.textContent = `${visiveis} / ${total}`;
}

function setupFiltrosApp() {
  const opcoes = document.querySelectorAll('.opcoes-app button');
  const linhas = document.querySelectorAll('.linha-app');
  if (!opcoes.length) return;

  opcoes.forEach((opcao) => {
    opcao.addEventListener('click', () => {
      opcoes.forEach((o) => o.setAttribute('aria-pressed', 'false'));
      opcao.setAttribute('aria-pressed', 'true');

      const filtro = opcao.dataset.filtro;
      linhas.forEach((linha) => {
        const mostra = filtro === 'todas' || linha.dataset.tipo === filtro;
        linha.style.display = mostra ? '' : 'none';
      });
    });
  });
}
