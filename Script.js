const i18n = {
    ru: {
        welcome: "Привет, ",
        profile_title: "Профиль",
        btn_save: "Сохранить",
        ph_nick: "Твой ник",
        ph_bio: "Коротко о тебе",
        ph_ava: "Эмодзи статус",
        check_title: "Поиск в соцсетях",
        ph_check: "Введите ник для поиска",
        btn_check: "Найти профиль",
        gen_title: "Генератор ников",
        opt_hard: "Жёсткий", opt_aest: "Эстетичный", opt_sigma: "Сигма",
        btn_gen: "Сгенерировать",
        prompts_title: "Конструктор промтов",
        lbl_topic: "Тема (о чем будет запрос):",
        ph_topic: "Например: неоновый город",
        lbl_tool: "Для какой нейронки:",
        prompt_idle: "Введите тему и нажмите Создать",
        btn_build: "Создать промт",
        set_title: "Настройки",
        lbl_theme: "Тема оформления",
        lbl_lang: "Язык (Language)",
        btn_reset: "Удалить все данные",
        msg_copied: "Скопировано!",
        msg_saved: "Сохранено!"
    },
    en: {
        welcome: "Hello, ",
        profile_title: "Profile",
        btn_save: "Save Info",
        ph_nick: "Your nick",
        ph_bio: "Short bio",
        ph_ava: "Emoji status",
        check_title: "Social Search",
        ph_check: "Enter nick to search",
        btn_check: "Find Profile",
        gen_title: "Nick Generator",
        opt_hard: "Hardcore", opt_aest: "Aesthetic", opt_sigma: "Sigma",
        btn_gen: "Generate",
        prompts_title: "Prompt Builder",
        lbl_topic: "Prompt topic:",
        ph_topic: "E.g.: neon city",
        lbl_tool: "AI Tool:",
        prompt_idle: "Enter topic and click Create",
        btn_build: "Build Prompt",
        set_title: "Settings",
        lbl_theme: "Appearance",
        lbl_lang: "Interface Language",
        btn_reset: "Reset Data",
        msg_copied: "Copied!",
        msg_saved: "Saved!"
    }
};

let state = JSON.parse(localStorage.getItem('boostLab_final')) || {
    nick: 'Креатор', bio: '', ava: '🚀', theme: 'light', lang: 'ru'
};

function init() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateUI();
}

function updateUI() {
    const lang = state.lang;
    const t = i18n[lang];

    // Шапка
    document.getElementById('user-welcome').innerText = t.welcome + state.nick;
    document.getElementById('avatar-display').innerText = state.ava;

    // Текстовые элементы
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    // Плейсхолдеры
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });

    // Поля ввода в настройках и профиле
    document.getElementById('prof-nick').value = state.nick === 'Креатор' || state.nick === 'Guest' ? '' : state.nick;
    document.getElementById('prof-bio').value = state.bio;
    document.getElementById('prof-ava').value = state.ava;
    document.getElementById('setting-theme').value = state.theme;
    document.getElementById('setting-lang').value = state.lang;
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
    alert(i18n[state.lang].msg_saved);
}

function checkNickname() {
    const n = document.getElementById('check-input').value;
    const p = document.getElementById('platform-select').value;
    if(n) window.open(`https://www.${p}.com/${p==='youtube'?'@':''}${n}`, '_blank');
}

function generateNick() {
    const db = {
        hard: ['Viper', 'Steel', 'Titan', 'Ghost'],
        aesthetic: ['soft.sky', 'moon.light', 'silk.vibe'],
        sigma: ['Sigma.Rule', 'Void.King', 'Alpha.Mind']
    };
    const s = document.getElementById('nick-style').value;
    const res = db[s][Math.floor(Math.random()*db[s].length)] + "_" + Math.floor(Math.random()*99);
    document.getElementById('nick-result').innerText = res;
}

function generatePrompt() {
    const topic = document.getElementById('prompt-topic').value;
    const cat = document.getElementById('prompt-category').value;
    if(!topic) return;

    const templates = {
        text: `Write a high-quality article about ${topic}. Focus on unique facts and professional tone.`,
        image: `Digital art of ${topic}, ultra-detailed, cinematic lighting, 8k resolution, masterpiece.`,
        video: `Cinematic drone shot of ${topic}, high frame rate, realistic textures, volumetric light.`
    };
    document.getElementById('prompt-result').innerText = templates[cat];
}

function updateSettings() {
    state.theme = document.getElementById('setting-theme').value;
    state.lang = document.getElementById('setting-lang').value;
    save();
    document.documentElement.setAttribute('data-theme', state.theme);
    updateUI();
}

function save() { localStorage.setItem('boostLab_final', JSON.stringify(state)); }

function copyText(id) {
    const txt = document.getElementById(id).innerText;
    if(txt === '...' || txt.includes('Ожидание')) return;
    navigator.clipboard.writeText(txt);
    alert(i18n[state.lang].msg_copied);
}

function clearData() {
    if(confirm('Delete all data?')) {
        localStorage.clear();
        location.reload();
    }
}

init();
