// ==============================================================
// REAL GURU JI LIVE AI ENGINE (ZERO-KEY CLOUD AI + GEMINI + SMART FALLBACK)
// ==============================================================

const GOOGLE_API_KEY = "AIzaSyBLkkf-XlGUixUIByiaGuYXptYbg3USBMo";

const GuruAI = {
  systemPrompt: `You are "Guru Ji", an affectionate, energetic Indian competitive exam mentor for SSC, Stenographer, Railway, UPSSSC, Police, and Defence exams.
Strict Rules:
1. Always address the student as "Guru" (e.g., "Arey Guru!", "Suno Guru!").
2. Speak in natural Hinglish (Hindi written in English script or simple Hindi).
3. Keep answers crisp, practical, and to-the-point (max 3-4 lines). If they ask a GK/Math/Reasoning/English question, solve it directly.
4. MUST end every single message with this exact blessing: "All the best Guru! Mahadev se me kamna karta hu apki job lage. Har Har Mahadev! 🔱"`,

  isTyping: false,

  async askGuru(userQuestion) {
    if (!userQuestion || !userQuestion.trim()) return;
    if (this.isTyping) return;

    this.isTyping = true;
    this.showThinking();

    // 1. LIVE CLOUD AI ENGINE (Works 100% Free Without Any Key Setup)
    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: this.systemPrompt },
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

    // 2. BACKUP: GOOGLE GEMINI API
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`;
      const res = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: this.systemPrompt }] },
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

    // 3. OFFLINE FALLBACK (Agar internet slow ho tab bhi kabhi fail na ho)
    setTimeout(() => {
      this.isTyping = false;
      const reply = this.generateSmartReply(userQuestion.toLowerCase());
      this.speak(reply);
    }, 400);
  },

  generateSmartReply(q) {
    const blessing = "\n\nAll the best Guru! Mahadev se me kamna karta hu apki job lage. Har Har Mahadev! 🔱";

    if (q.includes("ssc") || q.includes("cgl") || q.includes("chsl") || q.includes("mts") || q.includes("gd")) {
      return `Arey Guru! SSC crack karne ka sabse bada mantra hai—Previous Year Questions (PYP) par 100% pakad! Roz 1 full mock lagao aur apni galtiyon ki alag notebook banao.${blessing}`;
    }
    if (q.includes("steno") || q.includes("shorthand") || q.includes("dictation")) {
      return `Suno Guru! Steno me selection Reasoning, GS aur English ke dam par pakka hota hai, aur skill test me roz 2 ghante Rishi Pranali outlines aur dictation ki practice karo.${blessing}`;
    }
    if (q.includes("railway") || q.includes("ntpc") || q.includes("group d") || q.includes("rrb")) {
      return `Arey Guru! Railway NTPC aur Group D ke liye Maths, Reasoning aur General Science (NCERT) par sabse zyada focus rakho. Speed aur accuracy hi aapko merit me layegi!${blessing}`;
    }
    if (q.includes("up") || q.includes("pet") || q.includes("police") || q.includes("ro") || q.includes("upsssc")) {
      return `Guru! UP Exams ke liye Hindi, Static GK aur UP Special ko roz revise karo. Mock test me negative marking se bachna hi asli khel hai!${blessing}`;
    }
    if (q.includes("math") || q.includes("quant") || q.includes("calculation")) {
      return `Arey Guru! Maths me speed badhane ke liye 1 se 30 tak tables, squares aur cubes yaad rakho, aur roz 25 mixed questions timer laga kar solve karo.${blessing}`;
    }
    if (q.includes("reasoning") || q.includes("tarkshakti")) {
      return `Guru! Reasoning to aapka scoring weapon hai! Number series, coding-decoding aur syllogism ke daily 1 set lagao, poore marks aayenge.${blessing}`;
    }
    if (q.includes("gk") || q.includes("gs") || q.includes("current")) {
      return `Suno Guru! GK/GS ke liye Static GK (Dance, Festivals, Articles) aur pichle 6 mahine ke Current Affairs ko bar-bar revise karo.${blessing}`;
    }
    if (q.includes("english") || q.includes("vocab")) {
      return `Arey Guru! English me darna bilkul nahi hai. PYP se daily 20 One-Word, Idioms aur Grammar rules padho, score rocket ki tarah badhega!${blessing}`;
    }
    if (q.includes("speed") || q.includes("time") || q.includes("negative") || q.includes("score") || q.includes("marks")) {
      return `Guru! Marks tabhi badhenge jab aap mock dene ke baad 30 minute uske solutions ka analysis karoge. Jin questions me 50-50 doubt ho, unme tukka bilkul mat maro!${blessing}`;
    }

    return `Arey Guru! Aapka sawal bilkul sahi hai. Kisi bhi exam ko fodne ke liye 3 cheezein pakad lo: Syllabus complete karo, roz PYP Mock lagao aur revision kabhi mat chhodo!${blessing}`;
  },

  showThinking() {
    const box = document.getElementById('guruSpeechBox');
    const text = document.getElementById('guruSpeechText');
    if (box && text) {
      text.innerHTML = `<span class="animate-pulse text-amber-600 font-bold">Guru Ji aapke sawal par vichar kar rahe hain... 🔱</span>`;
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
    this.speak("Radhe Radhe Guru! Batao abhi aap kis target exam (SSC, Steno, Railway, UPSSSC ya Defence) ki taiyari kar rahe ho? Niche box me koi bhi sawal pucho!\n\nAll the best Guru! Mahadev se me kamna karta hu apki job lage. Har Har Mahadev! 🔱");
  },

  randomTip() {
    this.askGuru("Exam me negative marking se kaise bache aur speed kaise badhaye?");
  }
};