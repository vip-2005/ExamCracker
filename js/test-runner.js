let activeTestQuestions = [];
let activeQuestionIdx = 0;
let activeUserAnswer = null;
let currentPaperTitle = '';
let testCorrectCount = 0;
let testWrongCount = 0;

function launchRealTest(paperTitle, examId, paperId) {
  if (!activeUser) {
    openAuthModal();
    GuruAI.speak("Guru! Test dene se pehle apna mobile number login karein taaki score save rahe.");
    return;
  }

  const examData = EXAM_PAPERS_DB[examId];
  const paper = examData[currentPaperType].find(p => p.id === paperId);

  if (!paper || !paper.questions || paper.questions.length === 0) {
    alert("Is shift ka data upload ho raha hai!");
    return;
  }

  currentPaperTitle = paperTitle;
  activeTestQuestions = [...paper.questions];
  activeQuestionIdx = 0;
  testCorrectCount = 0;
  testWrongCount = 0;

  document.getElementById('modalExamName').innerText = paperTitle;
  document.getElementById('qTotal').innerText = activeTestQuestions.length;
  document.getElementById('testPlayerModal').classList.remove('hidden');

  loadActiveQuestion(0);
  GuruAI.speak("All the best Guru! Shaant dimaag se option select karo.");
}

function loadActiveQuestion(idx) {
  activeQuestionIdx = idx;
  activeUserAnswer = null;
  const q = activeTestQuestions[idx];

  document.getElementById('qIndex').innerText = idx + 1;
  document.getElementById('qText').innerText = q.q;

  const optsBox = document.getElementById('modalOptions');
  optsBox.innerHTML = '';

  q.options.forEach((opt, oIdx) => {
    const btn = document.createElement('button');
    btn.className = "w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-xs sm:text-sm font-medium flex items-center justify-between";
    btn.innerHTML = `
      <span>${opt}</span>
      <span class="w-6 h-6 rounded-md border border-slate-300 text-slate-500 font-mono text-xs flex items-center justify-center font-bold">
        ${String.fromCharCode(65 + oIdx)}
      </span>
    `;
    btn.onclick = () => {
      activeUserAnswer = oIdx;
      document.querySelectorAll('#modalOptions button').forEach((b, i) => {
        b.className = (i === oIdx) 
          ? "w-full text-left p-3.5 rounded-xl border border-sky-600 bg-sky-50 text-sky-900 font-bold flex items-center justify-between text-xs sm:text-sm"
          : "w-full text-left p-3.5 rounded-xl border border-slate-200 text-slate-700 flex items-center justify-between text-xs sm:text-sm";
      });
    };
    optsBox.appendChild(btn);
  });

  document.getElementById('modalExplBox').classList.add('hidden');
  document.getElementById('verifyBtn').classList.remove('hidden');
  document.getElementById('nextBtn').classList.add('hidden');
}

function verifyActiveAnswer() {
  if (activeUserAnswer === null) {
    alert("Pehle koi option select karein!");
    return;
  }
  const q = activeTestQuestions[activeQuestionIdx];
  const expl = document.getElementById('modalExplBox');
  const isCorrect = activeUserAnswer === q.ans;

  if (isCorrect) testCorrectCount++;
  else testWrongCount++;

  document.getElementById('modalExplText').innerHTML = `
    <span class="${isCorrect ? 'text-emerald-700' : 'text-rose-700'} font-bold block mb-1">
      ${isCorrect ? '✓ Sahi Uttar! (+2.00 Marks)' : '✗ Galat Uttar! (-0.50 Marks)'}
    </span>
    ${q.expl}
  `;
  expl.classList.remove('hidden');

  document.getElementById('verifyBtn').classList.add('hidden');
  document.getElementById('nextBtn').classList.remove('hidden');
}

function nextModalQuestion() {
  if (activeQuestionIdx < activeTestQuestions.length - 1) {
    loadActiveQuestion(activeQuestionIdx + 1);
  } else {
    finalizeTestSession();
  }
}

function finalizeTestSession() {
  closeTestPlayer();
  const score = (testCorrectCount * 2.0) - (testWrongCount * 0.5);

  saveUserAttempt({
    title: currentPaperTitle,
    examName: currentExamObj ? currentExamObj.name : 'Target Mock',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    score: score.toFixed(2),
    correct: testCorrectCount,
    wrong: testWrongCount,
    total: activeTestQuestions.length
  });

  GuruAI.speak(`Shabash Guru! Aapka score ${score.toFixed(2)} calculate hokar aapke account me save ho gaya. All the best Guru! Mahadev se main kamna karta hoon ki is baar aapki dream job pakki lage. Har Har Mahadev! 🔱`);
}

function closeTestPlayer() {
  document.getElementById('testPlayerModal').classList.add('hidden');
}