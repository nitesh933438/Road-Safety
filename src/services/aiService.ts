/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AiTriageResponse {
  immediateAction: string;
  whatNotToDo: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  ambulanceRequired: boolean;
  goldenHourAdvice: string;
  safetyPrecautions: string;
}

export const analyzeEmergencyQuery = async (query: string, language: 'en' | 'hi' = 'en'): Promise<AiTriageResponse> => {
  // Isolated AI service layer. When Gemini API is integrated later, call backend /api/ai here.
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate latency

  const q = query.toLowerCase();

  if (q.includes('bleeding') || q.includes('cut') || q.includes('wound') || q.includes('blood')) {
    if (language === 'hi') {
      return {
        immediateAction: 'साफ कपड़े या पट्टी से घाव पर सीधा और मजबूत दबाव (Direct Pressure) कम से कम 10 मिनट तक लगातार डालें।',
        whatNotToDo: 'घाव से कपड़े या पट्टी को हटाएं नहीं यदि वह चिपक गई हो; टूर्निकेट का गलत उपयोग न करें।',
        riskLevel: 'High',
        ambulanceRequired: true,
        goldenHourAdvice: 'रक्तस्राव शुरू होने के 60 मिनट के भीतर चिकित्सा सहायता सुनिश्चित करें ताकि हाइपोलिमिक शॉक से बचा जा सके।',
        safetyPrecautions: 'संक्रमण से बचने के लिए संभव हो तो दस्ताने (Gloves) पहनें।',
      };
    }
    return {
      immediateAction: 'Apply firm, continuous direct pressure to the bleeding site using a clean cloth or sterile bandage for at least 10 minutes without lifting.',
      whatNotToDo: 'Do not remove soaked bandages (place new ones on top); do not apply tourniquet improperly.',
      riskLevel: 'High',
      ambulanceRequired: true,
      goldenHourAdvice: 'Controlling heavy arterial bleeding within the Golden Hour prevents fatal blood loss and hypovolemic shock.',
      safetyPrecautions: 'Wear gloves or use a plastic barrier to protect against blood-borne pathogens if available.',
    };
  }

  if (q.includes('unconscious') || q.includes('faint') || q.includes('unresponsive')) {
    if (language === 'hi') {
      return {
        immediateAction: 'मरीज की सांस और नाड़ी की जाँच करें। यदि सांस ले रहा है तो रिकवरी पोजीशन (एक करवट) में लिटाएं।',
        whatNotToDo: 'बेहोश व्यक्ति को पानी या भोजन बिल्कुल न दें।',
        riskLevel: 'Critical',
        ambulanceRequired: true,
        goldenHourAdvice: 'मस्तिष्क को ऑक्सीजन की निरंतर आपूर्ति सुनिश्चित करने के लिए तुरंत एम्बुलेंस (108) को कॉल करें।',
        safetyPrecautions: 'गले की टाई या टाइट कपड़े ढीले करें।',
      };
    }
    return {
      immediateAction: 'Check responsiveness and normal breathing. If breathing, place in the recovery position (on their side) to keep the airway clear.',
      whatNotToDo: 'Do not give anything to eat or drink; do not shake the person violently.',
      riskLevel: 'Critical',
      ambulanceRequired: true,
      goldenHourAdvice: 'Unconsciousness following a trauma requires immediate neurological evaluation within the Golden Hour.',
      safetyPrecautions: 'Loosen tight clothing around the neck and chest.',
    };
  }

  if (q.includes('cpr') || q.includes('breathing') || q.includes('heart') || q.includes('cardiac')) {
    if (language === 'hi') {
      return {
        immediateAction: 'छाती के बीच में लगातार 100 से 120 प्रति मिनट की गति से सीने को 2 इंच गहराई तक दबाएं (Chest Compressions)।',
        whatNotToDo: 'बिना रुके लंबे अंतराल के लिए सीपीआर बंद न करें जब तक कि मेडिकल टीम न आ जाए।',
        riskLevel: 'Critical',
        ambulanceRequired: true,
        goldenHourAdvice: 'कार्डियक अरेस्ट के पहले 4 मिनट में सीपीआर शुरू करने से जीवित बचने की संभावना दोगुनी हो जाती है।',
        safetyPrecautions: 'सुनिश्चित करें कि घटनास्थल सुरक्षित है।',
      };
    }
    return {
      immediateAction: 'Start chest compressions immediately in the center of the chest at 100-120 compressions per minute (depth of 2 inches).',
      whatNotToDo: 'Do not interrupt chest compressions for more than 10 seconds.',
      riskLevel: 'Critical',
      ambulanceRequired: true,
      goldenHourAdvice: 'Immediate bystander CPR during the Golden Hour sustains vital blood circulation to the brain and heart.',
      safetyPrecautions: 'Ensure scene safety before kneeling beside the victim.',
    };
  }

  // General default fallback response
  if (language === 'hi') {
    return {
      immediateAction: 'शांत रहें, घटनास्थल की सुरक्षा जाँचें और मरीज की स्थिति का आकलन करें।',
      whatNotToDo: 'घबराएं नहीं; बिना डॉक्टर की सलाह के मरीज को हिलाएं-डुलाएं नहीं।',
      riskLevel: 'Medium',
      ambulanceRequired: true,
      goldenHourAdvice: 'किसी भी सड़क दुर्घटना या चिकित्सीय आपातकाल में पहले 60 मिनट (गोल्डन ऑवर) में उपचार जीवन बचाता है।',
      safetyPrecautions: 'आसपास के अन्य लोगों से मदद मांगें और 108 डायल करें।',
    };
  }
  return {
    immediateAction: 'Stay calm, ensure scene safety, and assess the victim for responsiveness, breathing, and visible injuries.',
    whatNotToDo: 'Do not panic or move the victim unnecessarily if spinal injury is suspected.',
    riskLevel: 'Medium',
    ambulanceRequired: true,
    goldenHourAdvice: 'Prompt assessment and stabilization within the 60-minute Golden Hour dramatically increases recovery outcomes.',
    safetyPrecautions: 'Call 108 or 112 immediately for dispatch support.',
  };
};
