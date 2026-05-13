import React from 'react';
import { ShieldAlert, Droplet, Wind, CloudRain, ChevronRight, BarChart3 } from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { useAppContext } from '../context/AppContext';

interface Props {
  onBrowse?: () => void;
}

const RiskAssessment: React.FC<Props> = ({ onBrowse }) => {
  const { selectedCase } = useAppContext();
  
  const landName = selectedCase?.locationName || 'دير علا - الأغوار';
  const riskLevel = selectedCase?.analysis.riskLevel || 'Medium';

  const riskProfile = [
    { subject: 'خطر الصقيع', A: selectedCase?.governorate === 'البلقاء' ? 90 : 20, fullMark: 100 },
    { subject: 'خطر الجفاف', A: selectedCase?.governorate === 'المفرق' ? 95 : 40, fullMark: 100 },
    { subject: 'خطر الفيضان', A: 20, fullMark: 100 },
    { subject: 'آفات زراعية', A: selectedCase?.governorate === 'إربد' ? 80 : 50, fullMark: 100 },
    { subject: 'تآكل التربة', A: selectedCase?.governorate === 'إربد' ? 70 : 30, fullMark: 100 },
  ];

  const historicalRainfall = [
    { month: 'ت1', value: selectedCase?.governorate === 'المفرق' ? 5 : 15 },
    { month: 'ت2', value: selectedCase?.governorate === 'المفرق' ? 15 : 45 },
    { month: 'ك1', value: selectedCase?.governorate === 'إربد' ? 140 : 110 },
    { month: 'ك2', value: selectedCase?.governorate === 'إربد' ? 180 : 130 },
    { month: 'شباط', value: 90 },
    { month: 'آذار', value: 60 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">تحليل مخاطر {landName}</h1>
          <p className="text-slate-500">سجلات مناخية محدثة لعام 2026 (المرجع: وزارة الزراعة).</p>
        </div>
        <div className="flex gap-3">
          {riskLevel === 'High' && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm font-bold border border-red-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              منطقة عالية المخاطر
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            بصمة المخاطر المحلية
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskProfile}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#475569', fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Risk Profile"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "نلاحظ ارتفاع خطر <b>الصقيع</b> في هذه المنطقة. تأمين المحاصيل الاستراتيجي يغطي هذا الخطر بنسبة 100%."
            </p>
          </div>
        </div>

        {/* Rainfall History */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-blue-600" />
            معدلات الهطول المطري (مم)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalRainfall}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 border border-slate-100 rounded-xl">
              <p className="text-[10px] text-slate-500 uppercase">معدل التبخر</p>
              <p className="text-lg font-bold text-slate-700">14%</p>
            </div>
            <div className="p-3 border border-slate-100 rounded-xl">
              <p className="text-[10px] text-slate-500 uppercase">مستوى المياه الجوفية</p>
              <p className="text-lg font-bold text-slate-700">-2.4م</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-900 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <h2 className="text-2xl font-bold italic">تقرير المستشار الذكي</h2>
            <p className="text-emerald-100 leading-relaxed">
              بناءً على البيانات المجمعة، أرضك مؤهلة للحصول على "الباقة الشاملة" من وزارة الزراعة. هذه الباقة تغطي خسائر الصقيع بنسبة تصل إلى 5,000 دينار لكل دونم.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <Droplet className="w-4 h-4" /> رطوبة مثالية للقمح
              </div>
              <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <Wind className="w-4 h-4" /> رياح شرقية متوسطة
              </div>
            </div>
          </div>
          <button 
            onClick={onBrowse}
            className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-all shrink-0 shadow-lg shadow-emerald-500/20"
          >
            تصفح الباقات المقترحة
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500 rounded-full blur-3xl -ml-24 -mb-24 opacity-30"></div>
      </div>
    </div>
  );
};

export default RiskAssessment;
