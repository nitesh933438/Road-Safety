import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertTriangle, User, Paperclip } from 'lucide-react';

export const CommunityChat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'System', type: 'alert', text: 'SOS Broadcast: Accident reported at NH-44. Requesting nearby volunteers.', time: '10:02 AM' },
    { id: 2, sender: 'Dr. Priya (Volunteer)', type: 'user', text: "I'm 2 mins away, heading there now.", time: '10:03 AM' },
    { id: 3, sender: 'City Hospital Dispatch', type: 'system', text: 'Ambulance DL-12-3456 dispatched. ETA 8 mins.', time: '10:04 AM' },
    { id: 4, sender: 'Ravi (First Responder)', type: 'user', text: 'Victim is conscious but bleeding. Need trauma kit.', time: '10:06 AM' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "I'm on the way",
    "Call Ambulance",
    "Victim Conscious",
    "Need CPR kit",
    "Traffic is clear"
  ];

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setInput('');
  };

  const handleQuickReply = (text: string) => {
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
      
      {/* Chat Header */}
      <div className="bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Emergency Coordination</h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">● 4 Members Active</p>
          </div>
        </div>
        <div className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
          ID: INC-9942
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}
          >
            {msg.type === 'alert' ? (
              <div className="w-full flex justify-center my-2">
                <div className="bg-rose-100 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-2" />
                  {msg.text}
                </div>
              </div>
            ) : msg.type === 'system' ? (
              <div className="w-full flex justify-center my-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-medium px-4 py-1.5 rounded-lg flex items-center">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div className={`max-w-[80%] ${msg.sender === 'You' ? 'order-1' : 'order-2'}`}>
                <div className={`flex items-center mb-1 ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{msg.sender}</span>
                  <span className="text-[10px] text-slate-400 ml-2">{msg.time}</span>
                </div>
                <div className={`p-3 rounded-2xl ${
                  msg.sender === 'You' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
        
        {/* Quick Replies */}
        <div className="flex overflow-x-auto space-x-2 pb-3 no-scrollbar">
          {quickReplies.map(reply => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full whitespace-nowrap transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type emergency update..."
            className="flex-1 bg-slate-100 dark:bg-slate-900 border-none focus:ring-2 focus:ring-emerald-500 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

    </div>
  );
};
