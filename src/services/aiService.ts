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

  if (q.includes('fracture') || q.includes('broken') || q.includes('bone')) {
    if (language === 'hi') {
      return {
        immediateAction: 'प्रभावित हिस्से को हिलाने से रोकें। यदि संभव हो तो गत्ते या लकड़ी का सहारा देकर स्प्लिंट (Splint) बांधें।',
        whatNotToDo: 'हड्डी को सीधा करने या वापस अपनी जगह पर धकेलने की कोशिश न करें।',
        riskLevel: 'Medium',
        ambulanceRequired: true,
        goldenHourAdvice: 'हड्डी टूटने पर जल्द से जल्द स्थिरीकरण (stabilization) करने से नसों और रक्त वाहिकाओं को आगे के नुकसान से बचाया जा सकता है।',
        safetyPrecautions: 'रक्तस्राव होने पर उसे रोकने के लिए हल्के दबाव का प्रयोग करें।',
      };
    }
    return {
      immediateAction: 'Immobilize the injured area. Use a makeshift splint (like rolled newspaper or wood) to prevent movement.',
      whatNotToDo: 'Do not attempt to realign the bone or push a protruding bone back in.',
      riskLevel: 'Medium',
      ambulanceRequired: true,
      goldenHourAdvice: 'Immobilizing the fracture within the Golden Hour prevents further damage to surrounding blood vessels and nerves.',
      safetyPrecautions: 'Cover open fractures with a sterile dressing to prevent infection.',
    };
  }

  if (q.includes('burn') || q.includes('fire') || q.includes('chemical')) {
    if (language === 'hi') {
      return {
        immediateAction: 'जले हुए हिस्से को कम से कम 10-15 मिनट तक ठंडे बहते पानी के नीचे रखें।',
        whatNotToDo: 'बर्फ, मक्खन, या कोई मलहम तुरंत न लगाएं; जले हुए कपड़ों को त्वचा से न खींचें।',
        riskLevel: 'High',
        ambulanceRequired: true,
        goldenHourAdvice: 'जले हुए हिस्से को तुरंत ठंडा करने से ऊतकों (tissues) का और अधिक नुकसान रुक जाता है।',
        safetyPrecautions: 'आग या केमिकल स्रोत से मरीज को तुरंत सुरक्षित दूरी पर ले जाएँ।',
      };
    }
    return {
      immediateAction: 'Cool the burn under cool (not cold) running water for at least 10-15 minutes.',
      whatNotToDo: 'Do not apply ice, butter, or ointments. Do not remove clothing stuck to the burn.',
      riskLevel: 'High',
      ambulanceRequired: true,
      goldenHourAdvice: 'Immediate cooling limits the depth of the burn injury and reduces severe pain.',
      safetyPrecautions: 'Ensure the source of the burn (fire, electrical, chemical) is completely removed or safely neutralized.',
    };
  }

  if (q.includes('head') || q.includes('concussion') || q.includes('dizzy')) {
    if (language === 'hi') {
      return {
        immediateAction: 'मरीज को स्थिर रखें। उनके सिर, गर्दन, और रीढ़ को हिलाने से बचाएं (C-Spine Stabilization)।',
        whatNotToDo: 'मरीज की गर्दन या सिर को न मोड़ें। उन्हें उठने या चलने न दें।',
        riskLevel: 'Critical',
        ambulanceRequired: true,
        goldenHourAdvice: 'सिर की चोट में तुरंत मेडिकल सहायता मिलने से मस्तिष्क में सूजन और रक्तस्राव का इलाज संभव है।',
        safetyPrecautions: 'रक्तस्राव होने पर हल्के हाथों से पट्टी रखें, लेकिन दबाव न डालें।',
      };
    }
    return {
      immediateAction: 'Keep the victim completely still. Stabilize the head and neck to prevent any movement (C-Spine stabilization).',
      whatNotToDo: 'Do not move the patient unless there is immediate danger. Do not apply direct pressure to a bleeding skull fracture.',
      riskLevel: 'Critical',
      ambulanceRequired: true,
      goldenHourAdvice: 'Rapid neurological assessment and intervention within the Golden Hour minimizes secondary brain injury.',
      safetyPrecautions: 'Watch closely for changes in consciousness, breathing, or vomiting.',
    };
  }

  if (q.includes('chest') || q.includes('pain') || q.includes('heart attack')) {
    if (language === 'hi') {
      return {
        immediateAction: 'मरीज को आरामदायक स्थिति में बैठाएं (आधा लेटा हुआ)। यदि उनके पास एस्पिरिन हो, तो चबाने को कहें।',
        whatNotToDo: 'उन्हें कुछ भी खाने या पीने को न दें (दवा छोड़कर)। उन्हें चलने या व्यायाम न करने दें।',
        riskLevel: 'Critical',
        ambulanceRequired: true,
        goldenHourAdvice: 'हार्ट अटैक के दौरान पहले 60 मिनट में सही इलाज मिलने से हृदय की मांसपेशियों को बचाया जा सकता है।',
        safetyPrecautions: 'शांत रहें और मरीज को आश्वासन देते रहें।',
      };
    }
    return {
      immediateAction: 'Have the person sit down, rest, and try to keep calm. Loosen any tight clothing. Ask if they have prescribed heart medication like nitroglycerin.',
      whatNotToDo: 'Do not let the person walk or exert themselves. Do not give them anything to eat or drink.',
      riskLevel: 'Critical',
      ambulanceRequired: true,
      goldenHourAdvice: 'Timely treatment during a heart attack saves heart muscle and significantly increases survival chances.',
      safetyPrecautions: 'Be prepared to start CPR if the person becomes unconscious and stops breathing.',
    };
  }

  if (q.includes('electric') || q.includes('shock')) {
    if (language === 'hi') {
      return {
        immediateAction: 'सबसे पहले मेन पावर सप्लाई को बंद करें। यदि मरीज सांस नहीं ले रहा है, तो सीपीआर (CPR) शुरू करें।',
        whatNotToDo: 'बिना बिजली बंद किए मरीज को न छुएं। धातु या गीली वस्तुओं का उपयोग न करें।',
        riskLevel: 'Critical',
        ambulanceRequired: true,
        goldenHourAdvice: 'बिजली के झटके से हृदय की गति रुक सकती है। तुरंत सीपीआर और मेडिकल जांच आवश्यक है।',
        safetyPrecautions: 'मरीज को हटाने के लिए सूखी लकड़ी या प्लास्टिक की छड़ी का उपयोग करें।',
      };
    }
    return {
      immediateAction: 'Turn off the source of electricity if possible. If not, move the source away from you and the person using a dry, nonconducting object made of cardboard, plastic or wood.',
      whatNotToDo: 'Do not touch the person with your bare hands if they are still in contact with the electrical current.',
      riskLevel: 'Critical',
      ambulanceRequired: true,
      goldenHourAdvice: 'Electrical shocks can cause severe internal burns and cardiac arrest; immediate emergency transport is critical.',
      safetyPrecautions: 'Check for breathing and pulse once the person is free from the electrical source.',
    };
  }

  if (q.includes('snake') || q.includes('bite') || q.includes('venom')) {
    if (language === 'hi') {
      return {
        immediateAction: 'मरीज को शांत और स्थिर रखें। काटे गए हिस्से को हृदय के स्तर से नीचे रखें।',
        whatNotToDo: 'घाव को काटने या चूसने की कोशिश न करें। टूर्निकेट न बांधें और बर्फ न लगाएं।',
        riskLevel: 'High',
        ambulanceRequired: true,
        goldenHourAdvice: 'सांप के काटने पर तुरंत एंटी-वेनम (Anti-venom) मिलना जीवन रक्षक होता है।',
        safetyPrecautions: 'सांप को पकड़ने या मारने की कोशिश न करें; उसका हुलिया याद रखने का प्रयास करें।',
      };
    }
    return {
      immediateAction: 'Keep the person calm and completely still. Position the bitten area at or slightly below the level of the heart.',
      whatNotToDo: 'Do not attempt to suck out the venom. Do not apply a tourniquet, ice, or cut the wound.',
      riskLevel: 'High',
      ambulanceRequired: true,
      goldenHourAdvice: 'Rapid administration of antivenom within the Golden Hour is the only definitive treatment for envenomation.',
      safetyPrecautions: 'Remove any rings or constricting items from the bitten limb, as it may swell rapidly.',
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
