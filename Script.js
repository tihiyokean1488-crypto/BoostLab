let state = JSON.parse(localStorage.getItem('boost_final_v5')) || {
    nick: 'Creator', bio: 'Maker', ava: '🚀',
    theme: 'dark', lang: 'ru',
    goalCurr: 0, goalTarget: 1000,
    deviceCurr: 0, deviceTotal: 1000,
    dailyIdea: "", lastDailyDate: ""
};

const i18n = {
    ru: { welcome: "Привет, ", saved: "Сохранено!", empty: "Введите данные" },
    en: { welcome: "Hello, ", saved: "Saved!", empty: "Enter data" }
};

function init() {
    applyTheme();
    checkDailyIdea();
    updateUI();
}

// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
function showTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    el.classList.add('active');
}

// АНАЛИТИКА
function analyzeLink() {
    const input = document.getElementById('stats-input').value;
    const platform = document.querySelector('input[name="plat"]:checked').value;
    const res = document.getElementById('stats-result');
    if(!input) return;
    res.style.display = "block";
    res.innerHTML = `<p>Поиск <b>${input}</b> в ${platform.toUpperCase()}...</p>
    <button class="btn" onclick="window.open('https://socialblade.com', '_blank')">Открыть SocialBlade</button>`;
}

// AI ПРОМТЫ
function generatePrompt() {
    const topic = document.getElementById('ai-topic').value || "future";
    const type = document.querySelector('input[name="ai-type"]:checked').value;
    const res = document.getElementById('ai-result');
    res.style.display = "block";
    const prompts = {
        chat: `Write a viral script about ${topic}`,
        mid: `Cinematic shot of ${topic}, 8k, neon rays`,
        luma: `Hyper-realistic drone video of ${topic}`
    };
    res.innerText = prompts[type];
}

// КОНТЕНТ (ИДЕЯ ДНЯ И КЛИКБЕЙТ)
function checkDailyIdea() {
    const today = new Date().toLocaleDateString();
    if (state.lastDailyDate !== today) skipDailyIdea();
    else document.getElementById('daily-idea-text').innerText = state.dailyIdea;
}

function skipDailyIdea() {
    const pool = ["Обзор девайса", "Один день из жизни", "Секретный лайфхак", "Челлендж 24 часа"];
    state.dailyIdea = pool[Math.floor(Math.random() * pool.length)];
    state.lastDailyDate = new Date().toLocaleDateString();
    save();
    document.getElementById('daily-idea-text').innerText = state.dailyIdea;
}

function generateHooks() {
    const topic = document.getElementById('hooks-topic').value || "...";
    const g = document.querySelector('input[name="g"]:checked').value;
    const grammar = { male: "Этот", female: "Эта", neutral: "Это", plural: "Эти" };
    const res = document.getElementById('hooks-result');
    res.style.display = "block";
    res.innerText = `❌ Никогда не покупай ${grammar[g].toLowerCase()} (${topic})!\n😱 ${grammar[g]} (${topic}) изменит твой блог!`;
}

// ГЕЙМЕР ХАБ
function generateGameQuest() {
    const quests = ["Играй без звука 15 мин", "Победа только с пистолетом", "Стрим без мата"];
    document.getElementById('game-quest').innerText = quests[Math.floor(Math.random() * quests.length)];
}

// ЦЕЛИ
function updateGoal() {
    state.goalCurr = document.getElementById('goal-curr').value;
    state.goalTarget = document.getElementById('goal-target').value;
    document.getElementById('goal-bar').style.width = (state.goalCurr/state.goalTarget*100) + "%";
    save();
}

function updateDeviceGoal() {
    state.deviceCurr = document.getElementById('device-curr').value;
    state.deviceTotal = document.getElementById('device-total').value;
    document.getElementById('device-bar').style.width = (state.deviceCurr/state.deviceTotal*100) + "%";
    save();
}

// ПРОФИЛЬ
function liveUpdate() {
    document.getElementById('m-nick').innerText = "@" + (document.getElementById('prof-nick').value || 'creator');
    document.getElementById('m-bio').innerText = document.getElementById('prof-bio').value || 'Bio...';
    document.getElementById('m-ava').innerText = document.getElementById('prof-ava').value || '🚀';
}

function saveProfile() {
    state.nick = document.getElementById('prof-nick').value;
    state.bio = document.getElementById('prof-bio').value;
    state.ava = document.getElementById('prof-ava').value;
    save(); updateUI();
}

// НАСТРОЙКИ
function updateSettings() {
    state.theme = document.querySelector('input[name="theme"]:checked').value;
    state.lang = document.querySelector('input[name="lang"]:checked').value;
    save(); applyTheme(); updateUI();
}

function applyTheme() {
    document.body.setAttribute('data-theme', state.theme);
}

function updateUI() {
    const t = i18n[state.lang] || i18n.ru;
    document.getElementById('user-welcome').innerText = t.welcome + state.nick;
    document.getElementById('prof-nick').value = state.nick;
    document.getElementById('prof-bio').value = state.bio;
    document.getElementById('prof-ava').value = state.ava;
    document.getElementById('goal-curr').value = state.goalCurr;
    document.getElementById('goal-target').value = state.goalTarget;
    document.getElementById('device-curr').value = state.deviceCurr;
    document.getElementById('device-total').value = state.deviceTotal;
    
    // Синхронизация кнопок
    document.querySelector(`input[name="lang"][value="${state.lang}"]`).checked = true;
    document.querySelector(`input[name="theme"][value="${state.theme}"]`).checked = true;
    
    updateGoal(); updateDeviceGoal(); liveUpdate();
}

function save() { localStorage.setItem('boost_final_v5', JSON.stringify(state)); }
function clearData() { if(confirm('Удалить всё?')) { localStorage.clear(); location.reload(); } }

init();
