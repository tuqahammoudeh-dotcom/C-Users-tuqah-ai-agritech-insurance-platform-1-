import React from 'react';
import { Shield, Check, Info, BadgeCheck, AlertCircle } from 'lucide-react';

const packages = [
  {
    id: 1,
    name: 'باقة الأمان الأساسية',
    category: 'صغار المزارعين',
    price: '25 دينار / دونم',
    coverage: 'تغطي الجفاف والفيضانات',
    features: ['دعم وزارة الزراعة 50%', 'تعويض يصل لـ 1000 د.أ', 'تنبيهات جوية مجانية', 'استشارة زراعية شهرية'],
    isPopular: false,
    color: 'bg-blue-600'
  },
  {
    id: 2,
    name: 'الباقة الشاملة (البلقاء)',
    category: 'المحاصيل الاستراتيجية',
    price: '55 دينار / دونم',
    coverage: 'تغطي الصقيع، الجفاف، والآفات',
    features: ['دعم وزارة الزراعة 70%', 'تعويض يصل لـ 5000 د.أ', 'تحليل NDVI أسبوعي', 'أولوية في صندوق المخاطر', 'تأمين المعدات الزراعية'],
    isPopular: true,
    color: 'bg-emerald-600'
  },
  {
    id: 3,
    name: 'تأمين البيوت البلاستيكية',
    category: 'الزراعة المحمية',
    price: '120 دينار / بيت',
    coverage: 'تغطي الرياح الشديدة والثلوج',
    features: ['دعم وزارة الزراعة 30%', 'تعويض عن تلف الهيكل', 'تغطية للمحاصيل الداخلية', 'صيانة طارئة'],
    isPopular: false,
    color: 'bg-indigo-600'
  }
];

import { useAppContext } from '../context/AppContext';

interface Props {
  onSelect?: () => void;
}

const InsurancePackages: React.FC<Props> = ({ onSelect }) => {
  const { selectedCase } = useAppContext();
  const recommendedPackageName = selectedCase?.insurance.recommendedPackage || 'الباقة الشاملة (البلقاء)';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
            <BadgeCheck className="w-4 h-4" />
            باقات معتمدة من وزارة الزراعة الأردنية لعام 2026
          </div>
          <h1 className="text-3xl font-bold text-slate-800">خطة الحماية لـ {selectedCase?.locationName || 'مزرعتك'}</h1>
          <p className="text-slate-500">تم تحديد الباقات التالية بناءً على تحليل AI Agent للمخاطر في {selectedCase?.governorate || 'منطقتك'}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`
              relative bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col
              ${pkg.isPopular ? 'border-emerald-500 shadow-xl shadow-emerald-100 scale-105 z-10' : 'border-slate-200 hover:border-slate-300'}
            `}
          >
            {pkg.isPopular && (
              <div className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-8 absolute top-6 -left-8 -rotate-45">
                الأكثر طلباً
              </div>
            )}
            
            <div className="p-8 pb-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{pkg.category}</span>
              <h3 className="text-xl font-bold text-slate-800 mt-1">{pkg.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">{pkg.price.split(' ')[0]}</span>
                <span className="text-slate-500 text-sm">{pkg.price.split(' ').slice(1).join(' ')}</span>
              </div>
              <p className="mt-4 text-sm text-slate-600 font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                {pkg.coverage}
              </p>
            </div>

            <div className="p-8 flex-1">
              <ul className="space-y-4">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 pt-0">
              <button 
                onClick={onSelect}
                className={`
                  w-full py-4 rounded-2xl font-bold transition-all
                  ${pkg.name === recommendedPackageName 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 ring-4 ring-emerald-500/20' 
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}
                `}
              >
                {pkg.name === recommendedPackageName ? 'اشتراك (موصى به)' : 'اشتراك الآن'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
          <AlertCircle className="w-8 h-8 text-amber-500" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="font-bold text-amber-900">ملاحظة هامة حول دعم الوزارة</h4>
          <p className="text-sm text-amber-800 leading-relaxed">
            يتم خصم قيمة دعم وزارة الزراعة (50%-70%) تلقائياً عند الدفع إذا كانت المساحة المسجلة أقل من 100 دونم. للمساحات الأكبر، يرجى مراجعة أقرب مديرية زراعة.
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-amber-900 bg-amber-100 px-4 py-2 rounded-lg hover:bg-amber-200 transition-all">
          <Info className="w-4 h-4" />
          شروط الاستحقاق
        </button>
      </div>
    </div>
  );
};

export default InsurancePackages;
