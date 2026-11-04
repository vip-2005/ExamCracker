// ==============================================================
// GURU JI FULL-BRAIN AI ENGINE (HIGH-INTELLIGENCE + UNRESTRICTED)
// ==============================================================

const GuruAI = {
  isTyping: false,
  chatHistory: [],

  // Official Exam Knowledge Base
  examFactsheet: `
Important Indian Exam Patterns (Use when asked about pattern/syllabus):
- SSC MTS: 90 Qs, 270 Marks, 90 Mins. Session-1: Maths (20 Q) + Reasoning (20 Q) [Qualifying, No Negative]. Session-2: GA/GK (25 Q, 75 Marks) + English (25 Q, 75 Marks) [Merit based on Session-2, -1 mark negative].
- SSC Stenographer (Grade C & D): 200 Qs, 200 Marks, 120 Mins, -0.25 negative. Reasoning (50 Q), GA/GK (50 Q), English (100 Q). No Maths! Skill test: 80 wpm (Grade D), 100 wpm (Grade C) Shorthand.
- SSC CGL / CHSL Tier-1: 100 Qs, 200 Marks, 60 Mins, -0.50 negative. Maths (25), Reasoning (25), English (25), GK (25).
- SSC GD: 80 Qs, 160 Marks, 60 Mins, -0.25 negative. Maths (20), Reasoning (20), GK (20), Hindi/English (20).
- UPSSSC PET: 100 Qs, 100 Marks, 120 Mins, -0.25 negative.
- RRB NTPC CBT-1: 100 Qs, 100 Marks, 90 Mins, -1/3 negative. GA (40), Maths (30), Reasoning (30).`,

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
      "shreya", "tanya", "anya", "riya", "siya", "diya", "nisha", "asha"
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

    // Rich, intelligent mentor prompt (No artificial 3-line restriction)
    const systemInstruction = `You are "Guru Ji", a highly intelligent, warm, and deeply knowledgeable AI Mentor (just like Google Gemini) for Indian students.
The student talking to you is "${studentTitle}".

${this.examFactsheet}

How you must respond:
1. Language: Speak in natural conversational Hinglish (Hindi written in English alphabets, e.g., "Dekho ${studentTitle}, is sawal ko aise samjho..."). Never reply in pure formal English.
2. Intelligence: Give complete, well-structured, smart, and accurate answers. If asked a Maths/Reasoning question, solve it step-by-step with a short trick. If asked a GK/GS or English question, explain the concept clearly with bullet points.
3. Tone: Friendly, motivating, and natural like a real human teacher talking to "${studentTitle}".
4. Closing: Naturally wish them success with Mahadev's blessings at the end.`;

    this.chatHistory.push({ role: "user", content: userQuestion });
    if (this.chatHistory.length > 8) {
      this.chatHistory.shift();
    }

    // Try High-Intelligence Models in sequence
    const modelsToTry = ["openai-large", "mistral", "openai"];

    for (const modelName of modelsToTry) {
      try {
        const response = await fetch("https://text.pollinations.ai/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: "system", content: systemInstruction },
              ...this.chatHistory
            ],
            temperature: 0.6
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiReply = data.choices?.[0]?.message?.content;
          if (aiReply && aiReply.trim().length > 10) {
            this.isTyping = false;
            this.chatHistory.push({ role: "assistant", content: aiReply.trim() });
            this.speak(aiReply.trim());
            return;
          }
        }
      } catch (e) {
        console.warn(`Model ${modelName} busy, trying next...`);
      }
    }

    this.isTyping = false;
    this.speak(`Arey ${studentTitle}! Server par thoda traffic zyada hai, ek baar dobara 'Pucho' button dabao! Har Har Mahadev! 🔱`);
  },

  showThinking() {
    const studentTitle = this.getFormattedTitleName();
    const box = document.getElementById('guruSpeechBox');
    const text = document.getElementById('guruSpeechText');
    if (box && text) {
      text.innerHTML = `<span class="animate-pulse text-amber-600 font-bold">🧘‍♂️ Guru Ji ${studentTitle} ke sawal ka vishleshan kar rahe hain...</span>`;
      box.classList.remove('hidden');
    }
  },

  speak(message) {
    const box = document.getElementById('guruSpeechBox');
    const text = document.getElementById('guruSpeechText');
    if (!box || !text) return;
    // Clean markdown stars if any for neat reading
    text.innerText = message.replace(/\*\*/g, '');
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
    this.askGuru(`Namaste Guru Ji! Mera naam ${studentTitle} hai. Mujhse pucho ki meri taiyari kaisi chal rahi hai aur aaj kaunsa topic padhna hai.`);
  },

  randomTip() {
    this.askGuru("Mujhe competitive exam crack karne ki ek practical strategy aur motivation batao.");
  }
};
