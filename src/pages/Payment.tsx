import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle2, Lock, ArrowLeft, Shield } from 'lucide-react';

const Payment: React.FC = () => {
  const [method, setMethod] = useState<'zain' | 'orange' | 'card'>('zain');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2500);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-6 animate-in zoom-in-95">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">تمت عملية الدفع!</h1>
          <p className="text-slate-500">تم تفعيل وثيقة التأمين رقم <span className="font-bold text-slate-800">#AG-2026-88291</span> لموسم 2026.</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-right">
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-500">المبلغ المدفوع</span>
            <span className="font-bold">27.50 د.أ</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-200">
            <span className="text-slate-500">طريقة الدفع</span>
            <span className="font-bold text-emerald-600">Zain Cash</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-500">دعم الوزارة</span>
            <span className="font-bold text-blue-600">- 27.50 د.أ (50%)</span>
          </div>
        </div>
        <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg">
          تحميل وثيقة التأمين (PDF)
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 rotate-180" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">إتمام الاشتراك</h1>
          <p className="text-slate-500">باقة الأمان الأساسية - حوض السلط</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">اختر طريقة الدفع</h3>
            </div>
            <div className="p-8 space-y-4">
              <div 
                onClick={() => setMethod('zain')}
                className={`
                  p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between
                  ${method === 'zain' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 hover:border-slate-200'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden border border-slate-100">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Zain_Group_logo.svg/1200px-Zain_Group_logo.svg.png" className="w-8" alt="Zain" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">زين كاش (Zain Cash)</p>
                    <p className="text-xs text-slate-500">دفع فوري عبر المحفظة</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'zain' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                  {method === 'zain' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>

              <div 
                onClick={() => setMethod('orange')}
                className={`
                  p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between
                  ${method === 'orange' ? 'border-orange-500 bg-orange-50/30' : 'border-slate-100 hover:border-slate-200'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden border border-slate-100">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1024px-Orange_logo.svg.png" className="w-8" alt="Orange" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">أورانج موني (Orange Money)</p>
                    <p className="text-xs text-slate-500">المحفظة الإلكترونية لشركة أورانج</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'orange' ? 'border-orange-500 bg-orange-500' : 'border-slate-300'}`}>
                  {method === 'orange' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>

              <div 
                onClick={() => setMethod('card')}
                className={`
                  p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between
                  ${method === 'card' ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100 text-blue-600">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">بطاقة ائتمان / صراف آلي</p>
                    <p className="text-xs text-slate-500">فيزا، ماستركارد، أو إي-فواتيركم</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'card' ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                  {method === 'card' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              تأكيد رقم المحفظة
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">962+</span>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 pr-4 pl-16 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono text-lg tracking-widest"
                  placeholder="7X XXX XXXX"
                />
              </div>
              <button 
                onClick={handlePay}
                disabled={processing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
              >
                {processing ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    دفع 27.50 دينار بأمان
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-400">
                بالنقر على "دفع"، فإنك توافق على شروط وأحكام صندوق إدارة المخاطر الزراعية في الأردن.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl">
            <h3 className="font-bold text-xl mb-6">ملخص الفاتورة</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-slate-400">
                <span>سعر الباقة (45 دونم)</span>
                <span>55.00 د.أ</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>دعم وزارة الزراعة (50%)</span>
                <span>27.50- د.أ</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>رسوم تقنية</span>
                <span>0.00 د.أ</span>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-bold">المجموع النهائي</span>
                <div className="text-right">
                   <p className="text-3xl font-bold">27.50</p>
                   <p className="text-xs text-slate-400">دينار أردني</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 flex gap-4 items-start">
             <div className="p-2 bg-blue-50 rounded-lg shrink-0">
               <Shield className="w-6 h-6 text-blue-600" />
             </div>
             <div>
               <p className="text-xs font-bold text-slate-800">حماية فائقة</p>
               <p className="text-[10px] text-slate-500 leading-tight mt-1">
                 يتم تشفير جميع المعاملات المالية وفقاً لمعايير البنك المركزي الأردني (CBJ).
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
