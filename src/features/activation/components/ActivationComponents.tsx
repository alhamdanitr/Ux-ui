import React from 'react';
import { 
  Smartphone, 
  Server, 
  Key, 
  Gift, 
  CheckCircle, 
  ShieldCheck, 
  RefreshCw, 
  Wifi, 
  Check 
} from 'lucide-react';

export const ActivationHeader = () => (
  <div className="flex flex-col items-center justify-center pt-8 pb-4 space-y-3">
    <ActivationLogo />
    <h1 className="text-[26px] font-bold text-[#247A7B]">تفعيل تطبيق زد نت</h1>
    <p className="text-[#718096] text-base text-center px-4 font-medium">
      أدخل بياناتك لتفعيل الترخيص أو بدء النسخة التجريبية المجانية
    </p>
  </div>
);

export const ActivationLogo = () => (
  <div className="relative w-36 h-36 flex items-center justify-center mb-1">
    {/* Soft backdrop glow mimicking the image */}
    <div className="absolute inset-0 bg-[#E6F4F1] rounded-full blur-3xl opacity-70"></div>
    {/* Stylized custom Z / Wifi SVG */}
    <svg viewBox="0 0 100 100" className="w-28 h-28 relative z-10 drop-shadow-sm">
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#247A7B" />
          <stop offset="60%" stopColor="#7B61FF" />
          <stop offset="100%" stopColor="#E04096" />
        </linearGradient>
      </defs>
      {/* Top Arc */}
      <path d="M25,40 C40,20 60,20 75,40" fill="none" stroke="url(#logo-grad)" strokeWidth="11" strokeLinecap="round"/>
      {/* Middle Arc */}
      <path d="M35,53 C45,43 55,43 65,53" fill="none" stroke="url(#logo-grad)" strokeWidth="11" strokeLinecap="round"/>
      {/* Bottom connecting Z part */}
      <path d="M45,66 C50,60 55,60 60,66 L45,82 C55,82 60,75 62,70" fill="none" stroke="url(#logo-grad)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

interface InputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
}

const AppTextField = ({ label, value, onChange, icon, placeholder, type = "text" }: InputProps) => (
  <div className="relative w-full mb-5">
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
      {icon}
    </div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir="ltr"
      className="w-full bg-white border-[1.5px] border-gray-300 text-gray-900 text-lg rounded-2xl focus:outline-none focus:border-[#247A7B] block pr-12 pl-4 py-[14px] text-right font-medium transition-colors"
    />
    <label className="absolute -top-[10px] right-4 bg-white px-2 text-[13px] text-gray-500 font-medium">
      {label}
    </label>
  </div>
);

export const PhoneNumberInput = ({ value, onChange }: Omit<InputProps, 'label' | 'icon'>) => (
  <AppTextField 
    label="رقم الجوال" 
    value={value} 
    onChange={onChange} 
    icon={<Smartphone size={22} strokeWidth={1.8} />} 
  />
);

export const NetworkNameInput = ({ value, onChange }: Omit<InputProps, 'label' | 'icon'>) => (
  <AppTextField 
    label="اسم الشبكة" 
    value={value} 
    onChange={onChange} 
    icon={<Server size={22} strokeWidth={1.8} />} 
  />
);

export const ActivationKeyInput = ({ value, onChange }: Omit<InputProps, 'label' | 'icon'>) => (
  <AppTextField 
    label="مفتاح التفعيل" 
    value={value} 
    onChange={onChange} 
    icon={<Key size={22} strokeWidth={1.8} />} 
  />
);

export const TrialPackageCard = ({ selected, onToggle }: { selected: boolean, onToggle: (val: boolean) => void }) => (
  <div 
    className={`flex items-start p-4 rounded-2xl border-[1.5px] cursor-pointer transition-all w-full bg-white mb-6 ${
      selected ? 'border-[#247A7B]' : 'border-gray-200'
    }`}
    onClick={() => onToggle(!selected)}
  >
    <div className="flex-1 ml-3 text-right pt-0.5">
      <h3 className={`text-[17px] font-bold ${selected ? 'text-[#247A7B]' : 'text-[#1A202C]'}`}>
        باقة النسخة التجريبية المجانية
      </h3>
      <p className="text-[13px] text-gray-500 mt-1 leading-snug">
        تفعيل باقة تجريبية مجانية مؤقتة لتقييم خدمات التطبيق
      </p>
    </div>
    <div 
      className={`w-[22px] h-[22px] mt-1 rounded flex items-center justify-center transition-colors ${
        selected ? 'bg-[#247A7B] border-none' : 'border-[2px] border-gray-300'
      }`}
    >
      {selected && <Check size={16} className="text-white" strokeWidth={3.5} />}
    </div>
  </div>
);

export const DeviceBindingNotice = () => (
  <p className="text-[13px] text-gray-500 text-center mt-5 px-4 leading-relaxed font-medium">
    بعد التفعيل، سيتم ربط الترخيص بهذا الجهاز ولا يمكن نقله لجهاز آخر.
  </p>
);

