const i18n = {
    ru: { profile: "Профиль", save: "Сохранить", check_nick: "Проверка", go_check: "Найти", gen_nick: "Генератор", generate: "Создать", prompts: "Промты", get_prompt: "Получить", settings: "Настройки", theme: "Тема", lang: "Язык", reset: "Сбросить всё" },
    en: { profile: "Profile", save: "Save", check_nick: "Checker", go_check: "Search", gen_nick: "Generator", generate: "Create", prompts: "Prompts", get_prompt: "Get", settings: "Settings", theme: "Theme", lang: "Lang", reset: "Reset All" }
};

let state = JSON.parse(localStorage.getItem('boostLab')) || {
    nick: 'Креатор', bio: '', ava: '🚀', theme: 'light', lang: 'ru'
};

function init() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateUI();
}

function updateUI() {
    document.getElementById('user-welcome').innerText = `Привет, ${state.nick}!`;
    document.getElementById('avatar-display').innerText = state.ava;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerText = i18n[state.lang][el.getAttribute('data-i18n')];
    });
}

function showTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    el.classList.add('active');
}

function saveProfile() {
    state.nick = document.getElementById('prof-nick').value || 'Креатор';
    state.bio = document.getElementById('prof-bio').value;
    state.ava = document.getElementById('prof-ava').value || '🚀';
    save();
    updateUI();
}

function updateSettings() {
    state.theme = document.getElementById('setting-theme').value;
    state.lang = document.getElementById('setting-lang').value;
    save();
    document.documentElement.setAttribute('data-theme', state.theme);
    updateUI();
}

function save() { localStorage.setItem('boostLab', JSON.stringify(state)); }

function checkNickname() {
    const n = document.getElementById('check-input').value;
    const p = document.getElementById('platform-select').value;
    if(n) window.open(`https://www.${p}.com/${p==='youtube'?'@':''}${n}`, '_blank');
}

function generateNick() {
    const styles = {
        hard: ['Killer', 'Viper', 'Doom', 'Shadow'],
        aesthetic: ['soft.sky', 'moon.light', 'blue.berry'],
        sigma: ['Sigma.Male', 'Patrik.B', 'Lone.Wolf']
    };
    const s = document.getElementById('nick-style').value;
    const res = styles[s][Math.floor(Math.random()*styles[s].length)] + "_" + Math.floor(Math.random()*99);
    document.getElementById('nick-result').innerText = res;
}

function generatePrompt() {
    const p = {
        text: "Напиши сценарий для Reels про продуктивность за 30 секунд.",
        image: "Cyberpunk street in Tokyo, rainy night, hyper-realistic, 8k"
    };
    document.getElementById('prompt-result').innerText = p[document.getElementById('prompt-category').value];
}

function copyText(id) {
    navigator.clipboard.writeText(document.getElementById(id).innerText);
    alert('Copied!');
}

function clearData() { if(confirm('Reset?')) { localStorage.clear(); location.reload(); } }

init();
