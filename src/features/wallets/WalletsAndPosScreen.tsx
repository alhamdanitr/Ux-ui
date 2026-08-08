import React, { useState } from 'react';
import { ArrowRight, MoreVertical, Search, Wallet, MessageSquare, Edit2, Settings, Trash2, Plus, Check, CheckSquare, Square } from 'lucide-react';
import { TemplatesScreen } from './TemplatesScreen';
import { TemplateWizardScreen } from './TemplateWizardScreen';

interface WalletsAndPosScreenProps {
  onBackClick: () => void;
}

type TabType = 'pos' | 'wallets';
type ViewState = 'main' | 'templates' | 'wizard';

interface WalletItem {
  id: string;
  name: string;
  senderId: string;
  isActive: boolean;
  color: 'teal' | 'pink';
}

interface PosItem {
  id: string;
  name: string;
  phone: string;
  isActive: boolean;
  debtLimit?: string;
}

export const WalletsAndPosScreen: React.FC<WalletsAndPosScreenProps> = ({ onBackClick }) => {
  const [activeTab, setActiveTab] = useState<TabType>('pos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation state
  const [currentView, setCurrentView] = useState<ViewState>('main');
  const [selectedWalletName, setSelectedWalletName] = useState<string>('');
  
  // Mock data based on images
  const [wallets, setWallets] = useState<WalletItem[]>([
    { id: '1', name: 'جيب', senderId: 'JAIB', isActive: true, color: 'teal' },
    { id: '2', name: 'جوالي', senderId: 'JAWALI', isActive: true, color: 'pink' }
  ]);
  
  const [posItems, setPosItems] = useState<PosItem[]>([]);
  
  const [showNewWalletSheet, setShowNewWalletSheet] = useState(false);
  const [showNewPosSheet, setShowNewPosSheet] = useState(false);
  
  // Edit sheets
  const [showEditWalletSheet, setShowEditWalletSheet] = useState(false);
  const [showEditPosSheet, setShowEditPosSheet] = useState(false);
  const [editingWallet, setEditingWallet] = useState<WalletItem | null>(null);
  const [editingPos, setEditingPos] = useState<PosItem | null>(null);
  
  // State for active menu
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  
  // Form state
  const [newWalletData, setNewWalletData] = useState({ senderId: '', name: '' });
  const [newPosData, setNewPosData] = useState({ phone: '', name: '', debtLimit: '50000', createDefaultTemplate: true });

  const handleCreateWallet = () => {
    if (!newWalletData.senderId || !newWalletData.name) return;
    const newWallet: WalletItem = {
      id: Math.random().toString(36).substring(7),
      name: newWalletData.name,
      senderId: newWalletData.senderId,
      isActive: true,
      color: 'teal'
    };
    setWallets([...wallets, newWallet]);
    setNewWalletData({ senderId: '', name: '' });
    setShowNewWalletSheet(false);
  };

  const handleCreatePos = () => {
    if (!newPosData.phone || !newPosData.name) return;
    const newPos: PosItem = {
      id: Math.random().toString(36).substring(7),
      name: newPosData.name,
      phone: newPosData.phone,
      isActive: true,
      debtLimit: newPosData.debtLimit
    };
    setPosItems([...posItems, newPos]);
    setNewPosData({ phone: '', name: '', debtLimit: '50000', createDefaultTemplate: true });
    setShowNewPosSheet(false);
  };

  const handleSaveEditWallet = () => {
    if (!editingWallet) return;
    setWallets(wallets.map(w => w.id === editingWallet.id ? editingWallet : w));
    setShowEditWalletSheet(false);
  };

  const handleSaveEditPos = () => {
    if (!editingPos) return;
    setPosItems(posItems.map(p => p.id === editingPos.id ? editingPos : p));
    setShowEditPosSheet(false);
  };

  const handleEditWallet = (wallet: WalletItem) => {
    setActiveMenuId(null);
    setEditingWallet(wallet);
    setShowEditWalletSheet(true);
  };

  const handleEditPos = (pos: PosItem) => {
    setActiveMenuId(null);
    setEditingPos(pos);
    setShowEditPosSheet(true);
  };

  const handleManageTemplates = (walletName: string) => {
    setActiveMenuId(null);
    setSelectedWalletName(walletName);
    setCurrentView('templates');
  };

  const handleDeleteWallet = (walletId: string) => {
    setWallets(wallets.filter(w => w.id !== walletId));
    setActiveMenuId(null);
  };

  const handleDeletePos = (posId: string) => {
    setPosItems(posItems.filter(p => p.id !== posId));
    setActiveMenuId(null);
  };

  const PosTerminalIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M7 4V2H17V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 14H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 14H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 18H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 18H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const renderWalletsList = () => {
    if (wallets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center pt-24 pb-8 h-full">
          <div className="w-20 h-20 bg-[#E6F4F1] rounded-full flex items-center justify-center mb-6">
            <Wallet className="w-10 h-10 text-[#247A7B]" />
          </div>
          <h3 className="text-[18px] font-bold text-[#1A202C] mb-2">لا توجد محافظ</h3>
          <p className="text-[14px] text-gray-500">أضف محفظة جديدة للبدء</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4 pt-4 px-4 pb-24">
        {wallets.map(wallet => (
          <div key={wallet.id} className="relative">
            <div className={`bg-white rounded-[16px] p-4 flex items-center justify-between shadow-sm border ${wallet.color === 'teal' ? 'border-[#247A7B]/20' : 'border-[#DB2777]/20'}`}>
              {/* Right side (RTL): icon and info */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 ${wallet.color === 'teal' ? 'bg-[#E6F4F1] text-[#247A7B]' : 'bg-[#FDF2F8] text-[#DB2777]'}`}>
                  <Wallet className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-[16px] font-bold text-[#1A202C]">{wallet.name}</h3>
                  <p className="text-[13px] text-gray-500 font-medium">محفظة — {wallet.senderId}</p>
                </div>
              </div>

              {/* Left side (RTL): switch and menu */}
              <div className="flex items-center gap-3">
                {/* Switch */}
                <div 
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${wallet.isActive ? 'bg-[#247A7B]' : 'bg-gray-300'}`}
                  onClick={() => {
                    const newWallets = wallets.map(w => w.id === wallet.id ? { ...w, isActive: !w.isActive } : w);
                    setWallets(newWallets);
                  }}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${wallet.isActive ? 'translate-x-0' : '-translate-x-6'}`} />
                </div>
                
                <button onClick={() => setActiveMenuId(activeMenuId === wallet.id ? null : wallet.id)} className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors relative z-10">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Dropdown Menu */}
            {activeMenuId === wallet.id && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                <div className="absolute top-12 left-4 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30 animate-in fade-in zoom-in duration-200">
                  <button 
                    onClick={() => handleEditWallet(wallet)}
                    className="w-full px-4 py-2.5 flex items-center justify-end gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[14px] font-medium text-[#1A202C]">تعديل</span>
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button 
                    onClick={() => handleManageTemplates(wallet.name)}
                    className="w-full px-4 py-2.5 flex items-center justify-end gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[14px] font-medium text-[#1A202C]">إدارة القوالب</span>
                    <Settings className="w-4 h-4 text-gray-500" />
                  </button>
                  <button 
                    onClick={() => handleDeleteWallet(wallet.id)}
                    className="w-full px-4 py-2.5 flex items-center justify-end gap-3 hover:bg-red-50 transition-colors"
                  >
                    <span className="text-[14px] font-medium text-red-500">حذف</span>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderPosList = () => {
    if (posItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center pt-24 pb-8 h-full">
          <div className="w-20 h-20 bg-[#E6F4F1] rounded-full flex items-center justify-center mb-6">
            <PosTerminalIcon className="w-10 h-10 text-[#247A7B]" />
          </div>
          <h3 className="text-[18px] font-bold text-[#1A202C] mb-2">لا توجد نقاط بيع</h3>
          <p className="text-[14px] text-gray-500">أضف نقطة بيع جديدة للبدء</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4 pt-4 px-4 pb-24">
        {posItems.map(item => (
          <div key={item.id} className="relative">
            <div className={`bg-white rounded-[16px] p-4 flex items-center justify-between shadow-sm border border-gray-100`}>
              {/* Right side (RTL): icon and info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-[#E2E8F0] text-gray-500 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-[16px] font-bold text-[#1A202C]">{item.name}</h3>
                  <p className="text-[13px] text-gray-500 font-medium">نقطة بيع — {item.phone}</p>
                </div>
              </div>

              {/* Left side (RTL): switch and menu */}
              <div className="flex items-center gap-3">
                {/* Switch */}
                <div 
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${item.isActive ? 'bg-[#247A7B]' : 'bg-gray-300'}`}
                  onClick={() => {
                    const newItems = posItems.map(p => p.id === item.id ? { ...p, isActive: !p.isActive } : p);
                    setPosItems(newItems);
                  }}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${item.isActive ? 'translate-x-0' : '-translate-x-6'}`} />
                </div>
                
                <button onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)} className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors relative z-10">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Dropdown Menu */}
            {activeMenuId === item.id && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                <div className="absolute top-12 left-4 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30 animate-in fade-in zoom-in duration-200">
                  <button 
                    onClick={() => handleEditPos(item)}
                    className="w-full px-4 py-2.5 flex items-center justify-end gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[14px] font-medium text-[#1A202C]">تعديل</span>
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button 
                    onClick={() => handleManageTemplates(item.name)}
                    className="w-full px-4 py-2.5 flex items-center justify-end gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[14px] font-medium text-[#1A202C]">إدارة القوالب</span>
                    <Settings className="w-4 h-4 text-gray-500" />
                  </button>
                  <button 
                    onClick={() => handleDeletePos(item.id)}
                    className="w-full px-4 py-2.5 flex items-center justify-end gap-3 hover:bg-red-50 transition-colors"
                  >
                    <span className="text-[14px] font-medium text-red-500">حذف</span>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

    if (currentView === 'templates') {
      return (
        <TemplatesScreen 
          walletName={selectedWalletName} 
          onBackClick={() => setCurrentView('main')} 
          onNewTemplateClick={() => setCurrentView('wizard')}
          onEditTemplateClick={() => setCurrentView('wizard')}
        />
      );
    }
    
    if (currentView === 'wizard') {
      return (
        <TemplateWizardScreen 
          walletName={selectedWalletName}
          onBackClick={() => setCurrentView('templates')} 
        />
      );
    }

  return (
    <div className="w-full h-full bg-[#F6F8F9] flex flex-col overflow-hidden relative" dir="rtl">
      {/* Header Area */}
      <div className="bg-[#F6F8F9] pt-8 px-4 pb-0 shrink-0 relative z-10">
        
        {/* Top Header */}
        <div className="flex items-start justify-between mb-6">
          <button className="p-2 -mr-2 text-[#1A202C] active:bg-gray-100 rounded-full transition-colors mt-1">
            <MoreVertical className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-end mr-4 flex-1">
            <h1 className="text-[20px] font-bold text-[#1A202C]">إدارة المحافظ ونقاط البيع</h1>
            <p className="text-[13px] text-gray-500 font-medium mt-1 text-right max-w-[220px] leading-relaxed">
              إعداد وتفعيل المحافظ ونقاط البيع المرتبطة بالرسائل
            </p>
          </div>
          
          <button 
            onClick={onBackClick}
            className="p-2 -ml-2 text-[#1A202C] active:bg-gray-100 rounded-full transition-colors mt-1"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="ابحث باسم المورد أو المعرف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-[#E2E8F0] bg-opacity-60 rounded-xl pr-4 pl-10 text-[14px] text-[#1A202C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#247A7B] transition-shadow"
            dir="rtl"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A202C]">
            <Search className="w-5 h-5" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-3 text-[15px] font-bold text-center transition-colors relative ${activeTab === 'pos' ? 'text-[#247A7B]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('pos')}
          >
            نقاط البيع
            {activeTab === 'pos' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#247A7B]" />
            )}
          </button>
          <button 
            className={`flex-1 py-3 text-[15px] font-bold text-center transition-colors relative ${activeTab === 'wallets' ? 'text-[#247A7B]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('wallets')}
          >
            المحافظ
            {activeTab === 'wallets' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#247A7B]" />
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'wallets' ? renderWalletsList() : renderPosList()}
      </div>

      {/* FAB */}
      <div className="absolute bottom-8 left-4 z-10">
        <button 
          onClick={() => activeTab === 'wallets' ? setShowNewWalletSheet(true) : setShowNewPosSheet(true)}
          className="bg-[#C06192] hover:bg-[#B35887] text-white px-5 py-3.5 rounded-[16px] shadow-lg flex items-center gap-2 transition-transform active:scale-95"
        >
          <span className="text-[15px] font-bold">
            {activeTab === 'wallets' ? 'إضافة محفظة' : 'إضافة نقطة بيع'}
          </span>
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* New Wallet Bottom Sheet */}
      {showNewWalletSheet && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={() => setShowNewWalletSheet(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-50 animate-in slide-in-from-bottom duration-300">
            <div className="flex flex-col items-center pt-3 pb-6 px-6">
              <div className="w-10 h-1 bg-gray-200 rounded-full mb-6" />
              
              <h2 className="text-[18px] font-bold text-[#247A7B] mb-6">محفظة جديدة</h2>
              
              <div className="w-full space-y-4">
                <input 
                  type="text" 
                  value={newWalletData.senderId}
                  onChange={(e) => setNewWalletData({ ...newWalletData, senderId: e.target.value })}
                  placeholder="معرف المورد (Sender ID)" 
                  className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                  dir="ltr"
                  style={{ textAlign: 'right' }}
                />
                <input 
                  type="text" 
                  value={newWalletData.name}
                  onChange={(e) => setNewWalletData({ ...newWalletData, name: e.target.value })}
                  placeholder="اسم العرض" 
                  className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                  dir="rtl"
                />
              </div>
              
              <div className="w-full flex items-center gap-4 mt-8">
                <button 
                  onClick={() => setShowNewWalletSheet(false)}
                  className="flex-1 h-14 bg-white text-[#247A7B] font-bold text-[16px] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleCreateWallet}
                  className="flex-1 h-14 bg-[#247A7B] text-white font-bold text-[16px] rounded-xl shadow-md hover:bg-[#1E6667] transition-colors"
                >
                  إنشاء
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* New POS Bottom Sheet */}
      {showNewPosSheet && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={() => setShowNewPosSheet(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-50 animate-in slide-in-from-bottom duration-300">
            <div className="flex flex-col items-center pt-3 pb-6 px-6">
              <div className="w-10 h-1 bg-gray-200 rounded-full mb-6" />
              
              <h2 className="text-[18px] font-bold text-[#247A7B] mb-6">نقطة بيع جديدة</h2>
              
              <div className="w-full space-y-4">
                <input 
                  type="text" 
                  value={newPosData.phone}
                  onChange={(e) => setNewPosData({ ...newPosData, phone: e.target.value })}
                  placeholder="رقم جوال نقطة البيع" 
                  className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                  dir="ltr"
                  style={{ textAlign: 'right' }}
                />
                <input 
                  type="text" 
                  value={newPosData.name}
                  onChange={(e) => setNewPosData({ ...newPosData, name: e.target.value })}
                  placeholder="اسم العرض" 
                  className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                  dir="rtl"
                />
                
                <div className="relative pt-3">
                  <div className="absolute top-0 right-4 bg-white px-2 text-[13px] text-gray-500 z-10" style={{ transform: 'translateY(-50%)' }}>
                    سقف الدين المسموح به (ر.ي) <span className="text-red-500">*</span>
                  </div>
                  <input 
                    type="text" 
                    value={newPosData.debtLimit}
                    onChange={(e) => setNewPosData({ ...newPosData, debtLimit: e.target.value })}
                    className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                  />
                </div>
              </div>
              
              <label className="w-full flex items-center justify-start gap-3 mt-6 mb-2 cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={newPosData.createDefaultTemplate}
                    onChange={(e) => setNewPosData({ ...newPosData, createDefaultTemplate: e.target.checked })}
                  />
                  <div className="w-6 h-6 rounded border-2 border-[#247A7B] bg-[#247A7B] peer-checked:bg-[#247A7B] peer-checked:border-[#247A7B] transition-colors flex items-center justify-center">
                    <Check className={`w-4 h-4 text-white transition-opacity ${newPosData.createDefaultTemplate ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
                <span className="text-[14px] font-bold text-[#1A202C]">إنشاء القالب الافتراضي لنقطة البيع</span>
              </label>
              
              <div className="w-full flex items-center gap-4 mt-6">
                <button 
                  onClick={() => setShowNewPosSheet(false)}
                  className="flex-1 h-14 bg-white text-[#247A7B] font-bold text-[16px] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleCreatePos}
                  className="flex-1 h-14 bg-[#247A7B] text-white font-bold text-[16px] rounded-xl shadow-md hover:bg-[#1E6667] transition-colors"
                >
                  إنشاء
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Wallet Bottom Sheet */}
      {showEditWalletSheet && editingWallet && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={() => setShowEditWalletSheet(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-50 animate-in slide-in-from-bottom duration-300">
            <div className="flex flex-col items-center pt-3 pb-6 px-6">
              <div className="w-10 h-1 bg-gray-200 rounded-full mb-6" />
              
              <h2 className="text-[18px] font-bold text-[#247A7B] mb-6">تعديل مورد</h2>
              
              <div className="w-full space-y-4">
                <div className="space-y-1">
                  <label className="text-[13px] text-gray-500 mr-2">معرف المورد (Sender ID)</label>
                  <input 
                    type="text" 
                    value={editingWallet.senderId}
                    onChange={(e) => setEditingWallet({ ...editingWallet, senderId: e.target.value })}
                    className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] text-gray-500 mr-2">اسم العرض</label>
                  <input 
                    type="text" 
                    value={editingWallet.name}
                    onChange={(e) => setEditingWallet({ ...editingWallet, name: e.target.value })}
                    className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                    dir="rtl"
                  />
                </div>
              </div>
              
              <div className="w-full flex items-center gap-4 mt-8">
                <button 
                  onClick={() => setShowEditWalletSheet(false)}
                  className="flex-1 h-14 bg-white text-[#247A7B] font-bold text-[16px] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleSaveEditWallet}
                  className="flex-1 h-14 bg-[#247A7B] text-white font-bold text-[16px] rounded-xl shadow-md hover:bg-[#1E6667] transition-colors"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit POS Bottom Sheet */}
      {showEditPosSheet && editingPos && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={() => setShowEditPosSheet(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-50 animate-in slide-in-from-bottom duration-300">
            <div className="flex flex-col items-center pt-3 pb-6 px-6">
              <div className="w-10 h-1 bg-gray-200 rounded-full mb-6" />
              
              <h2 className="text-[18px] font-bold text-[#247A7B] mb-6">تعديل نقطة بيع</h2>
              
              <div className="w-full space-y-4">
                <div className="space-y-1">
                  <label className="text-[13px] text-gray-500 mr-2">رقم جوال نقطة البيع</label>
                  <input 
                    type="text" 
                    value={editingPos.phone}
                    onChange={(e) => setEditingPos({ ...editingPos, phone: e.target.value })}
                    className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] text-gray-500 mr-2">اسم العرض</label>
                  <input 
                    type="text" 
                    value={editingPos.name}
                    onChange={(e) => setEditingPos({ ...editingPos, name: e.target.value })}
                    className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                    dir="rtl"
                  />
                </div>
                
                <div className="relative pt-6">
                  <div className="absolute top-3 right-4 bg-white px-2 text-[13px] text-gray-500 z-10" style={{ transform: 'translateY(-50%)' }}>
                    سقف الدين المسموح به (ر.ي) <span className="text-red-500">*</span>
                  </div>
                  <input 
                    type="text" 
                    value={editingPos.debtLimit || '5000'}
                    onChange={(e) => setEditingPos({ ...editingPos, debtLimit: e.target.value })}
                    className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] focus:outline-none focus:border-[#247A7B] focus:ring-1 focus:ring-[#247A7B]"
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                  />
                </div>
              </div>
              
              <div className="w-full flex items-center gap-4 mt-8">
                <button 
                  onClick={() => setShowEditPosSheet(false)}
                  className="flex-1 h-14 bg-white text-[#247A7B] font-bold text-[16px] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleSaveEditPos}
                  className="flex-1 h-14 bg-[#247A7B] text-white font-bold text-[16px] rounded-xl shadow-md hover:bg-[#1E6667] transition-colors"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
