import React from 'react';
import { 
  Settings, 
  HelpCircle, 
  CheckCircle, 
  Check, 
  Users, 
  Gift, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Monitor, 
  ShieldAlert, 
  Archive,
  Receipt,
  Home,
  BarChart2,
  Tag,
  CreditCard,
  BatteryCharging,
  MoreHorizontal,
  LogOut,
  Bell
} from 'lucide-react';

// Custom Network Logo based on the activation screen logo but smaller
const NetworkLogo = () => (
  <div className="relative w-10 h-10 flex items-center justify-center bg-[#E6F4F1] rounded-full shrink-0">
    <svg viewBox="0 0 100 100" className="w-7 h-7 relative z-10 drop-shadow-sm">
      <defs>
        <linearGradient id="dash-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#247A7B" />
          <stop offset="60%" stopColor="#7B61FF" />
          <stop offset="100%" stopColor="#E04096" />
        </linearGradient>
      </defs>
      <path d="M25,40 C40,20 60,20 75,40" fill="none" stroke="url(#dash-logo-grad)" strokeWidth="12" strokeLinecap="round"/>
      <path d="M35,53 C45,43 55,43 65,53" fill="none" stroke="url(#dash-logo-grad)" strokeWidth="12" strokeLinecap="round"/>
      <path d="M45,66 C50,60 55,60 60,66 L45,82 C55,82 60,75 62,70" fill="none" stroke="url(#dash-logo-grad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export const DashboardTopBar = ({ networkName, onSettingsClick, onUtilityClick }: { networkName: string, onSettingsClick: () => void, onUtilityClick: () => void }) => (
  <div className="flex justify-between items-center w-full px-5 pt-4 pb-2">
    <div className="flex items-center space-x-2 space-x-reverse">
      <NetworkLogo />
      <span className="text-lg font-bold text-[#247A7B]">{networkName}</span>
    </div>
    <div className="flex space-x-2 space-x-reverse">
      <button onClick={onUtilityClick} className="w-[38px] h-[38px] rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-700">
        <HelpCircle size={20} strokeWidth={1.8} />
      </button>
      <button onClick={onSettingsClick} className="w-[38px] h-[38px] rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-700">
        <Settings size={20} strokeWidth={1.8} />
      </button>
    </div>
  </div>
);

export const DashboardGreetingSection = ({ greetingDate, subscriptionExpiry, remainingMessages }: { greetingDate: string, subscriptionExpiry: string, remainingMessages: number }) => (
  <div className="flex flex-col w-full px-5 pt-2 pb-4 space-y-1">
    <p className="text-[14px] text-gray-500 font-medium text-right">{greetingDate}</p>
    <div className="flex justify-between items-center w-full">
      <p className="text-[14px] text-gray-500 font-medium">الاشتراك حتى {subscriptionExpiry}</p>
      <p className="text-[14px] text-gray-500 font-medium">الرسائل المتبقية: <span className="text-red-500 font-bold">{remainingMessages}</span></p>
    </div>
  </div>
);

export const SystemStatusCard = ({ isActive, title, description }: { isActive: boolean, title: string, description: string }) => (
  <div className="mx-5 mb-4 p-3.5 rounded-2xl border-[1.5px] border-[#34D399] bg-[#F0FDF4] flex items-center justify-between">
    <div className="flex items-center space-x-3 space-x-reverse">
      <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
        <Check size={18} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-[#059669] font-bold text-[15px]">{title}</h3>
        <p className="text-gray-500 text-[12px] font-medium">{description}</p>
      </div>
    </div>
    {isActive && (
      <div className="flex items-center space-x-1 space-x-reverse border border-[#10B981] rounded-full px-2 py-0.5 bg-white">
        <span className="text-[#059669] text-[11px] font-bold">نشطة</span>
        <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] flex items-center justify-center text-white">
          <Check size={10} strokeWidth={3} />
        </div>
      </div>
    )}
  </div>
);

