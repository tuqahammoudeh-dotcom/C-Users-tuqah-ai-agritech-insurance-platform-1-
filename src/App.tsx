import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  ShieldAlert, 
  FileText, 
  Wallet, 
  Menu, 
  X, 
  Bell, 
  User,
  Leaf,
  MessageSquare
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import LandVerification from './pages/LandVerification';
import RiskAssessment from './pages/RiskAssessment';
import InsurancePackages from './pages/InsurancePackages';
import Payment from './pages/Payment';
import AIAssistant from './pages/AIAssistant';
import { useEffect } from 'react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleTabChange = (e: any) => setActiveTab(e.detail);
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'land', label: 'هوية الأرض', icon: MapIcon },
    { id: 'risk', label: 'تقييم المخاطر', icon: ShieldAlert },
    { id: 'insurance', label: 'باقات التأمين', icon: FileText },
    { id: 'payment', label: 'الدفع الإلكتروني', icon: Wallet },
    { id: 'ai', label: 'المستشار الذكي', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'land': return <LandVerification onComplete={() => setActiveTab('dashboard')} />;
      case 'risk': return <RiskAssessment onBrowse={() => setActiveTab('insurance')} />;
      case 'insurance': return <InsurancePackages onSelect={() => setActiveTab('payment')} />;
      case 'payment': return <Payment />;
      case 'ai': return <AIAssistant />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row" dir="rtl">
      {/* Mobile Header */}
      <div className="md:hidden bg-emerald-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6" />
          <span className="font-bold text-lg">AgriGuard Jordan</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        fixed md:static inset-y-0 right-0 z-50 w-64 bg-white border-l border-slate-200 transition-transform duration-300 ease-in-out
        flex flex-col
      `}>
        <div className="p-6 border-b border-slate-100 hidden md:flex items-center gap-3 text-emerald-700">
          <Leaf className="w-8 h-8" />
          <h1 className="text-xl font-bold leading-tight">AgriGuard<br/><span className="text-sm font-normal text-slate-500">مستشار المزارع الذكي</span></h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${activeTab === item.id 
                  ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">أحمد العبادي</p>
              <p className="text-xs text-slate-500 truncate">مزارع - السلط</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="hidden md:flex bg-white h-16 border-b border-slate-200 items-center justify-between px-8">
          <div className="flex items-center gap-2 text-slate-600">
            <h2 className="text-lg font-medium">{menuItems.find(i => i.id === activeTab)?.label}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-sm font-medium italic text-emerald-600">Jordan Agri-FinTech</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
