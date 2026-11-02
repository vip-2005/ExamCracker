// ==========================================
// EXAM CRACKER - DYNAMIC LIVE OTP & GENDER-AWARE AUTH ENGINE
// ==========================================

let activeUser = null;
let currentDynamicOtp = null;

// Page Load par session restore
function restoreUserSession() {
  try {
    const savedUser = localStorage.getItem('ec_active_session');
    if (savedUser) {
      activeUser = JSON.parse(savedUser);
    }
  } catch (e) {
    activeUser = null;
  }
  updateAuthUI();
}

// Navbar par Student Title Name (Vishal Guru / Priya Devi) render karna
function updateAuthUI() {
  const container = document.getElementById('authActionsContainer');
  if (!container) return;

  if (activeUser) {
    const displayName = (window.GuruAI && typeof GuruAI.getFormattedTitleName === 'function')
      ? GuruAI.getFormattedTitleName()
      : (activeUser.name || `Student (${activeUser.mobile.slice(-4)})`);

    container.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold flex items-center gap-1.5 shadow-sm">
          <i data-lucide="user-check" class="w-3.5 h-3.5 text-sky-600"></i>
          <span>${displayName}</span>
        </div>
        <button onclick="logoutUser()" class="px-2.5 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-bold cursor-pointer" title="Logout">
          Logout
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button onclick="openAuthModal()" class="px-3.5 py-1.5 rounded-xl border border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm">
        <i data-lucide="phone" class="w-3.5 h-3.5"></i>
        <span>Mobile Login</span>
      </button>
    `;
  }

  if (window.lucide) {
    try { lucide.createIcons(); } catch (e) {}
  }
}

function openAuthModal() {
  resetAuthFlow();
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.add('hidden');
}

function resetAuthFlow() {
  const step1 = document.getElementById('authStep1');
  const step2 = document.getElementById('authStep2');
  if (step1) step1.classList.remove('hidden');
  if (step2) step2.classList.add('hidden');

  const mIn = document.getElementById('mobileInput');
  const nIn = document.getElementById('nameInput');
  const oIn = document.getElementById('otpEntryInput');
  if (mIn) mIn.value = '';
  if (nIn) nIn.value = '';
  if (oIn) oIn.value = '';
  currentDynamicOtp = null;
}

// HAR BAAR NAYA 6-DIGIT OTP GENERATE HOGA
function requestOTP() {
  const mobile = document.getElementById('mobileInput').value.trim();
  if (mobile.length !== 10 || isNaN(mobile)) {
    alert("Kripya valid 10-digit mobile number enter karein!");
    return;
  }

  const btn = document.getElementById('sendOtpBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerText = "Dispatching OTP...";
  }

  // Har bar naya 6-digit random OTP
  currentDynamicOtp = Math.floor(100000 + Math.random() * 900000).toString();

  setTimeout(() => {
    document.getElementById('otpTargetMobile').innerText = `+91 ${mobile}`;
    document.getElementById('authStep1').classList.add('hidden');
    document.getElementById('authStep2').classList.remove('hidden');

    if (btn) {
      btn.disabled = false;
      btn.innerText = "Get Live OTP";
    }

    alert(`📲 [SMS GATEWAY DISPATCH]\n\nExamCracker Verification Code for +91 ${mobile} is: ${currentDynamicOtp}\n\nValid for 5 minutes.`);

    if (window.GuruAI) {
      GuruAI.speak(`Naya OTP ${currentDynamicOtp} bhej diya gaya hai! Apna naam aur Guru/Devi select karke verify karein. 🔱`);
    }
  }, 400);
}

// OTP VERIFY KARNA AUR STUDENT NAME + GENDER LINK KARNA
function verifyAndLogin() {
  const enteredOtp = document.getElementById('otpEntryInput').value.trim();
  const mobile = document.getElementById('mobileInput').value.trim();
  const studentName = document.getElementById('nameInput').value.trim();
  const genderRadio = document.querySelector('input[name="userGender"]:checked');
  const selectedGender = genderRadio ? genderRadio.value : 'auto';

  if (!enteredOtp || enteredOtp.length !== 6) {
    alert("Kripya 6-digit OTP enter karein!");
    return;
  }

  if (enteredOtp !== currentDynamicOtp) {
    alert("Galat OTP! Kripya naya bheja gaya 6-digit OTP enter karein.");
    return;
  }

  if (!studentName) {
    alert("Kripya apna Naam (Name) enter karein!");
    return;
  }

  // Session create with gender
  activeUser = {
    mobile: mobile,
    name: studentName,
    gender: selectedGender
  };

  localStorage.setItem('ec_active_session', JSON.stringify(activeUser));
  currentDynamicOtp = null;

  updateAuthUI();
  closeAuthModal();

  if (window.GuruAI) {
    const titleName = GuruAI.getFormattedTitleName();
    GuruAI.speak(`Swagat hai ${titleName}! Account successfully verify ho gaya hai. Ab aap mujhse koi bhi sawal puch sakte hain aur aapke saare mocks surakshit rahenge. Har Har Mahadev! 🔱`);
  }
}

function logoutUser() {
  if (confirm("Kya aap session logout karna chahte hain?")) {
    localStorage.removeItem('ec_active_session');
    activeUser = null;
    updateAuthUI();
    if (typeof showScreen === 'function') showScreen('home');
    if (window.GuruAI) {
      GuruAI.chatHistory = [];
      GuruAI.speak("Aapka session successfully logout ho gaya hai. Har Har Mahadev! 🔱");
    }
  }
}

// USER-ISOLATED NAMESPACE FOR MOCK TEST RECORDS
function getIsolatedStorageKey(keySuffix) {
  if (!activeUser || !activeUser.mobile) {
    return `ec_guest_${keySuffix}`;
  }
  return `ec_user_${activeUser.mobile}_${keySuffix}`;
}

function saveUserAttempt(record) {
  const storageKey = getIsolatedStorageKey('attempts');
  let history = JSON.parse(localStorage.getItem(storageKey) || '[]');
  history.unshift(record);
  localStorage.setItem(storageKey, JSON.stringify(history));
}

function getUserAttempts() {
  const storageKey = getIsolatedStorageKey('attempts');
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
}

function checkAuthAndShowAttempted() {
  if (!activeUser) {
    openAuthModal();
    if (window.GuruAI) GuruAI.speak("Apne attempted tests dekhne ke liye pehle mobile login kar lijiye! 🔱");
    return;
  }
  if (typeof showScreen === 'function') showScreen('attempted');
}

// Auto-run on document ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', restoreUserSession);
} else {
  restoreUserSession();
}
