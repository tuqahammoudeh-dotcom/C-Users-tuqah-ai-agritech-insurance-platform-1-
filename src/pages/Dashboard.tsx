import React from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Thermometer, 
  TrendingUp, 
  Landmark, 
  Fingerprint, 
  Cpu, 
  BarChart2, 
  ArrowUpRight,
  User,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAppContext } from '../context/AppContext';

import { useEffect, useState } from 'react';
import { fetchRealWeather, fetchSatelliteInsights, getAgentVerdict, WeatherData, SatelliteData } from '../api/liveDataService';
import { Sparkles, Bot, ChevronDown } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { selectedCase } = useAppContext();
  const [liveWeather, setLiveWeather] = useState<WeatherData | null>(null);
  const [liveSatellite, setLiveSatellite] = useState<SatelliteData | null>(null);
  const [agentVerdict, setAgentVerdict] = useState<string>('جاري تحليل البيانات بواسطة AI Agent...');
  const [isLiveLoading, setIsLiveLoading] = useState(true);

  // إذا لم يتم اختيار أرض، نعرض بيانات افتراضية (الغور)
  const land = selectedCase || {
    locationName: 'دير علا - الأغوار الوسطى',
    governorate: 'البلقاء',
    owner: 'عيسى العدوان',
    area: 35,
    parcelNumber: '442',
    basin: 'أبو الزيغان (12)',
    coordinates: { lat: 32.18, lng: 35.61 },
    analysis: {
      ndvi: 0.65,
      soilType: 'طينية ثقيلة',
      soilHealth: 88,
      primaryRisk: 'الصقيع',
      riskLevel: 'Medium'
    },
    insurance: {
      recommendedPackage: 'باقة الحماية من الصقيع',
      basePremium: 45,
      moaSupport: 0.50
    }
  };

  useEffect(() => {
    async function loadLiveData() {
      setIsLiveLoading(true);
      const coords = land.coordinates || { lat: 32.18, lng: 35.61 };
      const [weather, satellite] = await Promise.all([
        fetchRealWeather(coords.lat, coords.lng),
        fetchSatelliteInsights(coords.lat, coords.lng)
      ]);
      setLiveWeather(weather);
      setLiveSatellite(satellite);
      
      const verdict = await getAgentVerdict({
        location: land.locationName,
        parcel: land.parcelNumber,
        ndvi: satellite.ndvi,
        temp: weather.temp,
        humidity: weather.humidity,
        soil: land.analysis.soilType
      });
      setAgentVerdict(verdict);
      setIsLiveLoading(false);
    }
    loadLiveData();
  }, [selectedCase]);

  const chartData = [
    { name: 'شباط', ndvi: (liveSatellite?.ndvi || land.analysis.ndvi) - 0.1 },
    { name: 'آذار', ndvi: (liveSatellite?.ndvi || land.analysis.ndvi) - 0.05 },
    { name: 'نيسان', ndvi: (liveSatellite?.ndvi || land.analysis.ndvi) },
    { name: 'أيار', ndvi: (liveSatellite?.ndvi || land.analysis.ndvi) + 0.05 },
    { name: 'حزيران', ndvi: (liveSatellite?.ndvi || land.analysis.ndvi) - 0.02 },
  ];



  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Top Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200">
            <Cpu className="w-9 h-9" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">مرحباً، {land.owner}</h1>
            <p className="text-slate-500 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              أرضك في {land.locationName} تحت الرقابة التقنية
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-emerald-600 px-5 py-3 rounded-2xl shadow-lg shadow-emerald-200 flex items-center gap-3 text-white">
            <Bot className="w-6 h-6 animate-pulse" />
            <div className="text-right">
              <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">AI Agent Status</p>
              <p className="text-sm font-bold">نشط (تحليل حقيقي)</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Agent Analysis Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shrink-0 shadow-xl shadow-emerald-500/20 rotate-3">
            <Sparkles className="w-10 h-10 text-slate-900" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold italic tracking-wide">التحليل الفني لوكيل AgriGuard (2026)</h2>
              <span className="px-3 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold border border-emerald-500/30">Gemini 1.5 Pro Enabled</span>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed font-medium">
              {isLiveLoading ? 'جاري معالجة بيانات الأقمار الصناعية والطقس...' : `"${agentVerdict}"`}
            </p>
          </div>
          <button className="bg-white text-slate-900 font-bold px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-emerald-50 transition-all shrink-0">
            تحميل التقرير الكامل
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card 1: Legal Identity Card */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold">هوية الأرض القانونية</h3>
            </div>
            <Fingerprint className="w-5 h-5 opacity-50" />
          </div>
          <div className="p-8 space-y-6 flex-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">رقم القطعة</p>
                <p className="font-mono text-lg font-bold text-slate-800">{land.parcelNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">الحوض</p>
                <p className="text-sm font-bold text-slate-800">{land.basin}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">المساحة</p>
                <p className="text-sm font-bold text-slate-800">{land.area} دونم</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">المرجعية</p>
                <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                  <Activity className="w-3 h-3" /> سجلات DLS
                </p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">المالك المسجل</p>
                  <p className="text-sm font-bold text-slate-800">{land.owner}</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500 italic">
                  "هذه البيانات مستخرجة من قاعدة بيانات دائرة الأراضي والمساحة لأغراض تقييم التأمين الزراعي."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: AI Technical Analysis */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-emerald-50 text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold">تحليل الذكاء الاصطناعي (Agri-Fin)</h3>
            </div>
            <div className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-emerald-600 shadow-sm border border-emerald-100">
              Gemini 1.5 Pro Enabled
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl relative overflow-hidden">
                  {isLiveLoading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">NDVI (Live)</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{liveSatellite?.ndvi || land.analysis.ndvi}</p>
                  <p className="text-[10px] text-slate-500 mt-1">كثافة الغطاء النباتي الحالية</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl relative overflow-hidden">
                  {isLiveLoading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">الطقس (Live)</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{liveWeather?.temp || 28}°م</p>
                  <p className="text-[10px] text-slate-500 mt-1">{liveWeather?.description || 'صافي'}</p>
                </div>
              </div>

              <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase text-emerald-400 mb-2">تقييم المخاطر (Risk Score)</p>
                  <div className="flex items-end gap-2">
                    <h4 className="text-4xl font-bold">
                      {liveSatellite 
                        ? (100 - liveSatellite.healthScore + (liveWeather ? (liveWeather.temp < 5 ? 30 : 0) : 0)) + '%'
                        : land.analysis.riskLevel === 'High' ? '82%' : '45%'}
                    </h4>
                    <p className={`text-sm font-bold mb-1 ${land.analysis.riskLevel === 'High' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {land.analysis.riskLevel === 'High' ? 'خطر مرتفع' : 'متوسط'}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
                    <ShieldAlert className="w-4 h-4 text-orange-400" />
                    الرطوبة الحالية: {liveWeather?.humidity}% | الرياح: {liveWeather?.windSpeed} كم/س
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-600" />
                تحليل صحة التربة والإنتاجية (Live)
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'صحة التربة', value: liveSatellite?.healthScore || land.analysis.soilHealth, color: '#10b981' },
                        { name: 'المخاطر', value: 100 - (liveSatellite?.healthScore || land.analysis.soilHealth), color: '#f59e0b' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-8 text-[10px] font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  صحة التربة ({liveSatellite?.healthScore || land.analysis.soilHealth}%)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  المخاطر المتبقية
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weather & Trends */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              تطور حالة المحصول (Satellite Data)
            </h3>
            <button className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
              تقرير كامل <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="ndvi" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorNdvi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insurance recommendation based on MoA */}
        <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-800/50 w-fit px-3 py-1 rounded-full border border-emerald-700">
                  وزارة الزراعة - صندوق إدارة المخاطر
                </div>
                <h3 className="text-2xl font-bold mt-2">توصية التأمين الذكية</h3>
              </div>
              <Activity className="w-10 h-10 text-emerald-500 opacity-50" />
            </div>
            
            <div className="mt-8 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-bold">{land.insurance.recommendedPackage}</p>
                  <p className="text-xs text-emerald-300">متوافق مع خطر {land.analysis.primaryRisk}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-emerald-300">دعم الوزارة المستحق</p>
                  <p className="text-lg font-bold">{(land.insurance.moaSupport * 100)}%</p>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-emerald-300">القسط لكل دونم</p>
                  <p className="text-lg font-bold">{land.insurance.basePremium} د.أ</p>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              // سيتم توجيه المزارع لصفحة الباقات
              window.dispatchEvent(new CustomEvent('changeTab', { detail: 'insurance' }));
            }}
            className="relative z-10 w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold py-4 rounded-xl mt-6 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            تفعيل طلب التأمين الفوري
            <ArrowUpRight className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
        </div>
      </div>
      
      {land.analysis.riskLevel === 'High' && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-start gap-5 animate-pulse">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
            <AlertTriangle className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900">تنبيه فني حرج</h4>
            <p className="text-sm text-amber-800 leading-relaxed mt-1">
              تشير تحليلاتنا لبيانات الأقمار الصناعية لنقص حاد في رطوبة التربة في قطعتك. هذا قد يؤدي لرفض طلب التعويض مستقبلاً إذا لم يتم تفعيل أنظمة الري التكميلي فوراً. 
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
