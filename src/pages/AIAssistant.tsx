import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MapPin, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getSmartAIResponse, fetchRealWeather, fetchSatelliteInsights } from '../api/liveDataService';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const { selectedCase } = useAppContext();
  const userName = selectedCase?.owner || 'أحمد العبادي';
  const location = selectedCase?.locationName || 'دير علا - الأغوار';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: `يا هلا بيك مزارع ${userName.split(' ')[0]}! أنا مستشارك الذكي وبفهم عليك بأي لهجة. قمت بتحليل أرضك في ${location} لموسم 2026. شو حابب تسألني اليوم؟`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const coords = selectedCase?.coordinates || { lat: 32.18, lng: 35.61 };
      const [weather, satellite] = await Promise.all([
        fetchRealWeather(coords.lat, coords.lng),
        fetchSatelliteInsights(coords.lat, coords.lng)
      ]);

      const context = {
        location: location,
        governorate: selectedCase?.governorate || 'البلقاء',
        owner: userName,
        soil: selectedCase?.analysis.soilType || 'طينية',
        ndvi: satellite.ndvi,
        temp: weather.temp,
        humidity: weather.humidity
      };

      const botResponse = await getSmartAIResponse(input, context);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">مستشار AgriGuard الذكي</h2>
            <p className="text-xs text-emerald-600 flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3" /> مدعوم بـ Gemini 1.5 Pro
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] text-slate-500 flex items-center gap-1 shadow-sm">
            <MapPin className="w-3 h-3" /> {location}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.type === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'} gap-3 items-start animate-in slide-in-from-bottom-2`}
            >
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm
                ${msg.type === 'user' ? 'bg-slate-800 text-white' : 'bg-emerald-600 text-white'}
              `}>
                {msg.type === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
              </div>
              <div className={`
                max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-md
                ${msg.type === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}
              `}>
                {msg.text}
                <div className={`text-[9px] mt-2 font-bold ${msg.type === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start gap-3 items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div className="bg-white border border-slate-100 px-5 py-3 rounded-2xl rounded-tl-none shadow-md">
                <div className="flex gap-1">
                   <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative flex items-center gap-3">
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="اسألني أي شيء عن أرضك أو التأمين لعام 2026..."
               className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 pr-6 pl-16 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm shadow-inner font-medium"
             />
             <button 
               type="submit"
               disabled={!input.trim() || isLoading}
               className="absolute left-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white p-3 rounded-xl shadow-lg transition-all"
             >
               <Send className="w-5 h-5 rotate-180" />
             </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
             {[
               'شو وضع الأرض اليوم؟',
               'بدي أعرف عن تأمين الصقيع',
               'قديش دعم الوزارة؟'
             ].map((suggest, i) => (
               <button 
                 key={i}
                 onClick={() => setInput(suggest)}
                 className="text-[11px] font-bold bg-white hover:bg-emerald-50 border border-slate-200 px-4 py-2 rounded-full text-slate-600 transition-all shadow-sm hover:border-emerald-200 hover:text-emerald-700"
               >
                 {suggest}
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
