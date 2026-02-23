let state = JSON.parse(localStorage.getItem('boost_final_pro')) || {
    nick: 'Creator', bio: 'Content Creator', ava: '🚀',
    theme: 'dark', lang: 'ru',
    deviceCurr: 0, deviceTotal: 1000,
    dailyIdea: "", lastDailyDate: ""
};

const dailyPool = [
    "Сними туториал по своей самой полезной фишке",
    "POV: Ты наконец-то решился заняться (твоя тема)",
    "Развей 3 самых популярных мифа в твоей нише",
    "Сделай эстетичную нарезку своего рабочего дня",
    "Ответь на самый странный вопрос подписчика",
    "Топ-5 инструментов, которые упрощают жизнь",
    "Сделай распаковку в стиле ASMR"
];

function init() {
    applyTheme();
    checkDailyIdea();
    updateUI();
}

function checkDailyIdea() {
    const today = new Date().toLocaleDateString();
    if (state.lastDailyDate !== today) {
        skipDailyIdea();
    } else {
        document.getElementById('daily-idea-text').innerText = state.dailyIdea;
        document.getElementById('daily-date').innerText = "Идея на сегодня";
    }
}

function skipDailyIdea() {
    state.dailyIdea = dailyPool[Math.floor(Math.random() * dailyPool.length)];
    state.lastDailyDate = new Date().toLocaleDateString();
    save();
    document.getElementById('daily-idea-text').innerText = state.dailyIdea;
}

function liveUpdate() {
    const nick = document.getElementById('prof-nick').value || 'creator';
    const bio = document.getElementById('prof-bio').value || 'Bio...';
    const ava = document.getElementById('prof-ava').value || '🚀';
    document.getElementById('m-nick').innerText = "@" + nick.toLowerCase().replace(/\s/g, '');
    document.getElementById('m-bio').innerText = bio;
    document.getElementById('m-ava').innerText = ava;
}

function generateHooks() {
    const topic = document.getElementById('hooks-topic').value || "...";
    const gender = document.querySelector('input[name="g"]:checked').value;
    
    const grammar = {
        male:    { t: "Этот", o: "один" },
        female:  { t: "Эта", o: "одна" },
        neutral: { t: "Это", o: "одно" },
        plural:  { t: "Эти", o: "одни" }
    };
    const g = grammar[gender];
    const patterns = [
        `❌ Никогда не покупай ${g.t.toLowerCase()} (${topic})!`,
        `💡 Секрет ${g.t.toLowerCase().replace('э', 'эти')} (${topic}), о котором молчат.`,
        `😱 Ты не поверишь, но ${g.t} (${topic}) изменил${gender==='female'?'а': gender==='plural'?'и':''} всё!`
    ];
    const res = document.getElementById('hooks-result');
    res.style.display = "block";
    res.innerText = patterns.join("\n\n");
}

function generateGameQuest() {
    const quests = ["Миссия без аптечек", "Только пистолеты", "Стрим без мата 2 часа", "10 киллов подряд"];
    document.getElementById('game-quest').innerText = quests[Math.floor(Math.random() * quests.length)];
}

function updateDeviceGoal() {
    state.deviceCurr = document.getElementById('device-curr').value;
    state.deviceTotal = document.getElementById('device-total').value;
    const percent = Math.min((state.deviceCurr / state.deviceTotal) * 100, 100);
    document.getElementById('device-bar').style.width = percent + "%";
    save();
}

function showTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    el.classList.add('active');
}

function saveProfile() {
    state.nick = document.getElementById('prof-nick').value;
    state.bio = document.getElementById('prof-bio').value;
    state.ava = document.getElementById('prof-ava').value;
    save();
    alert("Профиль сохранен в облаке!");
}

function updateSettings() {
    state.theme = document.querySelector('input[name="theme"]:checked').value;
    save();
    applyTheme();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
}

function updateUI() {
    document.getElementById('user-welcome').innerText = "Привет, " + state.nick;
    document.getElementById('prof-nick').value = state.nick;
    document.getElementById('prof-bio').value = state.bio;
    document.getElementById('prof-ava').value = state.ava;
    document.getElementById('device-curr').value = state.deviceCurr;
    document.getElementById('device-total').value = state.deviceTotal;
    liveUpdate();
    updateDeviceGoal();
}

function save() { localStorage.setItem('boost_final_pro', JSON.stringify(state)); }
function clearData() { if(confirm('Сбросить всё?')) { localStorage.clear(); location.reload(); } }

init();
