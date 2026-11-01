// Target Exams Metadata (SSC, Railway, State, Defence)
const TARGET_EXAMS = [
  // 1. SSC
  { id: 'chsl', cat: 'ssc', name: 'SSC CHSL', sub: '10+2 Combined Higher Secondary', tests: 450, icon: '📝', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'cgl', cat: 'ssc', name: 'SSC CGL', sub: 'Combined Graduate Level', tests: 520, icon: '🏛️', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'cpo', cat: 'ssc', name: 'SSC CPO SI', sub: 'Central Police Organisation', tests: 25, icon: '⭐', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'gd', cat: 'ssc', name: 'SSC GD Constable', sub: 'CAPFs & Rifleman GD', tests: 340, icon: '🛡️', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'steno', cat: 'ssc', name: 'SSC Stenographer', sub: 'Grade C & D Exam', tests: 180, icon: '✍️', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'mts', cat: 'ssc', name: 'SSC MTS & Havaldar', sub: 'Multi-Tasking Staff', tests: 40, icon: '📋', color: 'bg-amber-50 text-amber-700 border-amber-200' },

  // 2. RAILWAY
  { id: 'ntpc', cat: 'railway', name: 'RRB NTPC', sub: 'Graduate & Under Graduate', tests: 837, icon: '🚆', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'groupd', cat: 'railway', name: 'RRB Group D', sub: 'Level 1 Trackman & Staff', tests: 420, icon: '🛤️', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'alp', cat: 'railway', name: 'RRB ALP', sub: 'Assistant Loco Pilot', tests: 35, icon: '⚙️', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'tech', cat: 'railway', name: 'RRB Technician', sub: 'Grade I & Grade III', tests: 28, icon: '🔧', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'rpf', cat: 'railway', name: 'RPF SI & Constable', sub: 'Railway Protection Force', tests: 32, icon: '👮', color: 'bg-rose-50 text-rose-700 border-rose-200' },

  // 3. STATE / UPSSSC
  { id: 'pet', cat: 'state', name: 'UPSSSC PET', sub: 'Preliminary Eligibility Test', tests: 210, icon: '📜', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'upp', cat: 'state', name: 'UP Police Constable', sub: 'Direct Recruitment 60K+', tests: 250, icon: '🚨', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'upsi', cat: 'state', name: 'UP Police Sub Inspector', sub: 'Daroga Bharti Online Test', tests: 25, icon: '⭐', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'lekhpal', cat: 'state', name: 'UP Rajasva Lekhpal', sub: 'Revenue Lekhpal Mains', tests: 20, icon: '🗺️', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'roaro', cat: 'state', name: 'UPPSC RO / ARO', sub: 'Review Officer & Assistant', tests: 24, icon: '🏛️', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },

  // 4. DEFENCE
  { id: 'cds', cat: 'defence', name: 'UPSC CDS', sub: 'Combined Defence Services (IMA/OTA)', tests: 35, icon: '⚔️', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'nda', cat: 'defence', name: 'UPSC NDA', sub: 'National Defence Academy', tests: 30, icon: '🎖️', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'afcat', cat: 'defence', name: 'Air Force AFCAT', sub: 'Flying & Ground Duty Branch', tests: 22, icon: '✈️', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'agniveer', cat: 'defence', name: 'Army GD Agniveer', sub: 'Agniveer General Duty', tests: 40, icon: '🪖', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
];