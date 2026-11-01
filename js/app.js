let currentSelectedCategory = 'all';
let currentExamObj = null;
let currentPaperType = 'pyp';

window.onload = function() {
  if (typeof TARGET_EXAMS !== 'undefined') {
    renderHomeCards(TARGET_EXAMS);
  }
  restoreUserSession();
  if (window.lucide) lucide.createIcons();
};

function showScreen(screen) {
  document.getElementById('screen-home').classList.add('hidden');
  document.getElementById('screen-detail').classList.add('hidden');
  document.getElementById('screen-attempted').classList.add('hidden');

  if (screen === 'home') {
    document.getElementById('screen-home').classList.remove('hidden');
  } else if (screen === 'detail') {
    document.getElementById('screen-detail').classList.remove('hidden');
  } else if (screen === 'attempted') {
    renderAttemptHistory();
    document.getElementById('screen-attempted').classList.remove('hidden');
  }
  if (window.lucide) lucide.createIcons();
}

function renderHomeCards(list) {
  const grid = document.getElementById('examsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-500 hover:shadow-lg transition cursor-pointer flex flex-col justify-between group";
    card.onclick = () => openExamDetails(item);

    card.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="w-11 h-11 rounded-xl border flex items-center justify-center text-xl shadow-sm ${item.color}">
            ${item.icon}
          </div>
          <span class="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            ${item.tests} TESTS
          </span>
        </div>
        <div>
          <h3 class="font-black text-base text-slate-900 group-hover:text-sky-600 transition-colors">
            ${item.name}
          </h3>
          <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${item.sub}</p>
        </div>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
        <span>EXPLORE SHIFTS & MOCKS</span>
        <span class="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    `;
    grid.appendChild(card);
  });

  const countBadge = document.getElementById('cardsCountLabel');
  if (countBadge) countBadge.innerText = `${list.length} Exams Available`;
  if (window.lucide) lucide.createIcons();
}

function filterCategory(cat, btn) {
  document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filtered = cat === 'all' ? TARGET_EXAMS : TARGET_EXAMS.filter(e => e.cat === cat);
  renderHomeCards(filtered);
}

function openExamDetails(exam) {
  currentExamObj = exam;
  currentPaperType = 'pyp';

  document.getElementById('dtlBreadcrumb').innerText = `Home > ${exam.cat.toUpperCase()} > ${exam.name}`;
  document.getElementById('dtlExamTitle').innerText = `${exam.name} Full Test Series`;
  document.getElementById('dtlIconBox').innerText = exam.icon;
  document.getElementById('dtlTestCount').innerText = `${exam.tests}+ Tests`;

  updatePaperTypeButtons();
  renderShiftsList();
  showScreen('detail');

  GuruAI.speak(`Arey Guru! ${exam.name} ka paper open kiya hai. Shift choose karke live mock attempt karo!`);
}

function switchPaperType(type) {
  currentPaperType = type;
  updatePaperTypeButtons();
  renderShiftsList();
}

function updatePaperTypeButtons() {
  const mockBtn = document.getElementById('tabMockBtn');
  const pypBtn = document.getElementById('tabPypBtn');
  if (currentPaperType === 'mock') {
    mockBtn.className = "type-pill active px-5 py-2 rounded-xl text-xs font-bold transition";
    pypBtn.className = "type-pill px-5 py-2 rounded-xl text-xs font-bold transition";
  } else {
    mockBtn.className = "type-pill px-5 py-2 rounded-xl text-xs font-bold transition";
    pypBtn.className = "type-pill active px-5 py-2 rounded-xl text-xs font-bold transition";
  }
}

function renderShiftsList() {
  const container = document.getElementById('papersListContainer');
  container.innerHTML = '';

  const examData = (typeof EXAM_PAPERS_DB !== 'undefined' && EXAM_PAPERS_DB[currentExamObj.id]) ? EXAM_PAPERS_DB[currentExamObj.id] : { 'pyp': [], 'mock': [] };
  const papers = examData[currentPaperType] || [];

  if (papers.length === 0) {
    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-2">
        <span class="text-3xl">⏳</span>
        <h4 class="font-bold text-slate-800 text-sm">Paper Digitization In Progress</h4>
        <p class="text-xs text-slate-400">Guru is section ke shifts jald hi live honge!</p>
      </div>
    `;
    return;
  }

  papers.forEach(p => {
    const hasQuestions = p.questions && p.questions.length > 0;
    const card = document.createElement('div');
    card.className = "bg-white border border-slate-200 rounded-xl p-5 hover:border-sky-500 hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4";

    card.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono ${hasQuestions ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
            ${hasQuestions ? 'FREE AVAILABLE' : 'UPDATING SOON'}
          </span>
          <span class="text-xs text-slate-400 font-mono">⚡ ${p.users}</span>
        </div>
        <h3 class="font-extrabold text-slate-900 text-base leading-snug">${p.title}</h3>
        <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
          <span>❓ ${hasQuestions ? p.questions.length : '100'} Questions</span>
          <span>•</span>
          <span>🎖️ ${hasQuestions ? p.questions.length * 2 : '200'} Marks</span>
          <span>•</span>
          <span>⏱️ 60 Mins</span>
          <span>•</span>
          <span class="text-sky-600 font-bold">English, Hindi</span>
        </div>
      </div>
      <div>
        ${hasQuestions ? `
          <button onclick="launchRealTest('${p.title}', '${currentExamObj.id}', '${p.id}')" class="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs font-mono shadow-sm whitespace-nowrap">
            Start Now →
          </button>
        ` : `
          <button disabled class="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs font-mono cursor-not-allowed whitespace-nowrap">
            Updating Soon ⏳
          </button>
        `}
      </div>
    `;
    container.appendChild(card);
  });
  if (window.lucide) lucide.createIcons();
}

function renderAttemptHistory() {
  const container = document.getElementById('attemptHistoryContainer');
  container.innerHTML = '';
  
  const subTitle = document.getElementById('attemptUserSubtitle');
  if (activeUser) {
    subTitle.innerText = `Account: +91 ${activeUser.mobile} (${activeUser.name || 'Student'})`;
  } else {
    subTitle.innerText = 'Guest Session History';
  }

  const history = getUserAttempts();

  if (history.length === 0) {
    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-mono text-xs">
        Is mobile number se abhi tak koi test attempt nahi kiya gaya hai. Pehla test shuru karein!
      </div>
    `;
    return;
  }

  history.forEach(h => {
    const div = document.createElement('div');
    div.className = "bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4";
    div.innerHTML = `
      <div class="space-y-1">
        <span class="text-[10px] font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">${h.date}</span>
        <h4 class="font-bold text-slate-900 text-sm">${h.title}</h4>
        <div class="text-xs text-slate-500 font-mono">
          <span class="text-emerald-600 font-bold">✓ ${h.correct} Correct</span> • 
          <span class="text-rose-600 font-bold">✗ ${h.wrong} Wrong</span> • 
          <span>Total ${h.total} Qs</span>
        </div>
      </div>
      <div class="text-right sm:border-l sm:pl-6 border-slate-100">
        <span class="text-[10px] text-slate-400 font-mono uppercase block">Score Achieved</span>
        <span class="text-xl font-black text-slate-900 font-mono">${h.score}</span>
      </div>
    `;
    container.appendChild(div);
  });
}

function clearAttemptHistory() {
  if (!activeUser) return;
  if (confirm("Kya aap sirf apne number ka history data clear karna chahte hain?")) {
    const storageKey = getIsolatedStorageKey('attempts');
    localStorage.removeItem(storageKey);
    renderAttemptHistory();
  }
}