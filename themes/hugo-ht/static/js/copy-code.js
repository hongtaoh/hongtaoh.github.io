document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((codeBlock) => {
      const button = document.createElement('button');
      button.textContent = 'Copy code';
      button.className = 'copy-code-button';
      codeBlock.parentNode.insertBefore(button, codeBlock);

      button.addEventListener('click', () => {
          navigator.clipboard.writeText(codeBlock.textContent).then(() => {
              button.textContent = 'Copied!';
              setTimeout(() => button.textContent = 'Copy code', 1500);
          });
      });
  });
});
