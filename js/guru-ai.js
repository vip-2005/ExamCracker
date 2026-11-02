// ==============================================================
// GURU JI AI ENGINE (NAME + GURU FORMAT: "VISHAL GURU", "RAJAT GURU")
// ==============================================================

const GOOGLE_API_KEY = "AIzaSyBLkkf-XlGUixUIByiaGuYXptYbg3USBMo";

const GuruAI = {
  isTyping: false,

  // Logged-in student ki details nikalna
  getLoggedInUser() {
    try {
      const saved = localStorage.getItem('ec_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  },

  // Naam ke baad "Guru" lagane wala helper (e.g., "Vishal Guru", "Rajat Guru")
  getFormattedGuruName() {
    const user = this.getLoggedInUser();
    if (user && user.name && user.name.trim()) {
      const cleanName = user.name.trim();
      const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      // Agar user ne pehle se naam me Guru nahi likha hai to jod dein
      return capitalized.toLowerCase().endsWith("guru") ? capitalized : `${capitalized} Guru`;
    }
    return "Guru";
  },

  async askGuru(userQuestion) {
    if (!userQuestion || !userQuestion.trim()) return;
    if (this.isTyping) return;

    // 1. Check: Kya student ne login kiya hai?
    const currentUser = this.getLoggedInUser();
    if (!currentUser) {
      this.speak("🔒 Arey Guru! Mujhse sawal puchne aur guidance lene ke liye pehle apne Mobile Number aur Naam se Login kar lo!\n\nAll the best Guru! Mahadev se me kamna karta hu apki job lage. Har Har Mahadev! 🔱");
      if (typeof openAuthModal === 'function') {
        setTimeout(() => openAuthModal(), 1000);
      }
      return;
    }

    const studentTitle = this.getFormattedGuruName(); // e.g., "Vishal Guru" or "Rajat Guru"
    this.isTyping = true;
    this.showThinking();

    const personalizedPrompt = `You are "Guru Ji", an affectionate, energetic Indian competitive exam mentor for SSC, Stenographer, Railway, UPSSSC, Police, and Defence exams.
Strict Rules:
1. ALWAYS address the student as "${studentTitle}" (for example: "Arey ${studentTitle}!", "Suno ${studentTitle}!"). Put "Guru" AFTER their name, never before.
2. Answer all exam, study, syllabus, GK, Maths, Reasoning, English, Hindi, Steno, and career questions accurately in natural Hinglish (max 3-4 lines).
3. MUST end every single message with this exact blessing: "All the best ${studentTitle}! Mahadev se me kamna karta hu apki job lage. Har Har Mahadev! 🔱"`;

    // 2. LIVE CLOUD AI ENGINE
    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: personalizedPrompt },
            { role: "user", content: userQuestion }
          ],
          model: "openai"
        })
      });

      if (response.ok) {
        const aiText = await response.text();
        if (aiText && aiText.trim().length > 5) {
          this.isTyping = false;
          this.speak(aiText.trim());
          return;
        }
      }
    } catch (err) {
      console.warn("Primary Cloud AI busy, checking backup...");
    }

    // 3. BACKUP: GOOGLE GEMINI API
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`;
      const res = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: personalizedPrompt }] },
          contents: [{ role: "user", parts: [{ text: userQuestion }] }]
        })
      });

      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        this.isTyping = false;
        this.speak(data.candidates[0].content.parts[0].text);
        return;
      }
    } catch (e) {
      console.warn("Switching to Offline Guru Brain...");
    }

    // 4. OFFLINE FALLBACK
    setTimeout(() => {
      this.isTyping = false;
      const reply = this.generateSmartReply(userQuestion.toLowerCase(), studentTitle);
      this.speak(reply);
    }, 400);
  },

  generateSmartReply(q, studentTitle) {
    const blessing = `\n\nAll the best ${studentTitle}! Mahadev se me kamna karta hu apki job lage. Har Har Mahadev! 🔱`;

    if (q.includes("ssc") || q.includes("cgl") || q.includes("chsl") || q.includes("mts") || q.includes("gd")) {
      return `Arey ${studentTitle}! SSC crack karne ka sabse bada mantra hai—Previous Year Questions (PYP) par 100% pakad! Roz 1 full mock lagao aur apni galtiyon ki alag notebook banao.${blessing}`;
    }
    if (q.includes("steno") || q.includes("shorthand") || q.includes("dictation")) {
      return `Suno ${studentTitle}! Steno me selection Reasoning, GS aur English ke dam par pakka hota hai, aur skill test me roz 2 ghante Rishi Pranali outlines aur dictation ki practice karo.${blessing}`;
    }
    if (q.includes("railway") || q.includes("ntpc") || q.includes("group d") || q.includes("rrb")) {
      return `Arey ${studentTitle}! Railway NTPC aur Group D ke liye Maths, Reasoning aur General Science (NCERT) par sabse zyada focus rakho.${blessing}`;
    }
    if (q.includes("up") || q.includes("pet") || q.includes("police") || q.includes("ro") || q.includes("upsssc")) {
      return `Suno ${studentTitle}! UP Exams ke liye Hindi, Static GK aur UP Special ko roz revise karo. Mock test me negative marking se bachna hi asli khel hai!${blessing}`;
    }
    if (q.includes("math") || q.includes("quant") || q.includes("calculation")) {
      return `Arey ${studentTitle}! Maths me speed badhane ke liye 1 se 30 tak tables, squares aur cubes yaad rakho, aur roz 25 mixed questions timer laga kar solve karo.${blessing}`;
    }
    if (q.includes("reasoning") || q.includes("tarkshakti")) {
      return `Arey ${studentTitle}! Reasoning to aapka scoring weapon hai! Number series, coding-decoding aur syllogism ke daily 1 set lagao, poore marks aayenge.${blessing}`;
    }
    if (q.includes("gk") || q.includes("gs") || q.includes("current")) {
      return `Suno ${studentTitle}! GK/GS ke liye Static GK (Dance, Festivals, Articles) aur pichle 6 mahine ke Current Affairs ko bar-bar revise karo.${blessing}`;
    }
    if (q.includes("english") || q.includes("vocab")) {
      return `Arey ${studentTitle}! English me PYP se daily 20 One-Word, Idioms aur Grammar rules padho, score rocket ki tarah badhega!${blessing}`;
    }

    return `Arey ${studentTitle}! Aapka sawal bilkul sahi hai. Kisi bhi exam ko fodne ke liye 3 cheezein pakad lo: Syllabus complete karo, roz PYP Mock lagao aur revision kabhi mat chhodo!${blessing}`;
  },

  showThinking() {
    const studentTitle = this.getFormattedGuruName();
    const box = document.getElementById('guruSpeechBox');
    const text = document.getElementById('guruSpeechText');
    if (box && text) {
      text.innerHTML = `<span class="animate-pulse text-amber-600 font-bold">Guru Ji ${studentTitle} ke sawal par vichar kar rahe hain... 🔱</span>`;
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
    const studentTitle = this.getFormattedGuruName();
    this.speak(`Radhe Radhe ${studentTitle}! Batao abhi aap kis target exam (SSC, Steno, Railway, UPSSSC ya Defence) ki taiyari kar rahe ho? Niche box me koi bhi sawal pucho!\n\nAll the best ${studentTitle}! Mahadev se me kamna karta hu apki job lage. Har Har Mahadev! 🔱`);
  },

  randomTip() {
    this.askGuru("Exam me negative marking se kaise bache aur speed kaise badhaye?");
  }
};