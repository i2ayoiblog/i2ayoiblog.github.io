/**
 * 轻量级前端搜索
 * 使用 Hugo 生成的 /index.json 作为数据源
 */
(function () {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let index = [];

  // 加载搜索索引
  fetch('/index.json')
    .then(r => r.json())
    .then(data => { index = data; })
    .catch(() => {});

  function highlight(text, query) {
    if (!text) return '';
    const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.replace(re, '<strong>$1</strong>');
  }

  function search(query) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase();
    return index
      .filter(item =>
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.content && item.content.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q))) ||
        (item.categories && item.categories.some(c => c.toLowerCase().includes(q)))
      )
      .slice(0, 8);
  }

  function render(items, query) {
    if (items.length === 0) {
      results.innerHTML = '<li><a>没有找到相关文章</a></li>';
    } else {
      results.innerHTML = items.map(item => `
        <li>
          <a href="${item.href}">
            ${highlight(item.title, query)}
            <span>${item.description || item.content || ''}</span>
          </a>
        </li>
      `).join('');
    }
    results.classList.add('open');
  }

  let timer;
  input.addEventListener('input', function () {
    clearTimeout(timer);
    const q = this.value.trim();
    if (!q) { results.classList.remove('open'); return; }
    timer = setTimeout(() => render(search(q), q), 150);
  });

  // 点击外部关闭
  document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('open');
    }
  });

  // ESC 关闭
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      results.classList.remove('open');
      input.blur();
    }
  });
})();
