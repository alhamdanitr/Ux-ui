import React, { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';

interface SimSettingsScreenProps {
  onBackClick: () => void;
}

export const SimSettingsScreen: React.FC<SimSettingsScreenProps> = ({ onBackClick }) => {
  const [readSim, setReadSim] = useState<'sim1' | 'both'>('sim1');
  const [sendSim, setSendSim] = useState<'sim1' | 'both'>('sim1');

  const SingleSimIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M18 21H6C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L18.7071 6.70711C18.8946 6.89464 19 7.149 19 7.41421V20C19 20.5523 18.5523 21 18 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="8" y="10" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="2"/>
      <rect x="8" y="15" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="2"/>
      <rect x="13" y="10" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="2"/>
      <rect x="13" y="15" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  const DualSimIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M15 17H5C4.44772 17 4 16.5523 4 16V5C4 4.44772 4.44772 4 5 4H11.5858C11.851 4 12.1054 4.10536 12.2929 4.29289L14.7071 6.70711C14.8946 6.89464 15 7.149 15 7.41421V16C15 16.5523 14.5523 17 14.5 17H15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 20H9C8.44772 20 8 19.5523 8 19V8C8 7.44772 8.44772 7 9 7H15.5858C15.851 7 16.1054 7.10536 16.2929 7.29289L18.7071 9.70711C18.8946 9.89464 19 10.149 19 10.4142V19C19 19.5523 18.5523 20 19 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11.5" cy="11.5" r="0.5" fill="currentColor"/>
      <circle cx="11.5" cy="14.5" r="0.5" fill="currentColor"/>
      <circle cx="11.5" cy="17.5" r="0.5" fill="currentColor"/>
      <circle cx="15.5" cy="11.5" r="0.5" fill="currentColor"/>
      <circle cx="15.5" cy="14.5" r="0.5" fill="currentColor"/>
      <circle cx="15.5" cy="17.5" r="0.5" fill="currentColor"/>
    </svg>
  );

  return (
    <div className="w-full h-full bg-[#F6F8F9] flex flex-col overflow-hidden relative" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-8 pb-6 shrink-0 relative z-10">
        <button 
          onClick={onBackClick}
          className="absolute right-4 p-2 -mr-2 text-gray-500 active:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <div className="w-full text-center">
          <h1 className="text-[20px] font-bold text-[#1A202C]">إعدادات شرائح الاتصال</h1>
          <p className="text-[13px] text-gray-500 font-medium mt-0.5 block">إدارة شرائح القراءة والإرسال</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        
        {/* Info Alert */}
        <div className="bg-[#FFFBEB] border border-[#F59E0B] rounded-[16px] p-4 mb-6 flex items-center gap-3 shadow-sm">
          <Info className="w-6 h-6 text-[#D97706] shrink-0" strokeWidth={2} />
          <p className="text-[15px] font-bold text-[#D97706]">تم اكتشاف شريحة واحدة فقط على الجهاز.</p>
        </div>

        {/* Read SIM Card */}
        <div className="bg-white rounded-[24px] p-5 mb-6 shadow-sm border border-gray-100">
          <h2 className="text-[16px] font-bold text-[#1A202C] mb-1">شريحة قراءة رسائل المحافظ</h2>
          <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-4">
            اختر الشريحة التي سيعتمد عليها النظام لقراءة رسائل الإيداع الواردة.
          </p>

          <div className="space-y-3">
            {/* Sim 1 Option */}
            <div 
              onClick={() => setReadSim('sim1')}
              className={`p-4 rounded-xl border-[1.5px] flex items-center justify-between cursor-pointer transition-colors ${readSim === 'sim1' ? 'bg-[#E6F4F1] border-[#247A7B]' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[#247A7B] flex items-center justify-center bg-white shrink-0">
                   {readSim === 'sim1' && <div className="w-2.5 h-2.5 rounded-full bg-[#247A7B]" />}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[16px] font-bold ${readSim === 'sim1' ? 'text-[#1A202C]' : 'text-gray-400'}`}>شريحة 1</span>
                  <span className="text-[13px] font-medium text-gray-400">42103</span>
                </div>
              </div>
              <div className={readSim === 'sim1' ? 'text-[#247A7B]' : 'text-gray-400'}>
                <SingleSimIcon className="w-6 h-6" />
              </div>
            </div>
            
            {/* Both Sims Option */}
            <div 
              onClick={() => setReadSim('both')}
              className={`p-4 rounded-xl border-[1.5px] flex items-center justify-between cursor-pointer transition-colors ${readSim === 'both' ? 'bg-[#E6F4F1] border-[#247A7B]' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${readSim === 'both' ? 'border-[#247A7B] bg-white' : 'border-gray-300'}`}>
                   {readSim === 'both' && <div className="w-2.5 h-2.5 rounded-full bg-[#247A7B]" />}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[16px] font-bold ${readSim === 'both' ? 'text-[#1A202C]' : 'text-gray-400'}`}>كلا الشريحتين</span>
                  <span className="text-[13px] font-medium text-gray-400">النظام سيتعامل مع كلتا الشريحتين</span>
                </div>
              </div>
              <div className={readSim === 'both' ? 'text-[#247A7B]' : 'text-gray-400'}>
                <DualSimIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Send SIM Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
          <h2 className="text-[16px] font-bold text-[#1A202C] mb-1">شريحة إرسال الرسائل للعملاء</h2>
          <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-4">
            اختر الشريحة المستخدمة لإرسال الكروت والإشعارات للعملاء.
          </p>

          <div className="space-y-3">
            {/* Sim 1 Option */}
            <div 
              onClick={() => setSendSim('sim1')}
              className={`p-4 rounded-xl border-[1.5px] flex items-center justify-between cursor-pointer transition-colors ${sendSim === 'sim1' ? 'bg-[#E6F4F1] border-[#247A7B]' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[#247A7B] flex items-center justify-center bg-white shrink-0">
                   {sendSim === 'sim1' && <div className="w-2.5 h-2.5 rounded-full bg-[#247A7B]" />}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[16px] font-bold ${sendSim === 'sim1' ? 'text-[#1A202C]' : 'text-gray-400'}`}>شريحة 1</span>
                  <span className="text-[13px] font-medium text-gray-400">42103</span>
                </div>
              </div>
              <div className={sendSim === 'sim1' ? 'text-[#247A7B]' : 'text-gray-400'}>
                <SingleSimIcon className="w-6 h-6" />
              </div>
            </div>
            
            {/* Both Sims Option */}
            <div 
              onClick={() => setSendSim('both')}
              className={`p-4 rounded-xl border-[1.5px] flex items-center justify-between cursor-pointer transition-colors ${sendSim === 'both' ? 'bg-[#E6F4F1] border-[#247A7B]' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${sendSim === 'both' ? 'border-[#247A7B] bg-white' : 'border-gray-300'}`}>
                   {sendSim === 'both' && <div className="w-2.5 h-2.5 rounded-full bg-[#247A7B]" />}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[16px] font-bold ${sendSim === 'both' ? 'text-[#1A202C]' : 'text-gray-400'}`}>كلا الشريحتين</span>
                  <span className="text-[13px] font-medium text-gray-400">النظام سيتعامل مع كلتا الشريحتين</span>
                </div>
              </div>
              <div className={sendSim === 'both' ? 'text-[#247A7B]' : 'text-gray-400'}>
                <DualSimIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
