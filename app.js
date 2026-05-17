/**
 * app.js — Lógica do Guia de Análise de Acessibilidade
 * GPNT1 · Desafio DESIN 01/2025
 *
 * Depende de: data.js (carregado antes no HTML)
 */

// ── ESTADO ────────────────────────────────────────────────────────────────────

let currentCat    = 'all';
let currentSearch = '';
let checked       = {};   // { [criterioIndex]: Set<checkIndex> }

// ── ÍCONES SVG POR CATEGORIA ──────────────────────────────────────────────────

const SECTION_ICONS = {
  cor:        '<svg class="section-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M2 12h20"/></svg>',
  leitor:     '<svg class="section-icon" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
  teclado:    '<svg class="section-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/></svg>',
  formulario: '<svg class="section-icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  navegacao:  '<svg class="section-icon" viewBox="0 0 24 24"><polygon points="3,11 22,2 13,21 11,13 3,11"/></svg>',
  imagens:    '<svg class="section-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>',
  zoom:       '<svg class="section-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
  links:      '<svg class="section-icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
};

const CAT_ORDER = ['cor','leitor','teclado','formulario','navegacao','imagens','zoom','links'];

const CAT_LABELS = {
  cor:        'Cor e Contraste',
  leitor:     'Leitor de Tela',
  teclado:    'Teclado',
  formulario: 'Formulários',
  navegacao:  'Navegação e Estrutura',
  imagens:    'Imagens',
  zoom:       'Zoom e Layout',
  links:      'Links e Nomes Acessíveis',
};

// ── BUSCA ─────────────────────────────────────────────────────────────────────

function matchesSearch(c, q) {
  if (!q) return true;
  const haystack = [
    c.title, c.desc,
    ...c.keywords,
    ...c.checks,
    ...c.wcag, ...c.emag,
    c.doc.impacto, c.doc.sugestao, c.doc.onde,
  ].join(' ').toLowerCase();
  return q.toLowerCase().split(' ').filter(Boolean).every(w => haystack.includes(w));
}

