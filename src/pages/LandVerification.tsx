import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ShieldCheck, Info, Loader2, Landmark } from 'lucide-react';
import { LAND_CASES } from '../api/landData';
import { useAppContext } from '../context/AppContext';

interface Props {
  onComplete: () => void;
}

const LandVerification: React.FC<Props> = ({ onComplete }) => {
  const { setSelectedCase } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>('ghor');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // محاكاة الربط مع دائرة الأراضي
    setTimeout(() => {
      const result = LAND_CASES[selectedKey];
      setSelectedCase(result);
      setVerified(true);
      setLoading(false);
    }, 1800);
  };

  const activeCase = LAND_CASES[selectedKey];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Landmark className="w-8 h-8 text-emerald-600" />
          بوابة التحقق القانوني (دائرة الأراضي)
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          اختر أحد النماذج الحقيقية أدناه لمحاكاة عملية جلب البيانات من سجلات دائرة الأراضي والمساحة والربط مع أنظمة وزارة الزراعة.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">بيانات السند القانوني</h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                DLS Verified System
              </div>
            </div>
            
            <form onSubmit={handleVerify} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 block">اختر نموذج الأرض (حالات حقيقية)</label>
                  <div className="space-y-3">
                    {Object.entries(LAND_CASES).map(([key, item]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedKey(key)}
                        className={`
                          cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between
                          ${selectedKey === key ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-slate-200'}
                        `}
                      >
                        <div>
                          <p className="font-bold text-sm">{item.locationName}</p>
                          <p className="text-xs text-slate-500">{item.governorate}</p>
                        </div>
                        {selectedKey === key && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">البيانات التي سيتم جلبها:</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">رقم القطعة:</span>
                      <span className="text-xs font-bold font-mono">{activeCase.parcelNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">اسم الحوض:</span>
                      <span className="text-xs font-bold">{activeCase.basin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">المساحة المسجلة:</span>
                      <span className="text-xs font-bold">{activeCase.area} دونم</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">المالك:</span>
                      <span className="text-xs font-bold">{activeCase.owner}</span>
                    </div>
                  </div>
                </div>
              </div>

              {!verified ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                      جاري الاتصال بقواعد بيانات DLS...
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6" />
                      التحقق والربط مع السجلات الرسمية
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-5">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-900 text-lg">تم سحب البيانات بنجاح</p>
                      <p className="text-sm text-emerald-700">تم تأكيد ملكية الأرض وربطها بإحداثيات موقع (Agri-Guard) الفني.</p>
                    </div>
                  </div>
                  <button
                    onClick={onComplete}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                  >
                    عرض التحليل الفني ولوحة التحكم
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-800 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h4 className="font-bold text-xl flex items-center gap-2">
                <Info className="w-6 h-6 text-emerald-300" />
                الشمول المالي الرقمي
              </h4>
              <p className="text-sm text-emerald-100 leading-relaxed">
                هذا النظام يهدف لأتمتة العمليات الورقية في <b>وزارة الزراعة</b> الأردنية. عبر الربط المباشر مع <b>دائرة الأراضي</b>، نضمن دقة وسرعة صرف تعويضات التأمين لصغار المزارعين.
              </p>
              <ul className="space-y-3 text-xs text-emerald-200 pt-2">
                <li className="flex gap-2">✓ تفعيل فوري لطلب التأمين</li>
                <li className="flex gap-2">✓ تقدير آلي للأضرار بالأقمار الصناعية</li>
                <li className="flex gap-2">✓ دفع عبر Zain Cash و Orange Money</li>
              </ul>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-slate-400" />
              الموقع الجغرافي المسجل
            </h4>
            <div className="aspect-video bg-slate-100 rounded-xl relative overflow-hidden shadow-inner border border-slate-100">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-80"></div>
               <div className="absolute inset-0 bg-black/20"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="flex flex-col items-center">
                   <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                     <MapPin className="w-6 h-6" />
                   </div>
                   <div className="mt-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-800">
                     {activeCase.coordinates.lat}, {activeCase.coordinates.lng}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandVerification;
