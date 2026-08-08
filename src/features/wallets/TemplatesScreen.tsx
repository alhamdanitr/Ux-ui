import React from 'react';
import { ArrowRight, MoreVertical, Plus, Check } from 'lucide-react';

interface TemplatesScreenProps {
  onBackClick: () => void;
  walletName: string;
  onNewTemplateClick: () => void;
  onEditTemplateClick: (templateId: string) => void;
}

interface TemplateItem {
  id: string;
  name: string;
  isActive: boolean;
  priority: number;
}

export const TemplatesScreen: React.FC<TemplatesScreenProps> = ({ 
  onBackClick, 
  walletName, 
  onNewTemplateClick,
  onEditTemplateClick
}) => {
  const [templates, setTemplates] = React.useState<TemplateItem[]>([
    { id: '1', name: `${walletName} — تحويل مشترك`, isActive: true, priority: 0 },
    { id: '2', name: `${walletName} — رقم بديل`, isActive: true, priority: 1 },
    { id: '3', name: `${walletName} — اسم المرسل فقط`, isActive: true, priority: 2 },
  ]);

  return (
    <div className="w-full h-full bg-[#F6F8F9] flex flex-col overflow-hidden relative" dir="rtl">
      {/* Header Area */}
      <div className="bg-[#F6F8F9] pt-8 px-4 pb-4 shrink-0 relative z-10 border-b border-gray-100">
        <div className="flex items-start justify-between mb-2">
          <button className="p-2 -mr-2 text-[#1A202C] active:bg-gray-100 rounded-full transition-colors mt-1">
            <MoreVertical className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-end mr-4 flex-1">
            <h1 className="text-[20px] font-bold text-[#1A202C]">قوالب {walletName}</h1>
            <p className="text-[13px] text-gray-500 font-medium mt-1 text-right max-w-[220px] leading-relaxed">
              إدارة قوالب استخراج البيانات لهذه المحفظة
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

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-[16px] p-4 shadow-sm border border-[#247A7B]/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[12px] bg-[#E6F4F1] flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-[#247A7B]" />
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-[16px] font-bold text-[#1A202C]">{template.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#E6F4F1] text-[#247A7B] text-[11px] font-bold">نشط</span>
                  <span className="text-[13px] text-gray-500">أولوية: {template.priority}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div 
                className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${template.isActive ? 'bg-[#247A7B]' : 'bg-gray-200'}`}
                onClick={() => {
                  setTemplates(templates.map(t => t.id === template.id ? { ...t, isActive: !t.isActive } : t));
                }}
                dir="ltr"
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${template.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
              
              <button 
                onClick={() => onEditTemplateClick(template.id)} 
                className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <div className="absolute bottom-8 left-4 z-10">
        <button 
          onClick={onNewTemplateClick}
          className="bg-[#C06192] hover:bg-[#B35887] text-white px-5 py-3.5 rounded-[16px] shadow-lg flex items-center gap-2 transition-transform active:scale-95"
        >
          <span className="text-[15px] font-bold">
            قالب جديد
          </span>
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
