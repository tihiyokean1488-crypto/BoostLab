const i18n = {
    ru: { welcome: "Система онлайн, ", profile: "ПРОФИЛЬ", stats: "АНАЛИЗ", search_title: "ПОИСК", btn_save: "ЗАПИСЬ", btn_analyze: "СКАН", lang_name: "ЯЗЫК", placeholder_nick: "Ник..." },
    en: { welcome: "System online, ", profile: "PROFILE", stats: "STATS", search_title: "SEARCH", btn_save: "SAVE", btn_analyze: "SCAN", lang_name: "LANG", placeholder_nick: "Nick..." },
    kz: { welcome: "Жүйе қосулы, ", profile: "ПРОФИЛЬ", stats: "ТАЛДАУ", search_title: "ІЗДЕУ", btn_save: "САҚТАУ", btn_analyze: "СКАН", lang_name: "ТІЛ", placeholder_nick: "Ник..." }
    // Добавь остальные языки (TR, UZ, KG, AZ, UA, DE, FR, ES, ZH) по этой же схеме
};

let state = JSON.parse(localStorage.getItem('boost_final')) || {
    nick: 'Admin', lang: 'ru'
};

function init() {
    renderLangPicker();
    applyLanguage();
    updateUI();
}

// ПЕРЕВОД
function applyLanguage() {
    const dict = i18n[state.lang] || i18n.ru;
    document.getElementById('user-welcome').innerText = dict.welcome + state.nick;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(dict[key]) el.innerText = dict[key];
    });
}

// ПОИСК
function runGlobalSearch() {
    const q = document.getElementById('global-search-input').value;
    const res = document.getElementById('search-results');
    res.style.display = "block";
    typeWriter('search-results', `> SCANNING WEB FOR: ${q}...\n> TRENDS DETECTED.\n> ENCRYPTING DATA...`);
}

function setSearch(val) { document.getElementById('global-search-input').value = val; }

// АНАЛИТИКА
function analyzeLink() {
    const res = document.getElementById('stats-result');
    res.style.display = "block";
    typeWriter('stats-result', `> DATA INCOMING...\n> ENGAGEMENT: HIGH\n> STATUS: VERIFIED`);
}

// ЭФФЕКТ ПЕЧАТИ
function typeWriter(id, text) {
    const el = document.getElementById(id);
    el.innerHTML = ""; let i = 0;
    const interval = setInterval(() => {
        if(i < text.length) { el.innerHTML += text[i]; i++; }
        else clearInterval(interval);
    }, 30);
}

// НАВИГАЦИЯ
function showTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    el.classList.add('active');
}

// РЕНДЕР ЯЗЫКОВЫХ КНОПОК
function renderLangPicker() {
    const container = document.getElementById('lang-picker');
    Object.keys(i18n).forEach(l => {
        const label = document.createElement('label');
        label.className = 'l-btn';
        label.innerHTML = `<input type="radio" name="lang" value="${l}" ${state.lang === l ? 'checked' : ''} onchange="changeLang('${l}')"><span>${l.toUpperCase()}</span>`;
        container.appendChild(label);
    });
}

function changeLang(l) { state.lang = l; save(); applyLanguage(); }
function save() { localStorage.setItem('boost_final', JSON.stringify(state)); }
function updateUI() { /* Обновление полей из state */ }

init();
