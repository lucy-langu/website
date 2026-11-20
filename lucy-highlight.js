/* Lucy language syntax highlighting for static GitHub Pages. */
(() => {
  if (!window.hljs) return;
  hljs.registerLanguage('lucy', () => ({
    name: 'Lucy',
    aliases: ['lucy'],
    keywords: {
      keyword: 'let var const func lambda return if else unless while for foreach in repeat do switch case default break continue class struct static public private protected import from as try catch throw new delete true false nil Nil',
      built_in: 'print println input type typeof len range map array system math time fs File Dir Path',
      literal: 'true false nil null'
    },
    contains: [
      { scope: 'comment', begin: '#', end: '$' },
      { scope: 'string', begin: '"', end: '"', contains: [{scope: 'variable', begin: '\\$[A-Za-z_][\\w]*(?:\\.[A-Za-z_][\\w]*)*'}, {scope: 'subst', begin: '\\$\\{', end: '\\}'}] },
      { scope: 'string', begin: "'", end: "'", contains: [{scope: 'variable', begin: '\\$[A-Za-z_][\\w]*(?:\\.[A-Za-z_][\\w]*)*'}] },
      { scope: 'number', begin: '\\b(?:0x[0-9a-fA-F]+|\\d+(?:\\.\\d+)?)\\b' },
      { scope: 'type', begin: '\\b(?:Nil|Bool|Int|Double|Number|String|Array|Map|Function|Class|Instance|Native|Any)\\b' },
      { scope: 'title', begin: '\\b[A-Z][A-Za-z0-9_]*(?=\\s*\\()' },
      { scope: 'params', begin: '\\b[A-Za-z_][A-Za-z0-9_]*(?=\\s*:)' },
      { scope: 'operator', begin: '->|=>|\\+\\+|--|\\+=|-=|\\*=|/=|==|!=|<=|>=|&&|\\|\\||\\?\\?|\\.\\.|[+*/%=<>!&|^~-]' }
    ]
  }));
  const iconMap = {
    overview: 'bi-stars', quickstart: 'bi-rocket-takeoff', versions: 'bi-git', syntax: 'bi-code-slash',
    types: 'bi-braces', control: 'bi-diagram-3', oop: 'bi-boxes', modules: 'bi-folder2-open',
    architecture: 'bi-cpu', stdlib: 'bi-collection', repl: 'bi-terminal', paw: 'bi-paw',
    packages: 'bi-box-seam', extensions: 'bi-plug', status: 'bi-check2-circle', history: 'bi-clock-history', maintainers: 'bi-tools'
  };
  document.querySelectorAll('.docs-code code').forEach(code => {
    const pre = code.closest('pre');
    const lang = pre?.dataset.codeLanguage || 'lucy';
    code.classList.add(`language-${lang}`);
    hljs.highlightElement(code);
    if (!pre || pre.dataset.toolbar) return;
    pre.dataset.toolbar = 'true';
    pre.classList.add('lucy-code-block');
    const toolbar = document.createElement('div');
    toolbar.className = 'lucy-code-toolbar';
    toolbar.innerHTML = `<span><i class="bi bi-braces-asterisk"></i> ${lang === 'shell' ? 'Shell' : 'Lucy'} <span class="lucy-code-label">${lang === 'shell' ? 'TERMINAL' : 'LUCY'}</span></span><button class="lucy-copy" type="button" aria-label="Copy code"><i class="bi bi-copy"></i><span>Copy</span></button>`;
    pre.parentNode.insertBefore(toolbar, pre);
    toolbar.querySelector('button').addEventListener('click', async () => {
      const button = toolbar.querySelector('button');
      try {
        await navigator.clipboard.writeText(code.innerText);
        button.innerHTML = '<i class="bi bi-check2"></i><span>Copied</span>';
        button.classList.add('copied');
        setTimeout(() => { button.innerHTML = '<i class="bi bi-copy"></i><span>Copy</span>'; button.classList.remove('copied'); }, 1400);
      } catch (_) {
        button.innerHTML = '<i class="bi bi-exclamation-circle"></i><span>Clipboard blocked</span>';
      }
    });
  });
  document.querySelectorAll('.docs-section').forEach(section => {
    const heading = section.querySelector('h2');
    if (!heading || heading.querySelector('.docs-heading-icon')) return;
    const icon = iconMap[section.id] || 'bi-bookmark-star';
    const mark = document.createElement('span');
    mark.className = 'docs-heading-icon';
    mark.innerHTML = `<i class="bi ${icon}"></i>`;
    heading.prepend(mark);
  });
})();