export const ActivateButton = ({ onClick, isTrialSelected }: { onClick: () => void, isTrialSelected: boolean }) => (
  <button
    onClick={onClick}
    className="w-full py-[15px] px-4 rounded-2xl bg-[#247A7B] text-white font-bold text-[17px] mt-2 transition-transform active:scale-[0.98] flex items-center justify-center space-x-2 space-x-reverse shadow-sm"
  >
    {isTrialSelected ? (
      <>
        <Gift size={20} strokeWidth={2} className="ml-2" />
        <span>تفعيل النسخة التجريبية</span>
      </>
    ) : (
      <>
        <CheckCircle size={20} strokeWidth={2} className="ml-2" />
        <span>تفعيل بالمفتاح</span>
      </>
    )}
  </button>
);

export const ActivationLoadingContent = () => (
  <div className="flex flex-col items-center flex-1 h-full w-full pt-[12vh]">
    <div className="w-[100px] h-[100px] bg-[#E6F3F3] rounded-full flex items-center justify-center mb-8">
      <ShieldCheck size={52} className="text-[#247A7B]" strokeWidth={1.5} />
    </div>
    <h2 className="text-[26px] font-bold text-[#1A202C] mb-3">جاري تفعيل الترخيص</h2>
    <p className="text-[#718096] text-[18px] mb-16 font-medium">...جاري الاتصال بالخادم</p>
    
    <div className="relative w-[70px] h-[70px]">
      <div className="absolute inset-0 border-[5px] border-[#E6F3F3] rounded-full"></div>
      <div className="absolute inset-0 border-[5px] border-transparent border-t-[#247A7B] border-r-[#247A7B] rounded-full animate-spin"></div>
    </div>
  </div>
);

export const ActivationErrorBanner = ({ onRetryClick }: { onRetryClick: () => void }) => (
  <div className="flex flex-col items-center flex-1 h-full w-full pt-[12vh] px-6">
    <div className="w-[100px] h-[100px] bg-[#E6F3F3] rounded-full flex items-center justify-center mb-8">
      <ShieldCheck size={52} className="text-[#247A7B]" strokeWidth={1.5} />
    </div>
    <h2 className="text-[26px] font-bold text-[#1A202C] mb-12">جاري تفعيل الترخيص</h2>
    
    <div className="w-full bg-[#FCE8E8] rounded-2xl p-[18px] mb-8">
      <p className="text-[#D93838] text-center font-semibold text-[17px]">
        تم استخدام النسخة التجريبية مسبقاً على هذا الجهاز.
      </p>
    </div>

    <button
      onClick={onRetryClick}
      className="w-full py-[15px] px-4 rounded-2xl bg-[#247A7B] text-white font-bold text-[17px] flex items-center justify-center transition-transform active:scale-[0.98] shadow-sm"
    >
      <RefreshCw size={20} strokeWidth={2.5} className="ml-2" />
      <span>إعادة المحاولة</span>
    </button>

    <div className="mt-auto w-full bg-[#FCE8E8] rounded-2xl p-6 mb-10 text-center flex flex-col space-y-2.5">
      <h3 className="text-[#D93838] font-bold text-[20px]">النسخة المجانية مستخدمة</h3>
      <p className="text-[#D93838] text-[15px] font-medium">
        تم استخدام النسخة التجريبية المجانية مسبقاً على هذا الجهاز.
      </p>
    </div>
  </div>
);

export const ActivationNoInternetContent = ({ onRetryClick }: { onRetryClick: () => void }) => (
  <div className="flex flex-col items-center flex-1 h-full w-full pt-[16vh] px-6">
    <Wifi size={90} className="text-[#247A7B] mb-10" strokeWidth={1.8} />
    
    <h2 className="text-[26px] font-bold text-[#1A202C] mb-5">لا يوجد اتصال بالإنترنت</h2>
    
    <p className="text-[#718096] text-center text-[17px] leading-[1.6] mb-12 px-1 font-medium">
      يحتاج التطبيق للاتصال بالإنترنت للمرة الأولى فقط لتأمين الإعدادات وتفعيل النظام بنجاح. يرجى التأكد من تشغيل الواي فاي أو بيانات الهاتف والمحاولة مجدداً.
    </p>

    <div className="bg-[#D1FAE5] text-[#059669] px-6 py-2.5 rounded-full flex items-center mb-14 font-bold text-[15px]">
      <Wifi size={18} strokeWidth={2.5} className="ml-2" />
      <span dir="ltr">متصل • WiFi</span>
    </div>

    <button
      onClick={onRetryClick}
      className="w-full py-[15px] px-4 rounded-2xl bg-[#247A7B] text-white font-bold text-[17px] transition-transform active:scale-[0.98] shadow-sm"
    >
      إعادة المحاولة
    </button>
  </div>
);
