EMERGENCY_KEYWORDS = {
    "en": [
        "chest pain", "breathing difficulty", "stroke", "heart attack", "unconscious", 
        "heavy bleeding", "suicidal", "overdose", "seizure", "choking"
    ],
    "hi": ["सीने में दर्द", "सांस लेने में कठिनाई", "दौरा", "दिल का दौरा", "बेहोश", "भारी रक्तस्राव"],
    "te": ["ఛాతీ నొప్పి", "శ్వాస తీసుకోవడంలో ఇబ్బంది", "గుండెపోటు", "స్పృహ తప్పడం"],
    # Add more languages as needed
}

def detect_emergency(message: str, lang: str = "en"):
    message = message.lower()
    keywords = EMERGENCY_KEYWORDS.get(lang, EMERGENCY_KEYWORDS["en"])
    for keyword in keywords:
        if keyword in message:
            return True
    return False

def classify_risk(message: str, lang: str = "en"):
    message = message.lower()
    if detect_emergency(message, lang):
        return "emergency"
    
    high_risk_words = ["fever", "pain", "injury", "bleeding", "vomiting", "diarrhea"]
    for word in high_risk_words:
        if word in message:
            return "high"
            
    return "low"

def get_medical_disclaimer(lang: str = "en"):
    disclaimers = {
        "en": "IMPORTANT: This AI assistant provides general information and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
        "hi": "महत्वपूर्ण: यह एआई सहायक सामान्य जानकारी प्रदान करता है और पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है।",
        "te": "ముఖ్య గమనిక: ఈ AI అసిస్టెంట్ సాధారణ సమాచారాన్ని మాత్రమే అందిస్తుంది మరియు ఇది వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు."
    }
    return disclaimers.get(lang, disclaimers["en"])

def get_doctor_recommendation(risk_level: str, lang: str = "en"):
    recommendations = {
        "emergency": {
            "en": "CRITICAL: Please seek IMMEDIATE medical attention or call emergency services right away.",
            "hi": "गंभीर: कृपया तुरंत चिकित्सा सहायता लें या आपातकालीन सेवाओं को कॉल करें।",
        },
        "high": {
            "en": "URGENT: Your symptoms suggest you should consult a doctor within the next 24 hours.",
            "hi": "महत्वपूर्ण: आपके लक्षण बताते हैं कि आपको अगले 24 घंटों के भीतर डॉक्टर से परामर्श करना चाहिए।",
        }
    }
    
    if risk_level in recommendations:
        return recommendations[risk_level].get(lang, recommendations[risk_level]["en"])
    return ""
