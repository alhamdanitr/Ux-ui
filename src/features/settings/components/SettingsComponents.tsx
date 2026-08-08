import React, { useState } from 'react';
import { 
  ArrowRight, 
  Server, 
  CheckCircle2, 
  Filter, 
  History, 
  Cpu, 
  BadgeCheck, 
  Wallet, 
  FlaskConical, 
  MessageSquare, 
  Database, 
  RefreshCw, 
  Download, 
  Brush, 
  Eraser,
  Pencil,
  ChevronLeft,
  Hash
} from 'lucide-react';
import { SettingsUiEvent } from '../SettingsTypes';

export const SettingsHeader: React.FC<{ onBackClick: () => void }> = ({ onBackClick }) => (
  <div className="flex items-center justify-between px-4 pt-8 pb-4 shrink-0">
    <button onClick={onBackClick} className="p-2 -mr-2 text-[#1A202C] active:bg-gray-100 rounded-full transition-colors">
      <ArrowRight className="w-6 h-6" />
    </button>
    <div className="flex-1 mr-3">
      <h1 className="text-[19px] font-bold text-[#1A202C]">الإعدادات</h1>
      <span className="text-[13px] text-gray-500 font-medium mt-0.5 block">تخصيص النظام وإدارة البيانات</span>
    </div>
  </div>
);

export const SettingsSectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-[15px] font-bold text-[#247A7B] mb-2 px-2 mt-4">{title}</h2>
);

interface SettingsItemProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
  hasDivider?: boolean;
}

const SettingsItemBase: React.FC<SettingsItemProps> = ({
  title,
  subtitle,
  icon,
  iconBgColor = 'bg-[#E6F4F1]',
  iconColor = 'text-[#247A7B]',
  onClick,
  trailing,
  hasDivider = true
}) => {
  return (
    <div className="flex flex-col bg-white">
      <div 
        onClick={onClick}
        className={`flex items-center px-4 py-4 ${onClick ? 'active:bg-gray-50 cursor-pointer' : ''}`}
      >
        <div className={`w-11 h-11 rounded-xl ${iconBgColor} ${iconColor} flex items-center justify-center shrink-0 ml-4`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-bold text-[#1A202C] mb-0.5">{title}</h3>
          <p className="text-[13px] text-gray-500 font-medium leading-tight">{subtitle}</p>
        </div>
        {trailing && (
          <div className="mr-4 shrink-0">
            {trailing}
          </div>
        )}
      </div>
      {hasDivider && <div className="h-[1px] bg-gray-100 mx-4" />}
    </div>
  );
};

export const SettingsNavigationItem: React.FC<SettingsItemProps> = (props) => (
  <SettingsItemBase 
    {...props} 
    trailing={<ChevronLeft className="w-5 h-5 text-gray-400" />} 
  />
);

export const SettingsValueItem: React.FC<SettingsItemProps & { value: string }> = (props) => (
  <SettingsItemBase 
    {...props} 
    subtitle={
      <span className="text-[13px] text-gray-500 font-medium">
        {props.subtitle} <span className="text-[#247A7B] font-bold">{props.value}</span>
      </span>
    }
    trailing={<ChevronLeft className="w-5 h-5 text-gray-400" />} 
  />
);

export const SettingsDatabaseItem: React.FC<SettingsItemProps & { value: string; onRefresh: () => void }> = (props) => (
  <SettingsItemBase 
    {...props} 
    subtitle={
      <span className="text-[13px] text-[#247A7B] font-bold block mt-0.5">
        {props.value}
      </span>
    }
    trailing={
      <button onClick={props.onRefresh} className="p-2 text-gray-500 active:bg-gray-100 rounded-full transition-colors">
        <RefreshCw className="w-5 h-5" />
      </button>
    }
  />
);

export const SettingsSwitchItem: React.FC<SettingsItemProps & { checked: boolean; onChange: (checked: boolean) => void }> = (props) => (
  <SettingsItemBase 
    {...props} 
    trailing={
      <div 
        onClick={() => props.onChange(!props.checked)}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          props.checked ? 'bg-[#247A7B]' : 'bg-gray-300'
        }`}
      >
        <div 
          className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${
            props.checked ? '-translate-x-6' : 'translate-x-0'
          }`}
        />
      </div>
    }
  />
);

