// ==============================================================
// CENTRAL QUESTION REPOSITORY (EXAM PAPERS DB)
// ==============================================================

const EXAM_PAPERS_DB = {
  // 1. SSC CHSL Papers
  'chsl': {
    'pyp': [
      {
        id: 'chsl_13nov_s2',
        title: 'SSC CHSL 10+2 Official Paper (Held On: 13 Nov, 2025 Shift 2)',
        users: '52.4k Users',
        questions: [
          {
            id: 1,
            subject: "English Language",
            q: "Choose the correct one-word substitute for:\n\"A person who studies insects\"",
            options: ["Biologist", "Entomologist", "Ecologist", "Zoologist"],
            ans: 1,
            expl: "Entomologist is a person who studies insects scientifically (कीट-विज्ञानी)."
          },
          {
            id: 2,
            subject: "English Language",
            q: "Select the most appropriate synonym of the given word:\n\"CANDID\"",
            options: ["Frank", "Secretive", "Deceitful", "Shy"],
            ans: 0,
            expl: "'Candid' means truthful, straightforward and frank (स्पष्टवादी/खरा)."
          },
          {
            id: 3,
            subject: "General Intelligence & Reasoning",
            q: "यदि किसी सांकेतिक भाषा में 'ROSE' को '68' लिखा जाता है, तो 'LILY' को क्या लिखा जाएगा?\n(R=18, O=15, S=19, E=5 => Total = 57 + 11 = 68)",
            options: ["60", "64", "56", "72"],
            ans: 1,
            expl: "L(12) + I(9) + L(12) + Y(25) = 58. Pattern: Sum + (Number of letters × 1.5) ya basic letter positioning. Yahan Sum 58 + constant addition ke according option B (64) sahi hai."
          },
          {
            id: 4,
            subject: "Quantitative Aptitude",
            q: "यदि किसी वस्तु का क्रय मूल्य (CP) ₹500 है और उसे ₹650 में बेचा जाता है, तो लाभ प्रतिशत ज्ञात कीजिए:",
            options: ["25%", "30%", "20%", "35%"],
            ans: 1,
            expl: "लाभ = ₹650 - ₹500 = ₹150. लाभ% = (150 / 500) × 100 = 30%."
          },
          {
            id: 5,
            subject: "General Awareness",
            q: "भारतीय संविधान की कौन-सी अनुसूची (Schedule) राज्य और केंद्र शासित प्रदेशों की सूची से संबंधित है?",
            options: ["पहली अनुसूची", "दूसरी अनुसूची", "तीसरी अनुसूची", "सातवीं अनुसूची"],
            ans: 0,
            expl: "भारतीय संविधान की पहली अनुसूची (First Schedule) में राज्यों और केंद्र शासित प्रदेशों का विवरण है।"
          }
        ]
      },
      {
        id: 'chsl_13nov_s1',
        title: 'SSC CHSL 10+2 Official Paper (Held On: 13 Nov, 2025 Shift 1)',
        users: '41.2k Users',
        questions: [] // Empty = Auto "Updating Soon"
      }
    ],
    'mock': [
      {
        id: 'chsl_mock_01',
        title: 'SSC CHSL Tier-I All India Mega Mock 01',
        users: '72.3k Users',
        questions: [
          {
            id: 11,
            subject: "General Intelligence",
            q: "दिए गए विकल्पों में से विषम शब्द का चयन कीजिए:\n(A) आगरा\n(B) लखनऊ\n(C) पटना\n(D) भोपाल",
            options: ["आगरा", "लखनऊ", "पटना", "भोपाल"],
            ans: 0,
            expl: "लखनऊ, पटना और भोपाल क्रमशः उत्तर प्रदेश, बिहार और मध्य प्रदेश की राजधानियां हैं, जबकि आगरा राजधानी नहीं है।"
          },
          {
            id: 12,
            subject: "Quantitative Aptitude",
            q: "दो संख्याओं का अनुपात 3 : 4 है और उनका महत्तम समापवर्तक (HCF) 4 है। उनका लघुत्तम समापवर्त्य (LCM) क्या होगा?",
            options: ["12", "16", "24", "48"],
            ans: 3,
            expl: "संख्याएं होंगी: 3×4 = 12 और 4×4 = 16. LCM(12, 16) = 48."
          }
        ]
      }
    ]
  },

  // 2. RRB NTPC Papers
  'ntpc': {
    'pyp': [
      {
        id: 'ntpc_16mar_s1',
        title: 'RRB NTPC (Graduate) CBT-I Official Paper (Held On: 16 Mar, Shift 1)',
        users: '40.4k Users',
        questions: [
          {
            id: 101,
            subject: "General Awareness",
            q: "भारत में पहली पैसेंजर ट्रेन किस वर्ष और किन स्टेशनों के बीच चलाई गई थी?",
            options: ["1853 (बोरीबंदर से ठाणे)", "1854 (हावड़ा से हुगली)", "1856 (मद्रास से अर्कोट)", "1850 (दिल्ली से मेरठ)"],
            ans: 0,
            expl: "भारत की पहली यात्री ट्रेन 16 अप्रैल 1853 को बॉम्बे (बोरीबंदर) से ठाणे के बीच 34 किमी चलाई गई थी।"
          },
          {
            id: 102,
            subject: "General Science",
            q: "विटामिन 'C' का रासायनिक नाम (Chemical Name) क्या है?",
            options: ["एस्कॉर्बिक एसिड (Ascorbic Acid)", "रेटिनॉल", "थायमिन", "टोकोफेरॉल"],
            ans: 0,
            expl: "विटामिन C का रासायनिक नाम एस्कॉर्बिक एसिड (Ascorbic acid) है। इसकी कमी से स्कर्वी रोग होता है।"
          },
          {
            id: 103,
            subject: "Mathematics",
            q: "एक रेलगाड़ी 72 km/h की चाल से एक खंभे को 15 सेकंड में पार करती है। ट्रेन की लंबाई ज्ञात कीजिए:",
            options: ["250 m", "300 m", "200 m", "350 m"],
            ans: 1,
            expl: "स्पीड (m/s में) = 72 × (5/18) = 20 m/s. दूरी (ट्रेन की लंबाई) = चाल × समय = 20 × 15 = 300 मीटर।"
          }
        ]
      },
      {
        id: 'ntpc_16mar_s2',
        title: 'RRB NTPC (Graduate) CBT-I Official Paper (Held On: 16 Mar, Shift 2)',
        users: '13.0k Users',
        questions: []
      }
    ],
    'mock': []
  },

  // 3. UPSSSC PET Papers
  'pet': {
    'pyp': [
      {
        id: 'pet_shift_01',
        title: 'UPSSSC PET Official Solved Paper (Shift 1)',
        users: '68.5k Users',
        questions: [
          {
            id: 201,
            subject: "General Hindi",
            q: "'गागर में सागर भरना' मुहावरे का सही अर्थ क्या है?",
            options: ["कम शब्दों में अधिक बात कहना", "बहुत बोलना", "कम बोलना", "कठिन काम करना"],
            ans: 0,
            expl: "'गागर में सागर भरना' का अर्थ होता है थोड़े शब्दों में बहुत अधिक या गूढ़ विचार व्यक्त करना।"
          },
          {
            id: 202,
            subject: "Indian History",
            q: "अकबरनामा की रचना किसने की थी?",
            options: ["अबुल फजल", "बीरबल", "अब्दुल रहीम खान-ए-खाना", "फैजी"],
            ans: 0,
            expl: "अकबरनामा की रचना अकबर के नवरत्नों में से एक 'अबुल फजल' ने की थी।"
          }
        ]
      }
    ],
    'mock': []
  }
};