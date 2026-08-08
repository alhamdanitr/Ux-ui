import React, { useState } from 'react';
import { ArrowRight, Settings, DollarSign, Smartphone, CreditCard, Hash, FileText, CheckCircle2, ChevronDown } from 'lucide-react';

interface TemplateWizardScreenProps {
  onBackClick: () => void;
  walletName: string;
}

export const TemplateWizardScreen: React.FC<TemplateWizardScreenProps> = ({ onBackClick, walletName }) => {
  const [step, setStep] = useState(1);
  
  const renderStepIndicators = () => {
    return (
      <div className="flex items-center justify-between w-full px-4 mt-6 mb-8 relative">
        <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-gray-200 -z-10" />
        <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-[#247A7B] -z-10 transition-all duration-300" style={{ width: `${(step - 1) * 33.33}%` }} />
        
        {[
          { num: 1, label: 'الرسالة' },
          { num: 2, label: 'ربط الحقول' },
          { num: 3, label: 'المعاينة' },
          { num: 4, label: 'التأكيد' },
        ].map(s => (
          <div key={s.num} className="flex flex-col items-center gap-2 bg-[#F6F8F9] px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] transition-colors ${step >= s.num ? 'bg-[#247A7B] text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > s.num ? <CheckCircle2 className="w-5 h-5 text-white" /> : s.num}
            </div>
            <span className={`text-[12px] font-bold ${step >= s.num ? 'text-[#247A7B]' : 'text-gray-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-[#F6F8F9] flex flex-col overflow-hidden relative" dir="rtl">
      {/* Header Area */}
      <div className="bg-[#F6F8F9] pt-8 px-4 shrink-0 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <button className="flex items-center gap-1.5 text-[#247A7B] active:opacity-70 transition-opacity">
            <Settings className="w-4 h-4" />
            <span className="text-[14px] font-bold">الوضع المتقدم</span>
          </button>
          
          <div className="flex flex-col items-center flex-1">
            <h1 className="text-[18px] font-bold text-[#1A202C]">معالج القالب</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">إعداد قوالب تحليل رسائل SMS</p>
          </div>
          
          <button 
            onClick={onBackClick}
            className="p-2 -ml-2 text-[#1A202C] active:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
        
        {renderStepIndicators()}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-[16px] font-bold text-[#1A202C]">معلومات القالب والرسالة النموذجية</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-[#1A202C]">المحفظة أو المورد / المرسل</label>
                <div className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 flex items-center justify-between text-[15px]">
                  <span>{walletName}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-[#1A202C]">نوع معرف المشترك للرسالة</label>
                <div className="relative">
                  <select className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 appearance-none text-[15px] focus:outline-none focus:border-[#247A7B]">
                    <option>رقم الجوال (GSM)</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-[#1A202C]">اسم القالب</label>
                <input 
                  type="text" 
                  placeholder={`مثال: ${walletName} — تحويل مشترك`}
                  className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B]"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-[#1A202C]">نص الرسالة النموذجية</label>
                <textarea 
                  placeholder="الصق أي رسالة هنا..."
                  className="w-full h-32 bg-white border border-gray-200 rounded-xl p-4 text-[15px] focus:outline-none focus:border-[#247A7B] resize-none"
                />
              </div>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-[16px] font-bold text-[#1A202C]">ربط الحقول بالقيم الحقيقية</h2>
              <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">حدد القيمة المطابقة لكل حقل من نص الرسالة لتوليد القاعدة تلقائياً.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-[14px] font-bold text-[#1A202C] mb-3">الرسالة النموذجية (تلوين ذكي للقيم المطابقة)</h3>
                <div className="w-full bg-white border border-gray-200 rounded-xl p-4 text-[15px] leading-relaxed text-[#1A202C]">
                  اضيف <span className="bg-[#247A7B] text-white px-1 rounded">100</span> ر.ي <span className="bg-[#C06192] text-white px-1 rounded">تحويل مشترك</span> رص:<span className="bg-[#247A7B] text-white px-1 rounded">52.6189</span> ر.ي من <span className="bg-[#D97706] text-white px-1 rounded">محمد ثابت</span>-<span className="bg-[#247A7B] text-white px-1 rounded">770210108</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[14px] font-bold text-[#1A202C]">المبلغ <span className="text-red-500">(مطلوب) *</span></span>
                  </div>
                  <input type="text" defaultValue="100" className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-4 pr-40 text-left text-[15px] focus:outline-none focus:border-[#247A7B]" dir="ltr" />
                </div>

                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <Smartphone className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[14px] font-bold text-[#1A202C]">رقم الجوال <span className="text-red-500">(مطلوب) *</span></span>
                  </div>
                  <input type="text" defaultValue="770210108" className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-4 pr-44 text-left text-[15px] focus:outline-none focus:border-[#247A7B]" dir="ltr" />
                </div>

                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[14px] font-bold text-[#1A202C]">اسم المرسل <span className="text-gray-500 font-medium">(اختياري)</span></span>
                  </div>
                  <input type="text" defaultValue="محمد ثابت" className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-4 pr-44 text-left text-[15px] focus:outline-none focus:border-[#247A7B]" dir="ltr" />
                </div>

                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <Hash className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[14px] font-bold text-[#1A202C]">الرقم المرجعي للعملية <span className="text-gray-500 font-medium">(اختياري)</span></span>
                  </div>
                  <input type="text" placeholder="مثال: 982736192" className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-4 pr-56 text-left text-[15px] focus:outline-none focus:border-[#247A7B]" dir="ltr" />
                </div>

                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[14px] font-bold text-[#1A202C]">البيان / الملاحظة <span className="text-gray-500 font-medium">(اختياري)</span></span>
                  </div>
                  <input type="text" defaultValue="تحويل مشترك" className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-4 pr-52 text-left text-[15px] focus:outline-none focus:border-[#247A7B]" dir="ltr" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-[16px] font-bold text-[#1A202C]">معاينة الاستخراج التلقائي</h2>
              <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">تأكد من أن النظام قام بقراءة الحقول بنجاح من الرسالة بناءً على الربط الذكي.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-[14px] font-bold text-[#1A202C] mb-3">معاينة تحديد النص</h3>
                <div className="w-full bg-white border border-gray-200 rounded-xl p-4 text-[15px] leading-relaxed text-[#1A202C]">
                  اضيف <span className="bg-[#247A7B] text-white px-1 rounded">100</span> ر.ي <span className="bg-[#C06192] text-white px-1 rounded">تحويل مشترك</span> رص:<span className="bg-[#247A7B] text-white px-1 rounded">52.6189</span> ر.ي من <span className="bg-[#D97706] text-white px-1 rounded">محمد ثابت</span>-<span className="bg-[#247A7B] text-white px-1 rounded">770210108</span>
                </div>
              </div>

              <div className="bg-[#E6F4F1] border border-[#247A7B]/20 rounded-[16px] p-5">
                <div className="flex items-center gap-2 mb-6 text-[#247A7B] justify-center">
                  <h3 className="text-[16px] font-bold">نجح التوليد التلقائي بنجاح!</h3>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#247A7B]" />
                      <span className="text-[14px] text-[#1A202C]">المبلغ <span className="text-red-500">*</span></span>
                    </div>
                    <span className="text-[15px] font-bold text-[#1A202C]">100</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#247A7B]" />
                      <span className="text-[14px] text-[#1A202C]">رقم الجوال <span className="text-red-500">*</span></span>
                    </div>
                    <span className="text-[15px] font-bold text-[#1A202C]">770210108</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#247A7B]" />
                      <span className="text-[14px] text-[#1A202C]">اسم المرسل</span>
                    </div>
                    <span className="text-[15px] font-bold text-[#1A202C]">محمد ثابت</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#247A7B]" />
                      <span className="text-[14px] text-[#1A202C]">البيان / الملاحظة</span>
                    </div>
                    <span className="text-[15px] font-bold text-[#1A202C]">تحويل مشترك</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#247A7B]" />
                      <span className="text-[14px] text-[#1A202C]">رقم العملية</span>
                    </div>
                    <span className="text-[15px] font-bold text-[#1A202C]">—</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-[16px] font-bold text-[#1A202C]">تأكيد وحفظ القالب</h2>
              <p className="text-[13px] text-gray-500 mt-1">اضبط أولوية التحليل وحالة القالب، ثم اضغط "حفظ القالب" في الأسفل.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-[#1A202C]">أولوية معالجة القالب</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-center font-bold text-[16px] focus:outline-none focus:border-[#247A7B]"
                  dir="ltr"
                />
                <p className="text-[12px] text-gray-500 text-center">توليد تلقائي (يمكنك تعديل القيمة يدوياً)</p>
              </div>
              
              <div className="space-y-2 pt-2">
                <label className="text-[14px] font-bold text-[#1A202C]">الحالة</label>
                <div className="relative">
                  <select className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 appearance-none text-[15px] focus:outline-none focus:border-[#247A7B]">
                    <option>مسودة (غير مفعل)</option>
                    <option>نشط</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Area */}
      <div className="bg-white border-t border-gray-100 p-4 flex gap-4 shrink-0 absolute bottom-0 left-0 right-0 z-20">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : onBackClick()}
          className="flex-1 h-12 bg-white border border-gray-200 text-[#1A202C] font-bold text-[15px] rounded-xl hover:bg-gray-50 transition-colors"
        >
          السابق
        </button>
        <button 
          onClick={() => step < 4 ? setStep(step + 1) : onBackClick()}
          className="flex-1 h-12 bg-[#247A7B] text-white font-bold text-[15px] rounded-xl shadow-md hover:bg-[#1E6667] transition-colors"
        >
          {step === 4 ? 'حفظ القالب' : 'التالي'}
        </button>
      </div>
    </div>
  );
};