export const EditNetworkNameDialog: React.FC<{
  currentName: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}> = ({ currentName, onSave, onCancel }) => {
  const [name, setName] = useState(currentName);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={onCancel} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-50 animate-in slide-in-from-bottom max-w-md mx-auto">
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-200 rounded-full" />
        </div>
        
        <div className="px-6 pb-8 pt-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#E6F4F1] text-[#247A7B] flex items-center justify-center shrink-0">
              <Pencil className="w-5 h-5" />
            </div>
            <h2 className="text-[19px] font-bold text-[#1A202C]">تعديل اسم الشبكة</h2>
          </div>
          
          <p className="text-[14px] text-gray-500 font-medium mb-6">
            سيتم استخدام هذا الاسم في نهاية رسائل SMS المرسلة للعملاء.
          </p>

          <div className="relative mb-8">
            <label className="absolute -top-[10px] right-4 bg-white px-2 text-[13px] text-gray-500 font-medium z-10">
              اسم الشبكة
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border-[1.5px] border-gray-300 text-gray-900 text-[15px] rounded-xl focus:outline-none focus:border-[#247A7B] block pr-4 pl-12 py-3.5 text-right font-medium transition-colors"
                dir="ltr"
              />
              <div className="absolute left-4 flex items-center justify-center text-gray-400">
                <Server className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSave(name)}
              className="px-8 py-3.5 bg-[#247A7B] text-white rounded-xl font-bold text-[15px] active:scale-[0.98] transition-transform"
            >
              حفظ
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3.5 text-gray-600 rounded-xl font-bold text-[15px] active:bg-gray-100 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const PosBalanceRequestDialog: React.FC<{
  currentCode: string;
  currentLimit: string;
  onSave: (code: string, limit: string) => void;
  onCancel: () => void;
}> = ({ currentCode, currentLimit, onSave, onCancel }) => {
  const [code, setCode] = useState(currentCode);
  const [limit, setLimit] = useState(currentLimit);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-40 transition-opacity" 
        onClick={onCancel}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform transition-transform animate-slide-up" dir="rtl">
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-200 rounded-full" />
        </div>
        
        <div className="px-6 pb-8 pt-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[#E6F4F1] text-[#247A7B] flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <h2 className="text-[19px] font-bold text-[#247A7B]">إعدادات طلبات الرصيد لنقاط البيع</h2>
          </div>

          <div className="relative mb-6">
            <label className="absolute -top-[10px] right-4 bg-white px-2 text-[13px] text-gray-500 font-medium z-10">
              رمز طلب الرصيد
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-white border-[1.5px] border-gray-300 text-gray-900 text-[15px] rounded-xl focus:outline-none focus:border-[#247A7B] block pr-4 pl-12 py-3.5 text-right font-medium transition-colors"
                dir="ltr"
              />
              <div className="absolute left-4 flex items-center justify-center">
                <div className="bg-gray-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  123
                </div>
              </div>
            </div>
          </div>

          <div className="relative mb-2">
            <label className="absolute -top-[10px] right-4 bg-white px-2 text-[13px] text-gray-500 font-medium z-10">
              عدد طلبات الرصيد المسموح بها يومياً
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full bg-white border-[1.5px] border-gray-300 text-gray-900 text-[15px] rounded-xl focus:outline-none focus:border-[#247A7B] block pr-4 pl-12 py-3.5 text-right font-medium transition-colors"
                dir="ltr"
              />
              <div className="absolute left-4 flex items-center justify-center text-gray-400">
                <Hash className="w-5 h-5" />
              </div>
            </div>
          </div>
          <p className="text-[13px] text-gray-500 font-medium mb-8 pr-4">0 يعطل الميزة بالكامل</p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSave(code, limit)}
              className="px-8 py-3.5 bg-[#247A7B] text-white rounded-xl font-bold text-[15px] active:scale-[0.98] transition-transform"
            >
              حفظ
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3.5 text-gray-600 rounded-xl font-bold text-[15px] active:bg-gray-100 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
