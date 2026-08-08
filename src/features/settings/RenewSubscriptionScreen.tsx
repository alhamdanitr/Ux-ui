import React, { useState } from 'react';
import { ArrowRight, KeyRound, RefreshCw, BookMarked } from 'lucide-react';

interface RenewSubscriptionScreenProps {
  onBackClick: () => void;
}

export const RenewSubscriptionScreen: React.FC<RenewSubscriptionScreenProps> = ({ onBackClick }) => {
  const [renewalKey, setRenewalKey] = useState('');

  return (
    <div className="w-full h-full bg-[#F6F8F9] flex flex-col overflow-hidden relative" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-8 pb-6 shrink-0 relative z-10">
        <button 
          onClick={onBackClick}
          className="absolute right-4 p-2 -mr-2 text-gray-400 active:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="text-[22px] font-bold text-[#1A202C] w-full text-center">
          تجديد الترخيص
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        
        {/* License Summary Card */}
        <div className="bg-white rounded-[24px] p-6 mb-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="bg-[#D1FAE5] text-[#059669] px-4 py-1.5 rounded-full text-[14px] font-bold">
              ساري
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-[17px] font-bold text-[#1A202C]">ملخص الترخيص</h2>
              <div className="text-[#247A7B]">
                <BookMarked className="w-7 h-7" strokeWidth={2} />
              </div>
            </div>
          </div>
          
          <div className="h-[1px] bg-gray-100 w-full mb-6" />

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-[#1A202C]">زد نت مجاني</span>
              <span className="text-[15px] font-bold text-gray-500">الباقة الحالية</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-[#1A202C]" dir="ltr">100 / 100</span>
              <span className="text-[15px] font-bold text-gray-500">الرسائل المتبقية</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-[#1A202C]">24 أكتوبر 2026</span>
              <span className="text-[15px] font-bold text-gray-500">تاريخ الانتهاء</span>
            </div>
          </div>
        </div>

        {/* Enter Renewal Key Card */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
          <h2 className="text-[17px] font-bold text-[#1A202C] text-right mb-6">أدخل مفتاح التجديد</h2>
          
          <div className="relative mb-6">
            <input
              type="text"
              value={renewalKey}
              onChange={(e) => setRenewalKey(e.target.value)}
              placeholder="مفتاح التجديد"
              className="w-full bg-white border-[1.5px] border-gray-200 text-gray-900 text-[15px] rounded-2xl focus:outline-none focus:border-[#247A7B] block pr-12 pl-4 py-4 text-right font-medium transition-colors placeholder:text-gray-400"
              dir="rtl"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#2F4F4F] font-bold">
              <KeyRound className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>

          <button className="w-full py-4 rounded-2xl bg-[#247A7B] text-white font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm">
            <span>تجديد الترخيص</span>
            <RefreshCw className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
};
