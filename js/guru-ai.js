// ==============================================================
// GURU JI 100% LIVE AI (WITH VERIFIED INDIAN EXAM PATTERNS)
// ==============================================================

const GuruAI = {
  isTyping: false,
  chatHistory: [],

  // Official Exam Factsheet taaki AI kabhi galat pattern na bataye
  examFactsheet: `
OFFICIAL EXAM PATTERNS (ALWAYS USE THIS EXACT DATA WHEN ASKED):
1. SSC MTS (Computer Based Online Test):
   - Total: 90 Questions, 270 Marks (3 Marks each), Total Time: 90 Minutes (45 Min per session).
   - Session 1 (Qualifying, NO Negative Marking): Maths (20 Q, 60 Marks) + Reasoning (20 Q, 60 Marks).
   - Session 2 (Merit Deciding, -1 Negative Marking per wrong answer): General Awareness/GK (25 Q, 75 Marks) + English (25 Q, 75 Marks).
2. SSC Stenographer (Grade C & D - Online CBT):
   - Total: 200 Questions, 200 Marks, Time: 2 Hours (120 Mins), Negative Marking: 0.25 marks.
   - Sections: Reasoning (50 Q, 50 Marks), General Awareness (50 Q, 50 Marks), English Language (100 Q, 100 Marks). (NO Maths in Steno!).
   - Skill Test: Shorthand Dictation (80 wpm for Grade D, 100 wpm for Grade C).
3. SSC CHSL / CGL (Tier-1 Online CBT):
   - Total: 100 Questions, 200 Marks (2 Marks each), Time: 60 Minutes, Negative Marking: 0.50 marks.
   - Sections: Reasoning (25 Q), GK/GS (25 Q), Maths (25 Q), English (25 Q).
4. SSC GD Constable:
   - Total: 80 Questions, 160 Marks (2 Marks each), Time: 60 Minutes, Negative Marking: 0.25 marks.
   - Sections: Reasoning (20 Q), GK/GS (20 Q), Maths (20 Q), Hindi/English (20 Q).
5. RRB NTPC (CBT-1):
   - Total: 100 Questions, 100 Marks, Time: 90 Minutes, Negative Marking: 1/3rd mark.
   - Sections: General Awareness (40 Q), Maths (30 Q), Reasoning (30 Q).
6. UPSSSC PET:
   - Total: 100 Questions, 100 Marks, Time: 2 Hours, Negative Marking: 0.25 marks.`,

  getLoggedInUser() {
    try {
      const saved = localStorage.getItem('ec_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  },

  detectFemaleByName(firstName) {
    const lower = firstName.toLowerCase();
    const maleExceptions = [
      "aditya", "shiva", "krishna", "kanhaiya", "ravi", "shashi", 
      "abhi", "mani", "hari", "gopal", "raja", "rana", "urya", "surya", "somya"
    ];
    if (maleExceptions.includes(lower)) return false;

    const femaleNames = [
      "priya", "neha", "pooja", "puja", "anjali", "ritu", "khushi", "sakshi",
      "divya", "kavita", "sunita", "anita", "rekha", "sneha", "kriti", "preeti",
      "priti", "swati", "arti", "aarti", "jyoti", "komal", "payal", "kajal",
      "sonal", "anchal", "muskan", "simran", "tanu", "manu", "annu", "radha",
      "shreya", "tanya", "anya", "riya", "siya", "diya", "nisha", "asha",
      "usha", "meena", "reena", "seema", "alka", "nikita", "ankita", "ishita",
      "harshita", "mansi", "shweta", "namrata", "amrita", "pallavi", "janvi",
      "janhvi", "vaishnavi", "shivani", "himani", "chandni", "roshni", "nandini",
      "shalini", "ragini", "damini", "kamini", "kumari", "devi", "garima", "mahima",
      "pratima", "neelam", "poonam", "sonam", "punam", "shabnam", "parul", "charu"
    ];
    if (femaleNames.includes(lower)) return true;

    return (
      lower.endsWith("a") || lower.endsWith("i") || lower.endsWith("ee") || 
      lower.endsWith("ya") || lower.endsWith("ti") || lower.endsWith("shi") || 
      lower.endsWith("ni") || lower.endsWith("ka")
    );
  },

  getFormattedTitleName() {
    const user = this.getLoggedInUser();
    if (user && user.name && user.name.trim()) {
      const firstName = user.name.trim().split(' ')[0];
      const capitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      let isFemale = false;
      if (user.gender === 'female') isFemale = true;
      else if (user.gender === 'male') isFemale = false;
      else isFemale = this.detectFemaleByName(firstName);

      const honorific = isFemale ? "Devi Ji" : "Guru";
      const lowerCap = capitalized.toLowerCase();
      if (lowerCap.endsWith("guru") || lowerCap.endsWith("devi") || lowerCap.endsWith("devi ji")) {
        return capitalized;
      }
      return `${capitalized} ${honorific}`;
    }
    return "Guru";
  },

  async askGuru(userQuestion) {
    if (!userQuestion || !userQuestion.trim()) return;
    if (this.isTyping) return;

    const currentUser = this.getLoggedInUser();
    if (!currentUser) {
      this.speak("🔒 Arey Guru! Pehle upar 'Mobile Login' button se apna naam daal kar login kar lo, fir aaram se baith kar baat karenge! 🔱");
      if (typeof openAuthModal === 'function') {
        setTimeout(() => openAuthModal(), 1200);
      }
      return;
    }

    const studentTitle = this.getFormattedTitleName();
    this.isTyping = true;
    this.showThinking();

    const systemInstruction = `Tum "Guru Ji" ho — India ke sabse anubhavi competitive exam mentor.
Student ka naam "${studentTitle}" hai.

${this.examFactsheet}

STRICT RULES:
1. Hamesha desi aur natural HINGLISH (Hindi in English script) me baat karo. Pure English me kabhi reply mat do!
2. Student ko pyar aur samman se "${studentTitle}" keh kar bulao.
3. Exam pattern puchne par upar diye gaye OFFICIAL EXAM PATTERNS ka exact sahi data hi batao, apni taraf se galat marks ya questions bilkul mat jodna!
4. Jawab crisp, sacha aur motivatonal rakho.
5. Aakhir me Hindi/Hinglish me hi Mahadev ka aashirwad do (jaise: "Bholebaba se prarthna hai ki is baar ${studentTitle} ki pakki sarkari naukri lage! Har Har Mahadev! 🔱").`;

    this.chatHistory.push({ role: "user", content: userQuestion });
    if (this.chatHistory.length > 6) {
      this.chatHistory.shift();
    }

    // 1. LIVE AI CALL (Temperature 0.3 taaki facts 100% accurate rahein)
    try {
      const response = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai",
          messages: [
            { role: "system", content: systemInstruction },
            ...this.chatHistory
          ],
          temperature: 0.3
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content;
        if (aiReply) {
          this.isTyping = false;
          this.chatHistory.push({ role: "assistant", content: aiReply });
          this.speak(aiReply.trim());
          return;
        }
      }
    } catch (err) {
      console.warn("Switching to Direct GET Stream...");
    }

    // 2. BACKUP LIVE AI CALL
    try {
      const fullPrompt = `${systemInstruction}\n\nStudent (${studentTitle}) asks: "${userQuestion}"\nReply strictly in Hinglish with 100% accurate Indian exam facts:`;
      const encodedPrompt = encodeURIComponent(fullPrompt);
      const randomSeed = Math.floor(Math.random() * 100000);
      const url = `https://text.pollinations.ai/${encodedPrompt}?model=openai&seed=${randomSeed}`;

      const res = await fetch(url);
      if (res.ok) {
        const textReply = await res.text();
        if (textReply && textReply.trim().length > 5) {
          this.isTyping = false;
          this.chatHistory.push({ role: "assistant", content: textReply.trim() });
          this.speak(textReply.trim());
          return;
        }
      }
    } catch (err2) {
      console.error("Network Error:", err2);
    }

    this.isTyping = false;
    this.speak(`Arey ${studentTitle}! Lagta hai aapka internet connection thoda weak ho gaya hai. Ek baar net check karke dobara puchiye! Har Har Mahadev! 🔱`);
  },

  showThinking() {
    const studentTitle = this.getFormattedTitleName();
    const box = document.getElementById('guruSpeechBox');
    const text = document.getElementById('guruSpeechText');
    if (box && text) {
      text.innerHTML = `<span class="animate-pulse text-amber-600 font-bold">🧘‍♂️ Guru Ji ${studentTitle} ke liye soch rahe hain...</span>`;
      box.classList.remove('hidden');
    }
  },

  speak(message) {
    const box = document.getElementById('guruSpeechBox');
    const text = document.getElementById('guruSpeechText');
    if (!box || !text) return;
    text.innerText = message;
    box.classList.remove('hidden');
  },

  dismiss() {
    const box = document.getElementById('guruSpeechBox');
    if (box) box.classList.add('hidden');
  },

  toggleBox() {
    const box = document.getElementById('guruSpeechBox');
    if (!box) return;
    box.classList.toggle('hidden');
    const input = document.getElementById('guruUserInput');
    if (input && !box.classList.contains('hidden')) {
      input.focus();
    }
  },

  openAndAsk(question) {
    const box = document.getElementById('guruSpeechBox');
    if (box) box.classList.remove('hidden');
    this.askGuru(question);
  },

  askExamGoal() {
    const studentTitle = this.getFormattedTitleName();
    this.askGuru(`Mera naam ${studentTitle} hai, mujhse haal-chaal pucho aur pucho ki aaj kaunse exam ka mock lagane ka plan hai?`);
  },

  randomTip() {
    this.askGuru("Mujhe aaj ki padhai ke liye ek tagda desi motivation aur exam tip do!");
  }
};
