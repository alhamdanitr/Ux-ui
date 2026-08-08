import React, { useState } from 'react';
import { ArrowRight, Play, Trash2 } from 'lucide-react';

interface TemplateSimulationScreenProps {
  onBackClick: () => void;
}

export const TemplateSimulationScreen: React.FC<TemplateSimulationScreenProps> = ({ onBackClick }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('all');

  return (
    <div className="w-full h-full bg-[#F6F8F9] flex flex-col" dir="rtl">
      {/* Header */}
      <div className="bg-[#F6F8F9] pt-8 px-4 pb-6 shrink-0">
        <div className="flex items-start justify-between">
          <div className="w-10" /> {/* Spacer for centering */}
          
          <div className="flex flex-col items-center flex-1">
            <h1 className="text-[20px] font-bold text-[#1A202C]">محاكاة القوالب</h1>
            <p className="text-[13px] text-gray-500 font-medium mt-1 text-center max-w-[220px]">
              اختبار قوالب استخراج البيانات من رسائل SMS
            </p>
          </div>
          
          <button 
            onClick={onBackClick}
            className="p-2 -ml-2 text-[#1A202C] active:bg-gray-100 rounded-full transition-colors mt-1"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="px-4 flex-1">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm mb-6">
          <h2 className="text-[15px] font-bold text-[#1A202C] mb-4 text-right">نص الرسالة</h2>
          
          <div className="relative mb-6">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="ألصق أي رسالة هنا..."
              className="w-full h-32 bg-white border border-[#E2E8F0] rounded-xl p-4 text-[15px] text-[#1A202C] resize-none focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
              dir="rtl"
            />
          </div>

          <div className="relative mb-6 mt-6">
            <label className="absolute -top-[10px] right-4 bg-white px-2 text-[13px] text-[#247A7B] font-medium z-10">
              المحفظة (اختياري)
            </label>
            <select
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
              className="w-full h-14 bg-white border border-[#247A7B] rounded-xl px-4 text-[15px] text-[#1A202C] focus:outline-none appearance-none font-bold"
              dir="rtl"
            >
              <option value="all">كل المحافظ (افتراضي)</option>
              <option value="wallet1">محفظة جيب</option>
              <option value="wallet2">محفظة جوالي</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              className="flex-1 h-14 border border-gray-200 bg-white rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => setMessageText('')}
            >
              <span className="text-[15px] font-bold text-[#1A202C]">مسح</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8696 3.44975 14.5696 3.25624 14.2307 3.16104C13.8617 3 13.4475 3 12.619 3H11.381C10.5525 3 10.1383 3 9.76934 3.16104C9.43037 3.25624 9.13035 3.44975 8.90731 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M10 10V17M14 10V17" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="flex-1 h-14 bg-[#247A7B] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#1E6667] transition-colors shadow-sm">
              <span className="text-[15px] font-bold">محاكاة</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 1.5L9.5 6L2.5 10.5V1.5Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>

        {/* Result Area */}
        <div className="bg-[#E6F4F1]/30 border border-[#E2E8F0] rounded-2xl p-12 flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-12 h-12 bg-[#CBD5E1] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15.5C15 17.433 13.433 19 11.5 19C9.567 19 8 17.433 8 15.5C8 14.4751 8.44141 13.5534 9.1416 12.9118C9.65868 12.438 10.3667 12 11.5 12V4.5C11.5 3.11929 12.6193 2 14 2C15.3807 2 16.5 3.11929 16.5 4.5V11" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-[15px] text-gray-500 font-medium">
            اضغط "محاكاة" لرؤية النتيجة
          </p>
        </div>
      </div>
    </div>
  );
};
