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
});
