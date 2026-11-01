const GuruAI = {
  tips: [
    "Guru! Negative marking se bachna hi SSC aur Railway me selection ka asli mantra hai.",
    "Arey Guru! GS me tukka mat lagana, Maths aur Reasoning me accuracy 100% rakhne ki koshish karo.",
    "Guru! Mahadev ki kripa se mehnat ka fal zaroor milega. Har din ek shift lagao aur analysis karo!",
    "Guru! English me One-Word Substitution aur Idioms regular revise karo, score boost hoga."
  ],

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

  randomTip() {
    const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
    this.speak(tip + " 🔱 All the best Guru!");
  }
};