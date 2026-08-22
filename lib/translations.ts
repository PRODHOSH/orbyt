export type Language = "en" | "hi" | "ta";

export const TRANSLATIONS: Record<Language, Record<string, any>> = {
  en: {
    // Nav
    "nav.about": "The Message",
    "nav.agent": "AI Agent",
    "nav.workflow": "Workflow",
    "nav.safety": "Safety",
    "nav.modules": "Modules",
    "nav.pillars": "Pillars",
    "nav.faq": "FAQ",
    "nav.ask": "Ask ORBYT",

    // Hero
    "hero.stats.impacted": "OFFICIAL & VERIFIED\nINSTITUTIONAL DATA",
    "hero.stats.mentors": "INSTANT AI\nCAMPUS ASSISTANT",
    "hero.stats.rewards": "UNIFIED PLATFORM\nFOR EVERYTHING",
    "hero.textA": "THE INTELLIGENT CAMPUS OS",
    "hero.applyNow": "Ask ORBYT",
    "hero.secondaryCta": "Explore Campus",
    "hero.applicationsOpen": "One Campus. One Intelligence Layer.",
    "hero.textB": "Built for students. Powered by campus intelligence.",
    "hero.headingWords": ["Your", "Entire", "Campus,", "Finally", "In One Place."],

    // About
    "about.pill": "THE CORE MESSAGE",
    "about.title1": "STOP SEARCHING,",
    "about.title2": "START ASKING.",
    "about.desc": "College data is scattered across portals, PDFs, and group chats. ORBYT brings everything together into one intelligent layer. Ask a question in plain language, get an answer based on your official student data, and take action instantly—all without navigating multiple systems.",
    "about.btn": "EXPLORE CAMPUS",

    // Marquee
    "marquee.words": [
      "ATTENDANCE INTELLIGENCE",
      "ACADEMIC REGULATIONS",
      "CLUB RECRUITMENTS",
      "OPPORTUNITY DISCOVERY",
      "AI RESUME STUDIO",
      "EXAM SCHEDULES",
      "CAMPUS SAFETY ALERTS",
      "DEADLINE TRACKING",
      "INSTITUTIONAL POLICIES",
    ],

    // Sponsors / Campus Ecosystem
    "sponsors.title": "Connected Campus Ecosystem",
    "sponsors.subtitle": "Seamlessly unified with official student portals, handbooks & club systems",
    "sponsors.cta": "EXPLORE ALL MODULES",

    // HowItWorks / Workflow
    "process.label": "THE ORBYT WORKFLOW",
    "process.title": "BEYOND CHAT. ORBYT ACTS.",
    "process.step1": "Ask Plainly",
    "process.step2": "Live Retrieval",
    "process.step3": "Understand",
    "process.step4": "Decide Impact",
    "process.step5": "Execute Action",

    // Timeline / Campus Safety
    "timeline.title1": "CAMPUS",
    "timeline.title2": "SAFETY LAYER",
    "timeline.subtitle": "From incident report to intelligent response in real-time",
    "timeline.date1": "Step 01",
    "timeline.step1.title": "INCIDENT REPORTED",
    "timeline.step1.desc": "Student or staff quickly submits an alert for emergencies, unsafe situations, harassment, infrastructure, or medical concerns.",
    "timeline.date2": "Step 02",
    "timeline.step2.title": "AI CATEGORIZATION",
    "timeline.step2.desc": "ORBYT's intelligence layer parses location, context, and urgency to classify the report under institutional protocols.",
    "timeline.date3": "Step 03",
    "timeline.step3.title": "SEVERITY ASSESSMENT",
    "timeline.step3.desc": "Automated risk rating ensures high-priority emergencies bypass delays and route directly to responders.",
    "timeline.date4": "Step 04",
    "timeline.step4.title": "PERSONNEL ALERTED",
    "timeline.step4.desc": "Instant dispatch notifications trigger campus security, medical first responders, or departmental administrators.",
    "timeline.date5": "Step 05",
    "timeline.step5.title": "TRANSPARENT TRACKING",
    "timeline.step5.desc": "Incident progress is tracked end-to-end and the student receives continuous, confidential status updates.",

    // Features / Knowledge
    "features.title1": "CAMPUS KNOWLEDGE.",
    "features.title2": "TRUSTWORTHY BY DESIGN.",
    "features.desc": "Important academic information is often buried inside hundreds of pages of regulations, circulars, handbooks, notices, and policy documents. ORBYT turns that scattered information into an accessible campus knowledge layer with official institutional citations.",
    "features.cta": "ASK CAMPUS AGENT",
    "features.item1.title": "Academic Regulations",
    "features.item1.desc": "Instant answers on attendance thresholds, debarment rules, exam policies, course registration, leave policies, and fee deadlines.",
    "features.item2.title": "Student Intelligence",
    "features.item2.desc": "A personalized campus feed surfacing attendance risks, matched opportunities, and upcoming deadlines tailored specifically to you.",
    "features.item3.title": "Club & Opportunity Discovery",
    "features.item3.desc": "Never miss a recruitment or hackathon buried in a group chat. 94% profile match recommendations based on your skills and goals.",

    // Elite Perks / Core Modules
    "perks.label": "CAMPUS OS CAPABILITIES",
    "perks.title": "POWERFUL CAMPUS MODULES",
    "perks.desc": "Designed to unify student academics, campus life, professional growth, and safety into a singular intelligent operating system.",
    "perks.sponsored": "CORE MODULE",
    "perks.item1.title": "Academic Intelligence & Risk Alerts",
    "perks.item1.desc": "Know where you stand before it becomes a problem. Track attendance, internal marks, and exam schedules with proactive alerts like 'Your DBMS attendance has dropped 8% over the last month.'",
    "perks.item1.pill": "Proactive Academic Alerts",
    "perks.item2.title": "Club & Opportunity Discovery",
    "perks.item2.desc": "Discover active club recruitments, hackathons, workshops, and student opportunities matched intelligently to your skills, department, and career aspirations.",
    "perks.item2.pill": "94% Skill-Matched Feed",
    "perks.item3.title": "AI Career & Targeted Resume Studio",
    "perks.item3.desc": "Your campus profile should work for your career. Tell ORBYT what internship role you're applying for, and it compiles your verified achievements into a tailored resume.",
    "perks.item3.pill": "Automated Resume Studio",
    "perks.item4.title": "Unified Campus Safety Layer",
    "perks.item4.desc": "Connects students, administrators, and campus security. Fast incident reporting with automated categorization, triage, and live status resolution.",
    "perks.item4.pill": "Zero-Delay Safety Protocol",
    "perks.item5.title": "Institutional Analytics & Macro Insights",
    "perks.item5.desc": "A campus that understands itself. Enables university leaders to detect cross-campus patterns in attendance drops, safety hotspots, and student engagement.",
    "perks.item5.pill": "Campus-Wide Macro Insights",

    // Benefits / 4 Pillars
    "benefits.label": "THE 4 PILLARS",
    "benefits.title": "ONE STUDENT.\nONE INTELLIGENT CAMPUS.",
    "benefits.desc": "Your academic life shouldn't be scattered across ten different systems. ORBYT is the unified operating system built for modern university campuses.",
    "benefits.item1.title": "Zero Portal Juggling",
    "benefits.item1.desc": "Stop logging into five different legacy websites. Attendance, internal marks, notices, and club applications all live inside one seamless interface.",
    "benefits.item2.title": "100% Trustworthy Attribution",
    "benefits.item2.desc": "ORBYT doesn't guess. Every policy answer includes direct source quotes and references to your institution's official Academic Regulations.",
    "benefits.item3.title": "Proactive Risk Prevention",
    "benefits.item3.desc": "Get notified of subject-level attendance dips weeks before exam debarment thresholds become critical.",
    "benefits.item4.title": "Continuous Career Readiness",
    "benefits.item4.desc": "Your coursework, verified campus projects, and club leadership automatically generate tailored resumes on demand.",

    // Testimonials
    "testimonials.title1": "VOICES OF",
    "testimonials.title2": "THE CAMPUS",
    "testimonials.subtitle": "Hear how students, club leads, and faculty experience the power of ORBYT.",
    "testimonials.list": [
      {
        name: "Arjun R.",
        role: "B.Tech Computer Science (3rd Year)",
        quote: "ORBYT warned me that my DBMS attendance was dropping below 75% two weeks before exams. It showed me the exact regulation and saved me from debarment.",
        avatar: "AR"
      },
      {
        name: "Pooja Sharma",
        role: "Lead, Microsoft Innovations Club",
        quote: "Recruitment applications for our technical wing tripled. ORBYT matched students whose skills and projects directly aligned with our club requirements.",
        avatar: "PS"
      },
      {
        name: "Karthik V.",
        role: "AI & Data Science Student",
        quote: "I used ORBYT's Resume Studio for an AI internship. It pulled my verified campus projects and highlighted my skill gaps in PyTorch. Landed the role!",
        avatar: "KV"
      },
      {
        name: "Dr. S. Ramanathan",
        role: "Dean of Student Affairs",
        quote: "Having instant institutional patterns on student attendance trends and safety reports helps us intervene weeks before small issues escalate.",
        avatar: "SR"
      }
    ],

    // FAQ
    "faq.title1": "FREQUENTLY",
    "faq.title2": "ASKED QUESTIONS",
    "faq.subtitle": "Everything you need to know about ORBYT Campus OS",
    "faq.q1": "How does ORBYT get my attendance and academic data?",
    "faq.a1": "ORBYT securely connects with your institution's official Student Information System (SIS), ERP, and attendance portals via encrypted authentication to fetch verified data in real time.",
    "faq.q2": "Can I trust the AI's answers regarding academic regulations?",
    "faq.a2": "Yes. ORBYT is trustworthy by design. It doesn't generate answers from random internet sources; it indexes your college's official circulars, handbooks, and policies, providing the exact citation (e.g., 'Academic Regulations 2026') with every answer.",
    "faq.q3": "How does Club & Opportunity matching work?",
    "faq.a3": "ORBYT evaluates your academic profile, departmental skills, previous projects, and interests against active club recruitment criteria to score and surface the most relevant opportunities (e.g., '94% match').",
    "faq.q4": "How does the AI Resume Builder work?",
    "faq.a4": "Tell ORBYT what internship or job role you are applying for. It analyzes your campus profile — coursework, projects, certifications, leadership, and club experience — to generate a tailored, ATS-friendly resume and identify missing skill gaps.",
    "faq.q5": "Are campus safety incident reports confidential?",
    "faq.a5": "Yes. All student data is encrypted at rest and in transit. Safety reports can be submitted anonymously or with confidential escalation, routing directly to campus security or medical teams without delay.",

    // CTA
    "cta.title1": "YOUR CAMPUS IS FULL OF INFORMATION.",
    "cta.title2": "ORBYT MAKES IT INTELLIGENT.",
    "cta.desc": "Ask about your academics. Discover opportunities. Understand campus rules. Build your career. Stay informed. Stay safe.",
    "cta.btn": "ENTER YOUR CAMPUS",
    "cta.sub": "ONE CAMPUS. ONE INTELLIGENCE LAYER.",
  },

  hi: {
    // Nav
    "nav.about": "मुख्य संदेश",
    "nav.agent": "एआई एजेंट",
    "nav.workflow": "कार्यप्रणाली",
    "nav.safety": "सुरक्षा",
    "nav.modules": "मॉड्यूल्स",
    "nav.pillars": "स्तंभ",
    "nav.faq": "अक्सर पूछे जाने वाले प्रश्न",
    "nav.ask": "ORBYT से पूछें",

    // Hero
    "hero.stats.impacted": "सत्यापित एवं आधिकारिक\nसंस्थागत डेटा",
    "hero.stats.mentors": "त्वरित एआई\nपरिसर सहायक",
    "hero.stats.rewards": "सभी चीज़ों के लिए\nएक एकीकृत मंच",
    "hero.textA": "इंटेलिजेंट कैंपस ऑपरेटिंग सिस्टम",
    "hero.applyNow": "ORBYT से पूछें",
    "hero.secondaryCta": "परिसर एक्सप्लोर करें",
    "hero.applicationsOpen": "एक परिसर। एक इंटेलिजेंस लेयर।",
    "hero.textB": "छात्रों के लिए निर्मित। परिसर इंटेलिजेंस द्वारा संचालित।",
    "hero.headingWords": ["आपका", "संपूर्ण", "परिसर,", "अंततः", "एक ही स्थान पर।"],

    // About
    "about.pill": "मूल संदेश",
    "about.title1": "खोजना बंद करें,",
    "about.title2": "पूछना शुरू करें।",
    "about.desc": "कॉलेज की जानकारी पोर्टल्स, पीडीएफ और ग्रुप चैट्स में बिखरी हुई है। ORBYT इन सभी को एक बुद्धिमान मंच पर लाता है। बस सरल भाषा में पूछें, आधिकारिक डेटा पर आधारित उत्तर पाएं और सीधे कार्रवाई करें।",
    "about.btn": "परिसर देखें",

    // Marquee
    "marquee.words": [
      "उपस्थिति इंटेलिजेंस",
      "शैक्षणिक नियम",
      "क्लब भर्तियां",
      "अवसर खोज",
      "एआई रेज़्यूमे स्टूडियो",
      "परीक्षा कार्यक्रम",
      "परिसर सुरक्षा अलर्ट",
      "समय सीमा ट्रैकिंग",
      "आधिकारिक नीतियां",
    ],

    // Sponsors / Campus Ecosystem
    "sponsors.title": "एकीकृत परिसर पारिस्थितिकी तंत्र",
    "sponsors.subtitle": "आधिकारिक छात्र पोर्टल्स, हैंडबुक और क्लब प्रणालियों से जुड़ा हुआ",
    "sponsors.cta": "सभी मॉड्यूल देखें",

    // HowItWorks
    "process.label": "ORBYT कार्यप्रणाली",
    "process.title": "चैट से परे। ORBYT कार्य करता है।",
    "process.step1": "सरल सवाल पूछें",
    "process.step2": "लाइव डेटा खोज",
    "process.step3": "स्पष्ट समझें",
    "process.step4": "प्रभाव जानें",
    "process.step5": "सीधी कार्रवाई",

    // Timeline
    "timeline.title1": "परिसर",
    "timeline.title2": "सुरक्षा लेयर",
    "timeline.subtitle": "रिपोर्ट से त्वरित प्रतिक्रिया तक रीयल-टाइम समाधान",
    "timeline.date1": "चरण 01",
    "timeline.step1.title": "घटना रिपोर्ट",
    "timeline.step1.desc": "छात्र या स्टाफ तुरंत आपातकालीन, असुरक्षित स्थिति, उत्पीड़न या चिकित्सा संबंधी रिपोर्ट दर्ज करते हैं।",
    "timeline.date2": "चरण 02",
    "timeline.step2.title": "एआई वर्गीकरण",
    "timeline.step2.desc": "ORBYT स्थान और तात्कालिकता को समझकर संस्थागत प्रोटोकॉल के तहत वर्गीकृत करता है।",
    "timeline.date3": "चरण 03",
    "timeline.step3.title": "गंभीरता मूल्यांकन",
    "timeline.step3.desc": "जोखिम स्कोरिंग द्वारा आपातकालीन मामलों को बिना किसी देरी के तुरंत प्राथमिकता मिलती है।",
    "timeline.date4": "चरण 04",
    "timeline.step4.title": "टीम को अलर्ट",
    "timeline.step4.desc": "परिसर सुरक्षा, चिकित्सा दल या प्रशासन को तुरंत अलर्ट भेजा जाता है।",
    "timeline.date5": "चरण 05",
    "timeline.step5.title": "पारदर्शी ट्रैकिंग",
    "timeline.step5.desc": "छात्र को समाधान की पूरी प्रक्रिया का रीयल-टाइम गोपनीय अपडेट मिलता है।",

    // Features
    "features.title1": "परिसर ज्ञान।",
    "features.title2": "विश्वसनीय एवं प्रामाणिक।",
    "features.desc": "महत्वपूर्ण शैक्षणिक जानकारी अक्सर सैकड़ों पृष्ठों के नियमों में छिपी होती है। ORBYT इसे आधिकारिक स्रोतों के साथ एक सुलभ ज्ञान स्तर में बदल देता है।",
    "features.cta": "परिसर एजेंट से पूछें",
    "features.item1.title": "शैक्षणिक नियम",
    "features.item1.desc": "उपस्थिति सीमा, परीक्षा नीति, क्रेडिट आवश्यकताएं और फीस समय सीमा पर तुरंत स्पष्टता।",
    "features.item2.title": "छात्र इंटेलिजेंस",
    "features.item2.desc": "आपकी प्राथमिकताओं के आधार पर उपस्थिति जोखिम और अवसरों को प्राथमिकता देने वाला व्यक्तिगत फ़ीड।",
    "features.item3.title": "क्लब और अवसर खोज",
    "features.item3.desc": "ग्रुप चैट में छिपी भर्तियों को कभी न छोड़ें। आपके कौशल के आधार पर 94% मैच सुझाव।",

    // Perks
    "perks.label": "कैंपस ओएस क्षमताएं",
    "perks.title": "शक्तिशाली परिसर मॉड्यूल",
    "perks.desc": "शिक्षा, परिसर जीवन, करियर और सुरक्षा को एक बुद्धिमान मंच में एकीकृत करने के लिए निर्मित।",
    "perks.sponsored": "प्रमुख मॉड्यूल",
    "perks.item1.title": "शैक्षणिक इंटेलिजेंस और जोखिम अलर्ट",
    "perks.item1.desc": "समस्या बनने से पहले जानें। उपस्थिति, अंक और परीक्षा कार्यक्रम को ट्रैक करें और सक्रिय अलर्ट प्राप्त करें।",
    "perks.item1.pill": "सक्रिय शैक्षणिक अलर्ट",
    "perks.item2.title": "क्लब और अवसर खोज",
    "perks.item2.desc": "अपने कौशल, विभाग और लक्ष्यों के आधार पर हैकाथॉन, इंटर्नशिप और क्लब भर्तियां खोजें।",
    "perks.item2.pill": "94% स्किल-मैच फ़ीड",
    "perks.item3.title": "एआई करियर और रेज़्यूमे स्टूडियो",
    "perks.item3.desc": "अपने सत्यापित परिसर प्रोजेक्ट्स से इंटर्नशिप के लिए अनुकूलित रेज़्यूमे बनाएं।",
    "perks.item3.pill": "स्वचालित रेज़्यूमे स्टूडियो",
    "perks.item4.title": "एकीकृत परिसर सुरक्षा लेयर",
    "perks.item4.desc": "सुरक्षा, चिकित्सा या बुनियादी ढांचे की समस्याओं की रिपोर्टिंग और त्वरित समाधान।",
    "perks.item4.pill": "त्वरित सुरक्षा प्रोटोकॉल",
    "perks.item5.title": "संस्थागत एनालिटिक्स और अंतर्दृष्टि",
    "perks.item5.desc": "एक ऐसा परिसर जो स्वयं को समझता है। प्रशासकों को रुझान समझने में मदद करता है।",
    "perks.item5.pill": "परिसर-स्तरीय अंतर्दृष्टि",

    // Benefits
    "benefits.label": "4 मुख्य स्तंभ",
    "benefits.title": "एक छात्र।\nएक इंटेलिजेंट परिसर।",
    "benefits.desc": "आपका शैक्षणिक जीवन दस अलग-अलग प्रणालियों में बिखरा नहीं होना चाहिए। ORBYT एक एकीकृत ऑपरेटिंग सिस्टम है।",
    "benefits.item1.title": "पोर्टल बदलने से मुक्ति",
    "benefits.item1.desc": "पाँच अलग-अलग वेबसाइटों में लॉग इन करना बंद करें। सब कुछ एक ही इंटरफ़ेस में उपलब्ध है।",
    "benefits.item2.title": "100% विश्वसनीय स्रोत",
    "benefits.item2.desc": "हर उत्तर आधिकारिक विश्वविद्यालय नियमों और हैंडबुक के संदर्भ के साथ दिया जाता है।",
    "benefits.item3.title": "सक्रिय जोखिम निवारण",
    "benefits.item3.desc": "परीक्षा से हफ्तों पहले उपस्थिति में गिरावट की चेतावनी प्राप्त करें।",
    "benefits.item4.title": "निरंतर करियर तत्परता",
    "benefits.item4.desc": "आपकी शैक्षणिक उपलब्धियां स्वचालित रूप से लक्षित रेज़्यूमे में बदल जाती हैं।",

    // Testimonials
    "testimonials.title1": "परिसर की",
    "testimonials.title2": "आवाज़ें",
    "testimonials.subtitle": "जानें कि छात्र और संकाय ORBYT का अनुभव कैसे करते हैं।",
    "testimonials.list": [
      {
        name: "अर्जुन आर.",
        role: "बी.टेक कंप्यूटर साइंस (तृतीय वर्ष)",
        quote: "ORBYT ने मुझे चेतावनी दी कि परीक्षा से 2 सप्ताह पहले मेरी डीबीएमएस उपस्थिति कम हो रही थी। इसने मुझे डिबार होने से बचाया।",
        avatar: "AR"
      },
      {
        name: "पूजा शर्मा",
        role: "लीड, माइक्रोसॉफ्ट इनोवेशन क्लब",
        quote: "हमारे क्लब में आवेदन 3 गुना बढ़ गए क्योंकि ORBYT ने सही कौशल वाले छात्रों को सीधे सुझाव दिया।",
        avatar: "PS"
      },
      {
        name: "कार्तिक वी.",
        role: "डेटा साइंस छात्र",
        quote: "मैंने इंटर्नशिप के लिए ORBYT के रेज़्यूमे स्टूडियो का उपयोग किया। इसने मेरे कैंपस प्रोजेक्ट्स को सही तरीके से प्रस्तुत किया।",
        avatar: "KV"
      },
      {
        name: "डॉ. एस. रामनाथन",
        role: "डीन, छात्र कल्याण",
        quote: "छात्र उपस्थिति और सुरक्षा के रुझानों को पहले से देखकर हम समय रहते सही कदम उठा सकते हैं।",
        avatar: "SR"
      }
    ],

    // FAQ
    "faq.title1": "अक्सर पूछे जाने",
    "faq.title2": "वाले प्रश्न",
    "faq.subtitle": "ORBYT कैंपस ओएस के बारे में सब कुछ जानें",
    "faq.q1": "ORBYT मेरी उपस्थिति और शैक्षणिक डेटा कैसे प्राप्त करता है?",
    "faq.a1": "ORBYT सुरक्षित रूप से आपके कॉलेज के आधिकारिक छात्र सूचना प्रणाली (SIS) और ERP से एन्क्रिप्टेड माध्यम से डेटा प्राप्त करता है।",
    "faq.q2": "क्या मैं शैक्षणिक नियमों पर एआई के उत्तरों पर भरोसा कर सकता हूँ?",
    "faq.a2": "हाँ। ORBYT आधिकारिक हैंडबुक और नियमों के सटीक संदर्भ (जैसे 'शैक्षणिक नियम 2026') के साथ ही उत्तर देता है।",
    "faq.q3": "क्लब और अवसर मैचिंग कैसे काम करती है?",
    "faq.a3": "ORBYT आपके कौशल, विभाग और लक्ष्यों का मिलान सक्रिय क्लब आवश्यकताओं से करके उपयोगी अवसर दिखाता है।",
    "faq.q4": "एआई रेज़्यूमे बिल्डर कैसे काम करता है?",
    "faq.a4": "ORBYT आपके सत्यापित प्रोजेक्ट्स, कोर्स और क्लब गतिविधियों से लक्षित रेज़्यूमे बनाता है और छूटे हुए कौशल की पहचान करता है।",
    "faq.q5": "क्या मेरी व्यक्तिगत जानकारी और सुरक्षा रिपोर्ट गोपनीय हैं?",
    "faq.a5": "हाँ, सभी डेटा एन्क्रिप्टेड हैं और सुरक्षा रिपोर्ट पूरी गोपनीयता के साथ सीधे सुरक्षा टीम तक पहुंचाई जाती हैं।",

    // CTA
    "cta.title1": "आपका परिसर जानकारी से भरा है।",
    "cta.title2": "ORBYT इसे इंटेलिजेंट बनाता है।",
    "cta.desc": "अपनी शिक्षा के बारे में पूछें। अवसर खोजें। सुरक्षित रहें।",
    "cta.btn": "परिसर में प्रवेश करें",
    "cta.sub": "एक परिसर। एक इंटेलिजेंस लेयर।",
  },

  ta: {
    // Nav
    "nav.about": "செய்தி",
    "nav.agent": "AI முகவர்",
    "nav.workflow": "செயல்முறை",
    "nav.safety": "பாதுகாப்பு",
    "nav.modules": "தொகுதிகள்",
    "nav.pillars": "தூண்கள்",
    "nav.faq": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    "nav.ask": "ORBYT-யிடம் கேளுங்கள்",

    // Hero
    "hero.stats.impacted": "சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ\nநிறுவன தரவு",
    "hero.stats.mentors": "உடனடி AI\nவளாக உதவியாளர்",
    "hero.stats.rewards": "அனைத்திற்கும் ஒரே\nஒருங்கிணைந்த தளம்",
    "hero.textA": "நுண்ணறிவு வளாக இயங்குதளம் (CAMPUS OS)",
    "hero.applyNow": "ORBYT-யிடம் கேளுங்கள்",
    "hero.secondaryCta": "வளாகத்தை ஆராயுங்கள்",
    "hero.applicationsOpen": "ஒரு வளாகம். ஒரு நுண்ணறிவு தளம்.",
    "hero.textB": "மாணவர்களுக்காக உருவாக்கப்பட்டது. வளாக நுண்ணறிவால் இயக்கப்படுகிறது.",
    "hero.headingWords": ["உங்கள்", "முழு", "வளாகமும்,", "இறுதியாக", "ஒரே இடத்தில்."],

    // About
    "about.pill": "முக்கிய நோக்கம்",
    "about.title1": "தேடுவதை நிறுத்துங்கள்,",
    "about.title2": "கேட்கத் தொடங்குங்கள்.",
    "about.desc": "கல்லூரி தகவல்கள் போர்ட்டல்கள், PDFகள் மற்றும் குரூப் சாட்களில் சிதறிக்கிடக்கின்றன. ORBYT இவற்றை ஒரே நுண்ணறிவு தளத்தில் இணைக்கிறது. எளிய மொழியில் கேளுங்கள், அதிகாரப்பூர்வ தரவின் அடிப்படையில் உடனடி பதில் மற்றும் தீர்வைப் பெறுங்கள்.",
    "about.btn": "வளாகத்தை ஆராயுங்கள்",

    // Marquee
    "marquee.words": [
      "வருகைப்பதிவு நுண்ணறிவு",
      "கல்வி ஒழுங்குமுறைகள்",
      "கிளப் சேர்க்கைகள்",
      "வாய்ப்புகள் கண்டறிதல்",
      "AI ரெஸ்யூம் ஸ்டுடியோ",
      "தேர்வு அட்டவணை",
      "வளாக பாதுகாப்பு எச்சரிக்கைகள்",
      "காலக்கெடு கண்காணிப்பு",
      "அதிகாரப்பூர்வ கொள்கைகள்",
    ],

    // Sponsors / Campus Ecosystem
    "sponsors.title": "இணைக்கப்பட்ட வளாக சூழல்",
    "sponsors.subtitle": "அதிகாரப்பூர்வ மாணவர் போர்ட்டல்கள் மற்றும் விதிகளுடன் தடையின்றி இணைக்கப்பட்டுள்ளது",
    "sponsors.cta": "அனைத்து தொகுதிகளையும் பார்க்க",

    // HowItWorks
    "process.label": "ORBYT செயல்முறை",
    "process.title": "உரையாடலைத் தாண்டி. ORBYT செயல்படுகிறது.",
    "process.step1": "எளிதாக கேளுங்கள்",
    "process.step2": "நேரலை தரவு தேடல்",
    "process.step3": "தெளிவாக புரிந்து கொள்ளுங்கள்",
    "process.step4": "தாக்கத்தை அறியுங்கள்",
    "process.step5": "நேரடி நடவடிக்கை",

    // Timeline
    "timeline.title1": "வளாக",
    "timeline.title2": "பாதுகாப்பு தளம்",
    "timeline.subtitle": "புகார் முதல் உடனடி தீர்வு வரை நேரலை பாதுகாப்பு",
    "timeline.date1": "படி 01",
    "timeline.step1.title": "சம்பவ பதிவு",
    "timeline.step1.desc": "மாணவர்கள் அவசரநிலை, பாதுகாப்பு குறைபாடு அல்லது மருத்துவ தேவைகளை உடனடியாக பதிவு செய்கிறார்கள்.",
    "timeline.date2": "படி 02",
    "timeline.step2.title": "AI வகைப்படுத்தல்",
    "timeline.step2.desc": "ORBYT இருப்பிடம் மற்றும் அவசரநிலையை புரிந்து நிறுவன நெறிமுறைகளின் கீழ் வகைப்படுத்துகிறது.",
    "timeline.date3": "படி 03",
    "timeline.step3.title": "தீவிர மதிப்பீடு",
    "timeline.step3.desc": "அபாய மதிப்பீடு மூலம் அவசர விவகாரங்கள் தாமதமின்றி உடனடியாக முன்னுரிமை பெறுகின்றன.",
    "timeline.date4": "படி 04",
    "timeline.step4.title": "அதிகாரிகளுக்கு எச்சரிக்கை",
    "timeline.step4.desc": "வளாக பாதுகாப்பு மற்றும் மருத்துவ குழுவினருக்கு உடனடி அறிவிப்பு அனுப்பப்படுகிறது.",
    "timeline.date5": "படி 05",
    "timeline.step5.title": "நேரலை கண்காணிப்பு",
    "timeline.step5.desc": "தீர்விற்கான நடவடிக்கைகள் மாணவருக்கு ரகசியமாகவும் தொடர்ச்சியாகவும் புதுப்பிக்கப்படுகின்றன.",

    // Features
    "features.title1": "வளாக அறிவு.",
    "features.title2": "நம்பகமான வடிவமைப்பு.",
    "features.desc": "முக்கிய கல்வி தகவல்கள் நூற்றுக்கணக்கான பக்க விதிகளில் புதைந்துள்ளன. ORBYT அவற்றை அதிகாரப்பூர்வ ஆதாரங்களுடன் அணுகக்கூடியதாக மாற்றுகிறது.",
    "features.cta": "வளாக முகவரிடம் கேளுங்கள்",
    "features.item1.title": "கல்வி ஒழுங்குமுறைகள்",
    "features.item1.desc": "வருகை வரம்பு, தேர்வு கொள்கைகள், விடுப்பு மற்றும் கட்டண காலக்கெடு குறித்த உடனடி பதில்கள்.",
    "features.item2.title": "மாணவர் நுண்ணறிவு",
    "features.item2.desc": "உங்கள் தேவைகளுக்கு ஏற்ப வருகை அபாயங்கள் மற்றும் வாய்ப்புகளை முன்னிலைப்படுத்தும் தனிப்பயன் தளம்.",
    "features.item3.title": "கிளப் & வாய்ப்பு கண்டறிதல்",
    "features.item3.desc": "குரூப் சாட்களில் தவறவிட்ட வாய்ப்புகளை எளிதில் கண்டறியுங்கள். 94% திறன் பொருத்தம்.",

    // Perks
    "perks.label": "வளாக இயங்குதள திறன்கள்",
    "perks.title": "சக்திவாய்ந்த வளாக தொகுதிகள்",
    "perks.desc": "கல்வி, வளாக வாழ்க்கை, தொழில் வளர்ச்சி மற்றும் பாதுகாப்பை ஒருங்கிணைக்கும் இயங்குதளம்.",
    "perks.sponsored": "முக்கிய தொகுதி",
    "perks.item1.title": "கல்வி நுண்ணறிவு & அபாய எச்சரிக்கைகள்",
    "perks.item1.desc": "வருகை மற்றும் தேர்வு அட்டவணையை முன்கூட்டியே கண்காணித்து அபாயங்களை தவிர்க்கலாம்.",
    "perks.item1.pill": "முன்னெச்சரிக்கை அறிவிப்புகள்",
    "perks.item2.title": "கிளப் & வாய்ப்பு கண்டறிதல்",
    "perks.item2.desc": "உங்கள் திறன் மற்றும் விருப்பத்திற்கு ஏற்ற ஹேக்கத்தான் மற்றும் கிளப் வாய்ப்புகளை கண்டறியவும்.",
    "perks.item2.pill": "94% திறன் பொருத்தம்",
    "perks.item3.title": "AI தொழில் & ரெஸ்யூம் ஸ்டுடியோ",
    "perks.item3.desc": "உங்கள் சரிபார்க்கப்பட்ட வளாக திட்டங்கள் மூலம் இலக்கு ரெஸ்யூம்களை உடனடியாக உருவாக்குங்கள்.",
    "perks.item3.pill": "தானியங்கி ரெஸ்யூம்",
    "perks.item4.title": "ஒருங்கிணைந்த வளாக பாதுகாப்பு",
    "perks.item4.desc": "அவசர மற்றும் பாதுகாப்பு பிரச்சனைகளுக்கு உடனடி தீர்வு காணும் தளம்.",
    "perks.item4.pill": "விரைவான பாதுகாப்பு நெறிமுறை",
    "perks.item5.title": "நிறுவன பகுப்பாய்வு & நுண்ணறிவு",
    "perks.item5.desc": "வளாகத்தின் போக்குகளை நிர்வாகம் துல்லியமாக புரிந்து கொள்ள உதவுகிறது.",
    "perks.item5.pill": "வளாக அளவிலான நுண்ணறிவு",

    // Benefits
    "benefits.label": "4 முக்கிய தூண்கள்",
    "benefits.title": "ஒரு மாணவர்.\nஒரு நுண்ணறிவு வளாகம்.",
    "benefits.desc": "உங்கள் கல்வி வாழ்க்கை பல அமைப்புகளில் சிதறக்கூடாது. ORBYT நவீன பல்கலைக்கழகங்களுக்கான ஒரே இயங்குதளம்.",
    "benefits.item1.title": "ஒரே ஒரு தளம்",
    "benefits.item1.desc": "பல பழைய இணையதளங்களில் நுழைவதை நிறுத்துங்கள். அனைத்தும் ஒரே இடத்தில் கிடைக்கும்.",
    "benefits.item2.title": "100% நம்பகமான ஆதாரங்கள்",
    "benefits.item2.desc": "ஒவ்வொரு பதிலும் அதிகாரப்பூர்வ பல்கலைக்கழக விதிகளின் ஆதாரங்களுடன் வழங்கப்படுகிறது.",
    "benefits.item3.title": "முன்னெச்சரிக்கை பாதுகாப்பு",
    "benefits.item3.desc": "தேர்வுக்கு பல வாரங்களுக்கு முன்பே வருகைக் குறைவு குறித்து எச்சரிக்கப்படுவீர்கள்.",
    "benefits.item4.title": "தொடர்ச்சியான தொழில் தயார்நிலை",
    "benefits.item4.desc": "உங்கள் வளாக சாதனைகள் தானாகவே தொழில்முறை ரெஸ்யூம்களாக மாறுகின்றன.",

    // Testimonials
    "testimonials.title1": "வளாகத்தின்",
    "testimonials.title2": "குரல்கள்",
    "testimonials.subtitle": "மாணவர்களும் பேராசிரியர்களும் ORBYT-ஐ எவ்வாறு அனுபவிக்கிறார்கள் என்பதை கேளுங்கள்.",
    "testimonials.list": [
      {
        name: "அர்ஜுன் ஆர்.",
        role: "பி.டெக் கம்ப்யூட்டர் சயின்ஸ் (3-ஆம் ஆண்டு)",
        quote: "தேர்வுக்கு 2 வாரங்களுக்கு முன்பே எனது டிபிஎம்எஸ் வருகை குறைவாக இருப்பதாக ORBYT எச்சரித்து என்னை காப்பாற்றியது.",
        avatar: "AR"
      },
      {
        name: "பூஜா சர்மா",
        role: "தலைவர், மைக்ரோசாப்ட் இன்னோவேஷன் கிளப்",
        quote: "எங்கள் கிளப் சேர்க்கை 3 மடங்கு அதிகரித்தது, ஏனெனில் ORBYT சரியான திறன் கொண்ட மாணவர்களை பரிந்துரைத்தது.",
        avatar: "PS"
      },
      {
        name: "கார்த்திக் வி.",
        role: "டேட்டா சயின்ஸ் மாணவர்",
        quote: "இன்டர்ன்ஷிப்பிற்கு ORBYT-ன் ரெஸ்யூம் ஸ்டுடியோவை பயன்படுத்தினேன். என் கல்லூரி திட்டங்களை அருமையாக தொகுத்துக் கொடுத்தது.",
        avatar: "KV"
      },
      {
        name: "டாக்டர் எஸ். ராமநாதன்",
        role: "டீன், மாணவர் நலத்துறை",
        quote: "வளாக வருகை மற்றும் பாதுகாப்பு போக்குகளை முன்கூட்டியே பார்ப்பது நிர்வாகத்திற்கு பெரிதும் உதவுகிறது.",
        avatar: "SR"
      }
    ],

    // FAQ
    "faq.title1": "அடிக்கடி கேட்கப்படும்",
    "faq.title2": "கேள்விகள்",
    "faq.subtitle": "ORBYT வளாக இயங்குதளம் பற்றிய அனைத்தும்",
    "faq.q1": "ORBYT எனது வருகை மற்றும் கல்வித் தரவை எவ்வாறு பெறுகிறது?",
    "faq.a1": "ORBYT உங்கள் பல்கலைக்கழகத்தின் அதிகாரப்பூர்வ மாணவர் தகவல் அமைப்பு (SIS) மற்றும் ERP உடன் பாதுகாப்பாக இணைந்து தரவை பெறுகிறது.",
    "faq.q2": "கல்வி விதிகளில் AI பதில்களை நான் நம்பலாமா?",
    "faq.a2": "ஆம். ORBYT அதிகாரப்பூர்வ கையேடுகள் மற்றும் விதிகளின் துல்லியமான குறிப்புகளுடன் மட்டுமே பதிலளிக்கிறது.",
    "faq.q3": "கிளப் வாய்ப்பு பொருத்தம் எவ்வாறு செயல்படுகிறது?",
    "faq.a3": "உங்கள் திறன், துறை மற்றும் ஆர்வங்களை கிளப் தகுதியுடன் ஒப்பிட்டு சிறந்த வாய்ப்புகளை காட்டுகிறது.",
    "faq.q4": "AI ரெஸ்யூம் பில்டர் எவ்வாறு செயல்படுகிறது?",
    "faq.a4": "நீங்கள் விண்ணப்பிக்கும் பணிக்கு ஏற்ப, உங்கள் கல்லூரி திட்டங்கள் மற்றும் திறன்களைக் கொண்டு ரெஸ்யூமை உருவாக்குகிறது.",
    "faq.q5": "எனது தனிப்பட்ட தரவு மற்றும் பாதுகாப்பு புகார்கள் ரகசியமானவையா?",
    "faq.a5": "ஆம், அனைத்து தரவுகளும் குறியாக்கம் செய்யப்பட்டுள்ளன மற்றும் பாதுகாப்பு புகார்கள் முழு ரகசியத்தோடு நிர்வகிக்கப்படுகின்றன.",

    // CTA
    "cta.title1": "உங்கள் வளாகம் தகவல்களால் நிறைந்துள்ளது.",
    "cta.title2": "ORBYT அதை நுண்ணறிவாக மாற்றுகிறது.",
    "cta.desc": "உங்கள் கல்வியைப் பற்றி கேளுங்கள். வாய்ப்புகளைக் கண்டறியுங்கள். பாதுகாப்பாக இருங்கள்.",
    "cta.btn": "வளாகத்தில் நுழையுங்கள்",
    "cta.sub": "ஒரு வளாகம். ஒரு நுண்ணறிவு தளம்.",
  },
};
