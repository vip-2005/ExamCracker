// ==============================================================
// GURU JI 100% LIVE AI (BOYS = "NAME GURU" | GIRLS = "NAME DEVI JI")
// ==============================================================

const GuruAI = {
  isTyping: false,
  chatHistory: [],

  // Logged-in student ki details nikalna
  getLoggedInUser() {
    try {
      const saved = localStorage.getItem('ec_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  },

  // Naam se pehchanna ki Girl hai ya Boy (Agar gender auto ho)
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

    if (
      lower.endsWith("a") || 
      lower.endsWith("i") || 
      lower.endsWith("ee") || 
      lower.endsWith("ya") || 
      lower.endsWith("ti") || 
      lower.endsWith("shi") || 
      lower.endsWith("ni") || 
      lower.endsWith("ka")
    ) {
      return true;
    }

    return false;
  },

  // Ladko ke liye "Vishal Guru", Ladkiyon ke liye "Priya Devi Ji"
  getFormattedTitleName() {
    const user = this.getLoggedInUser();
    if (user && user.name && user.name.trim()) {
      const firstName = user.name.trim().split(' ')[0];
      const capitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      let isFemale = false;
      if (user.gender === 'female') {
        isFemale = true;
      } else if (user.gender === 'male') {
        isFemale = false;
      } else {
        isFemale = this.detectFemaleByName(firstName);
      }

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

    // 1. Check Login
    const currentUser = this.getLoggedInUser();
    if (!currentUser) {
      this.speak("🔒 Arey Guru! Pehle upar 'Mobile Login' button se apna naam daal kar login kar lo, fir aaram se baith kar baat karenge! 🔱");
      if (typeof openAuthModal === 'function') {
        setTimeout(() => openAuthModal(), 1200);
      }
      return;
    }

    const studentTitle = this.getFormattedTitleName(); // e.g., "Vishal Guru" or "Priya Devi Ji"
    this.isTyping = true;
    this.showThinking();

    const systemInstruction = `Tum "Guru Ji" ho — ek asli, desi, bade bhai/guru jaise sneh karne wale aur behad intelligent competitive exam mentor.
Student ka sambodhan "${studentTitle}" hai.

Tumhara baat karne ka tarika:
1. Bilkul natural insaan ki tarah Hinglish me baat karo. Kabhi bhi ratta-rataya ya robotic jawab mat do!
2. Student ko baat-baat me aadar aur sneh se "${studentTitle}" keh kar hi bulao (Agar "${studentTitle}" me 'Devi Ji' laga hai toh samajh jao student ladki hai aur unse aadar-purvak 'karti hain / padhti hain' keh kar baat karo, aur 'Guru' laga hai toh ladka hai—usi hisab se baat karo).
3. Agar student koi Maths, Reasoning, English, Hindi, Shorthand/Steno ya GK ka sawal puche, toh turant uska exact solution ya trick samjhao. Agar wo normal haal-chaal ya demotivation ki baat kare, toh uska hausla badhao.
4. Jawab chhota, point-to-point aur mazedar rakho (3-4 lines).
5. Baat ke aakhir me natural tarike se Mahadev se "${studentTitle}" ki sarkari job lagne ki prarthna/aashirwad do.`;

    this.chatHistory.push({ role: "user", content: userQuestion });
    if (this.chatHistory.length > 6) {
      this.chatHistory.shift();
    }

    // 2. DIRECT LIVE AI CALL (Method A: POST with Memory)
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
          temperature: 0.8
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

    // 3. BACKUP LIVE AI CALL (Method B: Simple GET URL)
    try {
      const fullPrompt = `${systemInstruction}\n\nStudent (${studentTitle}) says: "${userQuestion}"\nGuru Ji's natural reply:`;
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
