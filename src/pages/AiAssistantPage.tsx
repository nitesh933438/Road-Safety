/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Bot, Send, Mic, MicOff, Volume2, Pause, Square, Image as ImageIcon,
  Trash2, RefreshCw, AlertTriangle, ShieldAlert, CheckCircle2, Globe, ArrowLeft, X, Sparkles, Paperclip, MapPin
} from 'lucide-react';
import { analyzeEmergencyQuery, AiTriageResponse } from '../services/aiService';
import { Link } from 'react-router-dom';
import { CloudinaryUploader } from '../components/common/CloudinaryUploader';
import { uploadToCloudinary } from '../services/cloudinaryService';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  triage?: AiTriageResponse;
  image?: string;
  timestamp: string;
  location?: { lat: number; lng: number };
}

export const AiAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('roadguard_ai_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: '1',
        sender: 'ai',
        text: 'Hello, I am Golden Hour AI, your emergency triage assistant. Select a quick emergency button below or type your situation for instant life-saving protocols.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [isWakeWordActive, setIsWakeWordActive] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wakeWordRecognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isWakeWordActive && !isListening) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase();
        
        const triggerWords = ['emergency', 'help', 'hey assistant', 'आपातकाल', 'मदद'];
        
        if (triggerWords.some(word => transcript.includes(word))) {
          recognition.stop();
          
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(language === 'hi' ? "सुन रही हूँ" : "Listening");
            utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
            utterance.onend = () => {
              startSpeechRecognition();
            };
            window.speechSynthesis.speak(utterance);
          } else {
            startSpeechRecognition();
          }
        }
      };

      recognition.onend = () => {
        if (isWakeWordActive && !isListening) {
          try {
            recognition.start();
          } catch (e) {
            console.error('Wake word restart error:', e);
          }
        }
      };

      try {
        recognition.start();
        wakeWordRecognitionRef.current = recognition;
      } catch (e) {
        console.error('Wake word start error:', e);
      }
    } else {
      if (wakeWordRecognitionRef.current) {
        wakeWordRecognitionRef.current.stop();
      }
    }

    return () => {
      if (wakeWordRecognitionRef.current) {
        wakeWordRecognitionRef.current.stop();
      }
    };
  }, [isWakeWordActive, isListening, language]);

  useEffect(() => {
    localStorage.setItem('roadguard_ai_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    { label: language === 'hi' ? 'भारी रक्तस्राव' : 'Heavy Bleeding', query: 'Heavy bleeding from leg wound' },
    { label: language === 'hi' ? 'बेहोश व्यक्ति' : 'Unconscious Person', query: 'Person is unconscious and unresponsive after crash' },
    { label: language === 'hi' ? 'सीपीआर की आवश्यकता' : 'CPR Needed', query: 'Patient not breathing, need CPR guidance' },
    { label: language === 'hi' ? 'हड्डी टूटना (फ्रैक्चर)' : 'Fracture', query: 'Suspected leg fracture, how to stabilize' },
    { label: language === 'hi' ? 'जलना (बर्न्स)' : 'Burns', query: 'Severe chemical or heat burns on arm' },
    { label: language === 'hi' ? 'सिर में चोट' : 'Head Injury', query: 'Head injury with dizziness and bleeding' },
    { label: language === 'hi' ? 'सीने में दर्द' : 'Chest Pain', query: 'Sudden severe chest pain and breathlessness' },
    { label: language === 'hi' ? 'सड़क दुर्घटना' : 'Road Accident', query: 'Car collision trauma triage required' },
    { label: language === 'hi' ? 'बिजली का झटका' : 'Electric Shock', query: 'Electric shock unconscious patient protocol' },
    { label: language === 'hi' ? 'सांप का काटना' : 'Snake Bite', query: 'Snake bite first aid instructions' },
  ];

  const handleSendMessage = async (textToSend?: string | React.SyntheticEvent, imageToAttach?: string) => {
    let queryValue = inputMessage;
    if (typeof textToSend === 'string') {
      queryValue = textToSend;
    } else if (textToSend && typeof (textToSend as React.SyntheticEvent).preventDefault === 'function') {
      (textToSend as React.SyntheticEvent).preventDefault();
    }
    
    const query = queryValue;
    if (!query.trim() && !imageToAttach) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      image: imageToAttach || selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setSelectedImage(null);
    setIsLoading(true);

    // Automatic background task to fetch precise location for emergency report
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === userMsg.id 
                ? { ...msg, location: { lat: latitude, lng: longitude } } 
                : msg
            )
          );
        },
        (error) => {
          console.error("Error fetching location for emergency report:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }

    try {
      // Check offline status
      if (!navigator.onLine) {
        setTimeout(() => {
          const offlineMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: language === 'hi' ? 'ऑफ़लाइन मोड सक्रिय है। यहाँ आपका आपातकालीन मार्गदर्शिका है:' : 'Offline mode active. Predefined emergency guidance loaded:',
            triage: {
              immediateAction: 'Ensure scene safety, call 108 immediately, apply firm direct pressure for bleeding.',
              whatNotToDo: 'Do not panic or move victim unnecessarily.',
              riskLevel: 'High',
              ambulanceRequired: true,
              goldenHourAdvice: 'Golden Hour treatment is critical within 60 minutes.',
              safetyPrecautions: 'Wear gloves and stay calm.',
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, offlineMsg]);
          setIsLoading(false);
        }, 800);
        return;
      }

      const triageResult = await analyzeEmergencyQuery(query, language);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: userMsg.image ? (language === 'hi' ? 'छवि का विश्लेषण पूरा हुआ (सिम्युलेटेड):' : 'Accident image analysis complete (Simulated):') : (language === 'hi' ? 'गोल्डन ऑवर एआई ट्राइएज प्रोटोकॉल:' : 'Golden Hour AI Triage Protocol:'),
        triage: triageResult,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Error processing query. Please dial 108 directly for emergency assistance.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsListening(true);
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        handleSendMessage(transcript);
      };
      
      setTimeout(() => {
        try {
          recognition.start();
        } catch(e) {
          console.error(e);
          setIsListening(false);
        }
      }, 100);
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  const speakText = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.onend = () => {
        setSpeakingMessageId(null);
        setIsPaused(false);
      };
      window.speechSynthesis.speak(utterance);
      setSpeakingMessageId(id);
      setIsPaused(false);
    }
  };

  const pauseSpeech = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } else if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      }
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      setIsPaused(false);
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: language === 'hi' ? 'चैट इतिहास साफ़ कर दिया गया है। नई आपातकालीन सहायता के लिए पूछें।' : 'Chat history cleared. Ask for new emergency guidance.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header & Back link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <Globe className="w-4 h-4 text-amber-500" />
              <span>{language === 'en' ? '🇮🇳 हिन्दी (Hindi)' : '🇺🇸 English'}</span>
            </button>

            <button
              onClick={clearHistory}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-100 hover:text-rose-600 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-rose-600 to-red-700 text-white rounded-2xl p-4 sm:p-6 shadow-lg flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 animate-pulse">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base">
              {language === 'hi' ? 'महत्वपूर्ण आपातकालीन सूचना' : 'Emergency Dispatch Notice'}
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 leading-snug">
              {language === 'hi'
                ? 'यदि मरीज बेहोश है, सांस नहीं ले रहा है या गंभीर रूप से रक्तस्राव हो रहा है, तो तुरंत 108 डायल करें।'
                : 'Call 108 immediately if the patient is unconscious, not breathing, or bleeding heavily.'}
            </p>
          </div>
        </div>

        {/* Main AI Chat Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col h-[650px]">
          {/* Chat Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white text-base">Golden Hour AI Triage Assistant</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Trauma Protocols & Speech Synthesis</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsWakeWordActive(!isWakeWordActive)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                  isWakeWordActive
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
                title="Say 'Hey Assistant', 'Help', or 'Emergency' to wake"
              >
                <div className={`w-2 h-2 rounded-full ${isWakeWordActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                <span>Hands-Free Mode</span>
              </button>
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
                ● Online Active
              </span>
            </div>
          </div>

          {/* Quick Prompt Emergency Buttons */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 overflow-x-auto flex space-x-2">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.query)}
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm flex-shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div key={msg.id} className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xl rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm ${
                    isAi
                      ? 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
                      : 'bg-amber-500 text-white'
                  }`}>
                    <div className="flex items-center justify-between text-[11px] opacity-75 mb-1">
                      <span className="font-bold flex items-center space-x-1">
                        <span>{isAi ? 'Golden Hour AI' : 'You'}</span>
                        {msg.location && (
                          <span className="flex items-center space-x-0.5 bg-white/20 px-1.5 py-0.5 rounded-full ml-2 text-[9px]" title={`Lat: ${msg.location.lat.toFixed(4)}, Lng: ${msg.location.lng.toFixed(4)}`}>
                            <MapPin className="w-2.5 h-2.5" />
                            <span>Location Attached</span>
                          </span>
                        )}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {msg.image && (
                      <div className="rounded-xl overflow-hidden max-h-48 border border-slate-200 dark:border-slate-700">
                        <img src={msg.image} alt="Accident Upload Preview" className="w-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}

                    <p className="text-sm leading-relaxed">{msg.text}</p>

                    {/* AI Structured Triage Response Format */}
                    {msg.triage && (
                      <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="font-bold text-slate-500 block text-[10px] uppercase">Risk Level</span>
                            <span className={`font-black ${
                              msg.triage.riskLevel === 'Critical' ? 'text-rose-600' : msg.triage.riskLevel === 'High' ? 'text-orange-500' : 'text-amber-500'
                            }`}>
                              {msg.triage.riskLevel}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="font-bold text-slate-500 block text-[10px] uppercase">Ambulance 108</span>
                            <span className="font-black text-emerald-600 dark:text-emerald-400">
                              {msg.triage.ambulanceRequired ? 'Required Immediately' : 'Optional'}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 space-y-1">
                          <span className="font-bold text-emerald-800 dark:text-emerald-300 block uppercase text-[10px]">⚡ Immediate Action:</span>
                          <p className="text-slate-800 dark:text-slate-200 font-medium">{msg.triage.immediateAction}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 space-y-1">
                          <span className="font-bold text-rose-800 dark:text-rose-300 block uppercase text-[10px]">❌ What NOT to do:</span>
                          <p className="text-slate-800 dark:text-slate-200">{msg.triage.whatNotToDo}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 space-y-1">
                          <span className="font-bold text-amber-800 dark:text-amber-300 block uppercase text-[10px]">⏳ Golden Hour Advice:</span>
                          <p className="text-slate-800 dark:text-slate-200">{msg.triage.goldenHourAdvice}</p>
                        </div>

                        {/* Voice Speech Synthesis Output Buttons */}
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">Read aloud protocol</span>
                          {speakingMessageId === msg.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={pauseSpeech}
                                className="px-3 py-1 rounded-lg bg-amber-500 text-white font-bold text-[11px]"
                              >
                                {isPaused ? 'Resume' : 'Pause'}
                              </button>
                              <button
                                onClick={stopSpeech}
                                className="px-3 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px]"
                              >
                                Stop
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => speakText(`${msg.text}. Immediate Action: ${msg.triage?.immediateAction}. What not to do: ${msg.triage?.whatNotToDo}`, msg.id)}
                              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px] hover:bg-blue-700 shadow-sm"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Speak Protocol</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center space-x-3 text-slate-500">
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
                  <span className="text-xs font-semibold">AI is analyzing trauma protocols & generating triage guide...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Cloudinary Upload Drawer Panel */}
          {showUploadPanel && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 animate-fadeIn space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Upload Accident Evidence to Cloudinary</span>
                <button 
                  onClick={() => setShowUploadPanel(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-medium"
                >
                  Close
                </button>
              </div>

              <CloudinaryUploader
                folder="ai_chat_attachments"
                acceptedTypes="auto"
                maxSizeMB={50}
                value={selectedImage}
                description="Upload images or short video clips for AI trauma analysis"
                compact
                onUploadSuccess={(res) => {
                  setSelectedImage(res.secureUrl);
                  setShowUploadPanel(false);
                }}
                onRemove={() => setSelectedImage(null)}
              />
            </div>
          )}

          {/* Image Preview if selected */}
          {selectedImage && !showUploadPanel && (
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={selectedImage} alt="Selected" className="w-12 h-12 object-cover rounded-xl border ring-2 ring-indigo-500" referrerPolicy="no-referrer" />
                <div>
                  <span className="text-xs text-slate-800 dark:text-slate-200 font-semibold block">Media Attached</span>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Stored on Cloudinary CDN</span>
                </div>
              </div>
              <button onClick={() => setSelectedImage(null)} className="text-slate-400 hover:text-rose-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-3xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <button
                type="button"
                onClick={() => setShowUploadPanel(!showUploadPanel)}
                className={`p-3 rounded-xl transition-colors ${
                  showUploadPanel || selectedImage 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                title="Upload Cloudinary Media Attachment"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={startSpeechRecognition}
                className={`p-3 rounded-xl transition-colors ${
                  isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
                title="Voice Input (Speech Recognition)"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={language === 'hi' ? 'अपनी आपातस्थिति यहाँ टाइप करें (उदा. भारी रक्तस्राव)...' : 'Type emergency query or symptoms (e.g. heavy bleeding)...'}
                className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md transition-all flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>

            {/* Disclaimer Footer */}
            <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-3">
              This assistant provides emergency guidance but does not replace professional medical care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