function highlight(text, firstWord) {
  if (!firstWord) return text;
  const re = new RegExp(`(${firstWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark style="background:#fff3cd;padding:0 2px;border-radius:2px">$1</mark>');
}

// ── RENDER ────────────────────────────────────────────────────────────────────

function renderAll() {
  const main = document.getElementById('main');
  const q    = currentSearch.trim();
  const qw   = q.split(' ').filter(Boolean)[0] || '';

  // Remover seções antigas
  main.querySelectorAll('.section').forEach(el => el.remove());

  let totalVisible = 0;

  CAT_ORDER.forEach(cat => {
    if (currentCat !== 'all' && currentCat !== cat) return;

    const items = criteria.filter(c => c.cat === cat && matchesSearch(c, q));
    if (!items.length) return;

    totalVisible += items.length;

    const sec = document.createElement('div');
    sec.className = 'section';
    sec.dataset.cat = cat;

    sec.innerHTML = `
      <div class="section-header">
        <div class="section-icon-wrap">${SECTION_ICONS[cat]}</div>
        <div class="section-title">${CAT_LABELS[cat]}</div>
        <div class="section-desc">${items.length} critério${items.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="cards"></div>
    `;

    const cardsEl = sec.querySelector('.cards');
    items.forEach(c => renderCard(c, cardsEl, qw));
    main.insertBefore(sec, document.getElementById('empty-state'));
  });

  // Contadores da sidebar
  CAT_ORDER.forEach(cat => {
    const el = document.getElementById('cnt-' + cat);
    if (el) el.textContent = criteria.filter(c => c.cat === cat && matchesSearch(c, q)).length;
  });
  const elAll = document.getElementById('cnt-all');
  if (elAll) elAll.textContent = criteria.filter(c => matchesSearch(c, q)).length;

  // Contador de resultados
  const rcEl = document.getElementById('result-count');
  rcEl.textContent = (q || currentCat !== 'all')
    ? `${totalVisible} resultado${totalVisible !== 1 ? 's' : ''}`
    : '';

  // Empty state
  document.getElementById('empty-state').style.display = totalVisible ? 'none' : 'block';

  updateProgress();
}

function renderCard(c, container, qw) {
  const idx = criteria.indexOf(c);
  if (!checked[idx]) checked[idx] = new Set();

  const done  = checked[idx].size;
  const total = c.checks.length;

  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.idx = idx;

  const kwHtml = c.keywords.slice(0, 8).map(k => {
    const isMatch = qw && k.toLowerCase().includes(qw.toLowerCase());
    return `<span class="kw${isMatch ? ' match' : ''}">${k}</span>`;
  }).join('');

  const refsHtml = [
    ...c.wcag.map(r => `<span class="ref ref-wcag">WCAG ${r}</span>`),
    ...c.emag.map(r => `<span class="ref ref-emag">eMAG ${r}</span>`),
  ].join('');

  const sevLabel = { alta: 'Alta', media: 'Média', baixa: 'Baixa' }[c.sev];
  const titleHL  = qw ? highlight(c.title, qw) : c.title;
  const descHL   = qw ? highlight(c.desc,  qw) : c.desc;

  const checklistHtml = c.checks.map((ch, ci) => {
    const isDone = checked[idx].has(ci);
    return `<div class="check-row${isDone ? ' done' : ''}" onclick="toggleCheck(${idx},${ci})">
      <div class="check-box"></div>
      <span class="check-text">${ch}</span>
    </div>`;
  }).join('');

  const toolsHtml = c.tools.map(t => `<span class="tool-pill">${t}</span>`).join('');

  card.innerHTML = `
    <div class="card-header" onclick="toggleCard(${idx})">
      <div>
        <div class="card-title">${titleHL}</div>
        <div class="card-keywords">${kwHtml}</div>
      </div>
      <div class="card-right">
        <span class="sev sev-${c.sev}">${sevLabel}</span>
        <div class="refs">${refsHtml}</div>
        <svg class="toggle-icon" viewBox="0 0 24 24"><polyline points="6,9 12,15 18,9"/></svg>
      </div>
    </div>
    <div class="card-body" id="body-${idx}">
      <div class="card-body-inner">

        <div>
          <div class="body-section-title">O que verificar</div>
          <div class="checklist" id="cl-${idx}">${checklistHtml}</div>
          <div class="check-count" id="cc-${idx}">${done}/${total} verificados</div>
        </div>

        <div>
          <div class="body-section-title">Como documentar a barreira</div>
          <div class="doc-block">
            <div class="doc-field">
              <span class="doc-field-label">Critério</span>
              <span class="doc-field-value">${c.doc.criterio}</span>
            </div>
            <div class="doc-field">
              <span class="doc-field-label">Onde ocorre</span>
              <span class="doc-field-value">${c.doc.onde}</span>
            </div>
            <div class="doc-field">
              <span class="doc-field-label">Impacto</span>
              <span class="doc-field-value">${c.doc.impacto}</span>
            </div>
            <div class="doc-field">
              <span class="doc-field-label">Sugestão de correção</span>
              <span class="doc-field-value">${c.doc.sugestao}</span>
            </div>
          </div>
        </div>

        <div>
          <div class="body-section-title">Descrição técnica</div>
          <p class="body-text" style="margin-bottom:16px">${descHL}</p>
          <div class="body-section-title">Ferramentas recomendadas</div>
          ${toolsHtml}
        </div>

      </div>
    </div>
  `;

  container.appendChild(card);
}

// ── INTERAÇÕES ────────────────────────────────────────────────────────────────

function toggleCard(idx) {
  const body = document.getElementById('body-' + idx);
  const card = body.closest('.card');
  const open = body.classList.toggle('open');
  card.classList.toggle('expanded', open);
}

function toggleCheck(cardIdx, checkIdx) {
  if (!checked[cardIdx]) checked[cardIdx] = new Set();

  if (checked[cardIdx].has(checkIdx)) {
    checked[cardIdx].delete(checkIdx);
  } else {
    checked[cardIdx].add(checkIdx);
  }

  // Atualizar visual do check sem re-render completo
  const cl = document.getElementById('cl-' + cardIdx);
  if (cl) {
    cl.querySelectorAll('.check-row').forEach((row, i) => {
      row.classList.toggle('done', checked[cardIdx].has(i));
    });
    const cc = document.getElementById('cc-' + cardIdx);
    if (cc) cc.textContent = `${checked[cardIdx].size}/${criteria[cardIdx].checks.length} verificados`;
  }

  updateProgress();
}

function updateProgress() {
  let total = 0, done = 0;
  criteria.forEach((c, i) => {
    total += c.checks.length;
    done  += checked[i] ? checked[i].size : 0;
  });
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-text').textContent  = `${done} / ${total}`;
}

// ── EVENTOS PÚBLICOS (chamados pelo HTML) ─────────────────────────────────────

function doSearch() {
  currentSearch = document.getElementById('search').value;
  if (currentSearch) {
    // Busca reseta o filtro de categoria
    currentCat = 'all';
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.sidebar-btn').classList.add('active');
  }
  renderAll();
}

function filterCat(cat, btn) {
  currentCat = cat;
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAll();
}

// ── INIT ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', renderAll);