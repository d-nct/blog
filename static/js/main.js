// Copy Link & Copy Code Snippets
document.addEventListener('DOMContentLoaded', () => {
  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Share Copy Link button
  const copyLinkBtn = document.querySelector('.copy-link-btn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      const url = copyLinkBtn.getAttribute('data-url') || window.location.href;
      try {
        await navigator.clipboard.writeText(url);
        const originalText = copyLinkBtn.textContent;
        copyLinkBtn.textContent = 'Copiado!';
        setTimeout(() => {
          copyLinkBtn.textContent = originalText;
        }, 2000);
      } catch (err) {
        prompt('Copie o link abaixo:', url);
      }
    });
  }

  // Add Copy Button to all pre/code blocks
  const codeBlocks = document.querySelectorAll('.markdown-body pre');
  codeBlocks.forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code) return;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.type = 'button';
    copyBtn.innerText = 'Copiar';
    copyBtn.title = 'Copiar código';

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
        copyBtn.innerText = 'Copiado!';
        setTimeout(() => {
          copyBtn.innerText = 'Copiar';
        }, 2000);
      } catch (err) {
        copyBtn.innerText = 'Erro';
      }
    });

    pre.appendChild(copyBtn);
  });

  // Visitor Hit Counter (GitHub Pages / Production & Local Dev Support)
  initHitCounter();
});

async function initHitCounter() {
  const counterEl = document.getElementById('site-hit-counter');
  if (!counterEl) return;

  const namespace = counterEl.getAttribute('data-ns') || 'abobrinhas-amadas-blog';
  const key = counterEl.getAttribute('data-key') || 'visits';
  const isLocal = ['localhost', '127.0.0.1', '0.0.0.0', ''].includes(window.location.hostname);

  const formatCount = (num) => String(num).padStart(6, '0');

  // Ambiente de desenvolvimento local: simula contagem via localStorage
  if (isLocal) {
    let localCount = parseInt(localStorage.getItem('dev_hit_counter') || '1', 10);
    if (!sessionStorage.getItem('dev_visited_session')) {
      localCount += 1;
      localStorage.setItem('dev_hit_counter', String(localCount));
      sessionStorage.setItem('dev_visited_session', 'true');
    }
    counterEl.textContent = `VISITANTE: ${formatCount(localCount)}`;
    return;
  }

  // Ambiente de producao (GitHub Pages / Dominio proprio)
  try {
    const hasVisitedInSession = sessionStorage.getItem('visited_session') === 'true';
    const endpoint = hasVisitedInSession
      ? `https://counterapi.com/api/${namespace}/view/${key}?readOnly=true`
      : `https://counterapi.com/api/${namespace}/view/${key}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    if (data && typeof data.value === 'number') {
      sessionStorage.setItem('visited_session', 'true');
      counterEl.textContent = `VISITANTE: ${formatCount(data.value)}`;
    }
  } catch (err) {
    // Fallback gracioso em caso de falha de rede
    console.warn('Nao foi possivel carregar a contagem de visitas:', err);
  }
}