export const CustomerBalanceCard = ({ amount, accounts, cards }: { amount: number, accounts: number, cards: number }) => (
  <div className="mx-5 mb-5 rounded-3xl p-5 text-white relative overflow-hidden" 
       style={{ background: 'linear-gradient(to left, #2A797A 0%, #A4508B 100%)' }}>
    {/* Subtle gloss effect over gradient */}
    <div className="absolute inset-0 bg-white opacity-5 mix-blend-overlay"></div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-end space-x-2 space-x-reverse mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-[#E04096]"></div>
        <h3 className="text-white/90 text-[14px] font-medium">إجمالي رصيد العملاء (المعلق)</h3>
      </div>
      <div className="text-left mb-6 mt-1">
        <span className="text-[34px] font-bold tracking-tight">{amount} </span>
        <span className="text-[20px] font-bold opacity-90">ر.ي</span>
      </div>
      
      <div className="h-[1px] w-full bg-white/20 mb-4"></div>
      
      <div className="flex justify-between items-center w-full px-2">
        <div className="flex flex-col items-center flex-1">
          <Gift size={20} className="text-white/80 mb-1" strokeWidth={1.5} />
          <span className="text-[18px] font-bold mb-0.5">{cards}</span>
          <span className="text-[12px] text-white/80">كروت متوفرة</span>
        </div>
        <div className="w-[1px] h-10 bg-white/20"></div>
        <div className="flex flex-col items-center flex-1">
          <Users size={20} className="text-white/80 mb-1" strokeWidth={1.5} />
          <span className="text-[18px] font-bold mb-0.5">{accounts}</span>
          <span className="text-[12px] text-white/80">الحسابات</span>
        </div>
      </div>
    </div>
  </div>
);

export const SalesCardsRow = ({ daily, monthly }: { daily: { amount: number, cards: number }, monthly: { amount: number, cards: number } }) => (
  <div className="flex w-full px-5 space-x-3 space-x-reverse mb-5">
    {/* Daily Card */}
    <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-3.5 relative overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <div className="w-7 h-7 rounded bg-[#E6F4F1] flex items-center justify-center text-[#247A7B]">
          <TrendingUp size={16} strokeWidth={2} />
        </div>
        <h4 className="text-[13px] font-bold text-gray-700">مبيعات اليوم</h4>
        <span className="text-gray-400 text-xs">&lt;</span>
      </div>
      <div className="text-left mt-1 mb-1">
        <span className="text-[22px] font-bold text-[#1A202C]">{daily.amount}</span>
        <span className="text-[13px] text-gray-500 mr-1">ر.ي</span>
      </div>
      <div className="flex justify-start">
        <div className="bg-[#E6F4F1] text-[#247A7B] px-2 py-0.5 rounded text-[11px] font-bold">
          {daily.cards} كرت
        </div>
      </div>
    </div>
    
    {/* Monthly Card */}
    <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-3.5 relative overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <div className="w-7 h-7 rounded bg-[#E6F4F1] flex items-center justify-center text-[#247A7B]">
          <Calendar size={16} strokeWidth={2} />
        </div>
        <h4 className="text-[13px] font-bold text-gray-700">مبيعات الشهر</h4>
        <span className="text-gray-400 text-xs">&lt;</span>
      </div>
      <div className="text-left mt-1 mb-1">
        <span className="text-[22px] font-bold text-[#1A202C]">{monthly.amount}</span>
        <span className="text-[13px] text-gray-500 mr-1">ر.ي</span>
      </div>
      <div className="flex justify-start">
        <div className="bg-[#E6F4F1] text-[#247A7B] px-2 py-0.5 rounded text-[11px] font-bold">
          {monthly.cards} كرت
        </div>
      </div>
    </div>
  </div>
);

const QuickActionCard = ({ title, icon, onClick }: { title: string, icon: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col items-center justify-center space-y-3 transition-transform active:scale-[0.98] w-full aspect-square"
  >
    <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] flex items-center justify-center text-[#247A7B]">
      {icon}
    </div>
    <span className="text-[14px] font-bold text-[#1A202C] text-center px-2">{title}</span>
  </button>
);

export const QuickActionsGrid = ({ onActionClick }: { onActionClick: (action: string) => void }) => (
  <div className="grid grid-cols-2 gap-3 px-5 mb-6">
    <QuickActionCard 
      title="بيع مباشر - يدوي" 
      icon={<Plus size={24} strokeWidth={2} />} 
      onClick={() => onActionClick('manualDirectSale')} 
    />
    <QuickActionCard 
      title="حسابات نقاط البيع" 
      icon={<Monitor size={24} strokeWidth={2} />} 
      onClick={() => onActionClick('salesPoints')} 
    />
    <QuickActionCard 
      title="الأرقام المحظورة" 
      icon={<ShieldAlert size={24} strokeWidth={2} />} 
      onClick={() => onActionClick('blockedNumbers')} 
    />
    <QuickActionCard 
      title="إدارة ملفات الاستيراد" 
      icon={<Archive size={24} strokeWidth={2} />} 
      onClick={() => onActionClick('importFiles')} 
    />
  </div>
);

export const RecentOperationsSection = ({ hasOperations, onAllClick }: { hasOperations: boolean, onAllClick: () => void }) => (
  <div className="flex flex-col px-5">
    <div className="flex justify-between items-center mb-4">
      <button onClick={onAllClick} className="text-[#247A7B] text-[14px] font-bold">
        جميع المعاملات
      </button>
      <div className="flex items-center space-x-1.5 space-x-reverse">
        <h3 className="text-[#1A202C] text-[17px] font-bold">آخر العمليات</h3>
        <div className="w-2 h-2 rounded-full bg-[#247A7B]"></div>
      </div>
    </div>
    
    {!hasOperations && (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center text-center">
        <Receipt size={48} className="text-gray-600 mb-4" strokeWidth={1.5} />
        <h4 className="text-[17px] font-bold text-[#1A202C] mb-2">لا توجد عمليات حديثة</h4>
        <p className="text-[13px] text-gray-500 font-medium">ستظهر العمليات هنا عند استلام التحويلات وصرف الكروت</p>
      </div>
    )}
  </div>
);

export const DashboardFloatingActionButton = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="absolute left-6 bottom-24 w-14 h-14 bg-[#CA5C9B] rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform active:scale-[0.95] z-10"
  >
    <Plus size={28} strokeWidth={2.5} />
  </button>
);

export const DashboardBottomNavigation = ({ currentTab, onTabSelect }: { currentTab: string, onTabSelect: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: <Home size={22} strokeWidth={2} /> },
    { id: 'reports', label: 'التقارير', icon: <BarChart2 size={22} strokeWidth={2} /> },
    { id: 'offers', label: 'العروض', icon: <Tag size={22} strokeWidth={2} /> },
    { id: 'accounts', label: 'الحسابات', icon: <Users size={22} strokeWidth={2} /> },
    { id: 'cards', label: 'الكروت', icon: <CreditCard size={22} strokeWidth={2} /> },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 pb-safe pt-2 px-2 flex justify-between items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] h-20">
      {tabs.map(tab => {
        const isActive = currentTab === tab.id;
        return (
          <button 
            key={tab.id}
            onClick={() => onTabSelect(tab.id)}
            className="flex-1 flex flex-col items-center justify-center space-y-1 relative"
          >
            <div className={`px-4 py-1 rounded-full transition-colors ${isActive ? 'bg-[#E6F4F1] text-[#247A7B]' : 'text-gray-500'}`}>
              {tab.icon}
            </div>
            <span className={`text-[12px] font-bold ${isActive ? 'text-[#247A7B]' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const DashboardPermissionDialog = ({ onConfirm, onDismiss }: { onConfirm: () => void, onDismiss: () => void }) => (
  <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center px-5 backdrop-blur-sm">
    <div className="bg-white rounded-3xl w-full max-w-sm p-6 flex flex-col items-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
      <div className="w-12 h-12 bg-[#E6F4F1] rounded-2xl flex items-center justify-center text-[#247A7B] mb-4">
        <BatteryCharging size={24} strokeWidth={2} />
      </div>
      
      <h2 className="text-[20px] font-bold text-[#1A202C] mb-4">التشغيل في الخلفية</h2>
      
      <p className="text-[14.5px] text-gray-600 text-center font-medium leading-[1.7] mb-5 px-1">
        لضمان استمرار خدمة Z Net في استقبال رسائل المحافظ وتوزيع الكروت للعملاء تلقائياً دون توقف، يحتاج التطبيق إلى إذن العمل في الخلفية وتجاوز تحسين البطارية.
      </p>
      
      <p className="text-[14.5px] text-gray-700 text-center font-medium leading-[1.6] mb-8">
        يرجى اختيار "متابعة" ثم "السماح" في النافذة التالية.
      </p>
      
      <div className="flex items-center justify-between w-full space-x-3 space-x-reverse">
        <button 
          onClick={onConfirm}
          className="bg-[#247A7B] text-white font-bold py-3 px-6 rounded-xl text-[16px] transition-transform active:scale-[0.98] shadow-sm flex-1"
        >
          متابعة
        </button>
        <button 
          onClick={onDismiss}
          className="text-[#1A202C] font-bold py-3 px-6 rounded-xl text-[16px] hover:bg-gray-50 transition-colors flex-1"
        >
          ليس الآن
        </button>
      </div>
    </div>
  </div>
);
