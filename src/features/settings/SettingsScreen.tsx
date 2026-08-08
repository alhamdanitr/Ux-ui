import React, { useState } from 'react';
import { SettingsState, SettingsUiEvent } from './SettingsTypes';
import { 
  SettingsHeader, 
  SettingsSectionTitle, 
  SettingsNavigationItem,
  SettingsValueItem,
  SettingsSwitchItem,
  SettingsDatabaseItem,
  EditNetworkNameDialog,
  PosBalanceRequestDialog
} from './components/SettingsComponents';
import { 
  Server, 
  CheckCircle2, 
  Filter, 
  History, 
  Cpu, 
  BadgeCheck, 
  MessageSquare, 
  FlaskConical, 
  Database, 
  Download, 
  Brush, 
  Eraser,
  HelpCircle,
  Wifi,
  Battery,
  Sun,
  Wallet,
  FileText
} from 'lucide-react';

interface SettingsScreenProps {
  onBackClick: () => void;
  onHelpCenterClick?: () => void;
  onRenewSubscriptionClick?: () => void;
  onSimSettingsClick?: () => void;
  onPosSettingsClick?: () => void;
  onTemplateSimulationClick?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBackClick, onHelpCenterClick, onRenewSubscriptionClick, onSimSettingsClick, onPosSettingsClick, onTemplateSimulationClick }) => {
  const [state, setState] = useState<SettingsState>({
    networkName: 'kayan',
    autoProcessMessages: true,
    processSpecificAmountsOnly: true,
    processOldMessages: true,
    databaseSize: '0.00 ميجابايت',
    darkMode: false,
    autoSendDailySummary: false,
    posBalanceRequestCode: '111',
    posBalanceRequestDailyLimit: '3'
  });
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPosBalanceRequestDialogOpen, setIsPosBalanceRequestDialogOpen] = useState(false);

  const handleEvent = (event: SettingsUiEvent) => {
    switch (event.type) {
      case 'onBackClick':
        onBackClick();
        break;
      case 'onEditNetworkNameClick':
        setIsEditDialogOpen(true);
        break;
      case 'onAutoProcessMessagesToggle':
        setState(prev => ({ ...prev, autoProcessMessages: event.value }));
        break;
      case 'onProcessSpecificAmountsOnlyToggle':
        setState(prev => ({ ...prev, processSpecificAmountsOnly: event.value }));
        break;
      case 'onProcessOldMessagesToggle':
        setState(prev => ({ ...prev, processOldMessages: event.value }));
        break;
      case 'onNetworkNameSave':
        setState(prev => ({ ...prev, networkName: event.value }));
        setIsEditDialogOpen(false);
        break;
      case 'onNetworkNameCancel':
        setIsEditDialogOpen(false);
        break;
      case 'onHelpCenterClick':
        if (onHelpCenterClick) onHelpCenterClick();
        break;
      case 'onRenewSubscriptionClick':
        if (onRenewSubscriptionClick) onRenewSubscriptionClick();
        break;
      case 'onSimSettingsClick':
        if (onSimSettingsClick) onSimSettingsClick();
        break;
      case 'onPosSettingsClick':
        if (onPosSettingsClick) onPosSettingsClick();
        break;
      case 'onBatterySettingsClick':
        // Handle battery settings click
        break;
      case 'onDarkModeToggle':
        setState(prev => ({ ...prev, darkMode: event.value }));
        break;
      case 'onAutoSendDailySummaryToggle':
        setState(prev => ({ ...prev, autoSendDailySummary: event.value }));
        break;
      case 'onPosBalanceRequestSettingsClick':
        setIsPosBalanceRequestDialogOpen(true);
        break;
      case 'onPosBalanceRequestSettingsSave':
        setState(prev => ({ 
          ...prev, 
          posBalanceRequestCode: event.code,
          posBalanceRequestDailyLimit: event.limit
        }));
        setIsPosBalanceRequestDialogOpen(false);
        break;
      case 'onPosBalanceRequestSettingsCancel':
        setIsPosBalanceRequestDialogOpen(false);
        break;
      case 'onTemplateSimulationClick':
        if (onTemplateSimulationClick) onTemplateSimulationClick();
        break;
      // Handle other events as needed
    }
  };

  return (
    <div className="w-full h-full bg-[#F6F8F9] flex flex-col overflow-hidden relative" dir="rtl">
      <SettingsHeader onBackClick={() => handleEvent({ type: 'onBackClick' })} />

      <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
        
        {/* Section: النظام */}
        <SettingsSectionTitle title="النظام" />
        <div className="bg-white rounded-2xl mx-4 mb-4 shadow-sm overflow-hidden border border-gray-100">
          <SettingsValueItem
            title="اسم الشبكة"
            subtitle="الاسم الحالي:"
            value={state.networkName}
            icon={<Server className="w-5 h-5" />}
            onClick={() => handleEvent({ type: 'onEditNetworkNameClick' })}
          />
          <SettingsSwitchItem
            title="المعالجة التلقائية للرسائل"
            subtitle="الخدمة تعمل — يتم استقبال ومعالجة الرسائل تلقائياً"
            icon={<CheckCircle2 className="w-5 h-5" />}
            checked={state.autoProcessMessages}
            onChange={(checked) => handleEvent({ type: 'onAutoProcessMessagesToggle', value: checked })}
          />
          <SettingsSwitchItem
            title="معالجة مبالغ الفئات فقط"
            subtitle="عند التفعيل، سيتم فقط معالجة رسائل المحافظ التي تطابق مبالغ الفئات المعرفة في النظام"
            icon={<Filter className="w-5 h-5" />}
            checked={state.processSpecificAmountsOnly}
            onChange={(checked) => handleEvent({ type: 'onProcessSpecificAmountsOnlyToggle', value: checked })}
          />
          <SettingsSwitchItem
            title="معالجة الرسائل القديمة (عند التوقف)"
            subtitle="تفعيل لمعالجة رسائل SMS التي وصلت أثناء إغلاق أو توقف التطبيق عند فتحه مجدداً"
            icon={<History className="w-5 h-5" />}
            checked={state.processOldMessages}
            onChange={(checked) => handleEvent({ type: 'onProcessOldMessagesToggle', value: checked })}
          />
          <SettingsNavigationItem
            title="إعدادات شرائح الاتصال"
            subtitle="إدارة شرائح القراءة والإرسال و Failover"
            icon={<Cpu className="w-5 h-5" />}
            onClick={() => handleEvent({ type: 'onSimSettingsClick' })}
            hasDivider={false}
          />
        </div>

        {/* Section: الترخيص */}
        <SettingsSectionTitle title="الترخيص" />
        <div className="bg-white rounded-2xl mx-4 mb-4 shadow-sm overflow-hidden border border-gray-100">
          <SettingsNavigationItem
            title="تجديد الاشتراك"
            subtitle="تجديد الترخيص أو إضافة رصيد SMS قبل انتهاء الباقة الحالية"
            icon={<BadgeCheck className="w-5 h-5" />}
            onClick={() => handleEvent({ type: 'onRenewSubscriptionClick' })}
            hasDivider={false}
          />
        </div>

        {/* Section: إدارة قيود البطارية */}
        <SettingsSectionTitle title="إدارة قيود البطارية والتشغيل في الخلفية" />
        <div className="bg-white rounded-2xl mx-4 mb-4 shadow-sm overflow-hidden border border-gray-100">
          <SettingsNavigationItem
            title="إدارة قيود البطارية والتشغيل في الخلفية"
            subtitle="ضروري: اضغط لمنع إيقاف التطبيق وتفعيل التشغيل غير المقيد لضمان استقرار الخدمة ووصول الكروت"
            icon={<Battery className="w-5 h-5" />}
            iconBgColor="bg-[#E6F4F1]"
            iconColor="text-[#247A7B]"
            onClick={() => handleEvent({ type: 'onBatterySettingsClick' })}
            hasDivider={false}
          />
        </div>

        {/* Section: المظهر */}
        <SettingsSectionTitle title="المظهر" />
        <div className="bg-white rounded-2xl mx-4 mb-4 shadow-sm overflow-hidden border border-gray-100">
          <SettingsSwitchItem
            title="الوضع الداكن"
            subtitle="المظهر الفاتح مفعل"
            icon={<Sun className="w-5 h-5" />}
            checked={state.darkMode}
            onChange={(checked) => handleEvent({ type: 'onDarkModeToggle', value: checked })}
          />
        </div>
        
        {/* Section: إعدادات المحافظ ونقاط البيع */}
        <SettingsSectionTitle title="إعدادات المحافظ ونقاط البيع" />
        <div className="bg-white rounded-2xl mx-4 mb-4 shadow-sm overflow-hidden border border-gray-100">
          <SettingsNavigationItem
            title="إدارة المحافظ ونقاط البيع"
            subtitle="إضافة وتعديل المحافظ وموردي نقاط البيع"
            icon={<MessageSquare className="w-5 h-5" />}
            onClick={() => handleEvent({ type: 'onPosSettingsClick' })}
          />
          <SettingsNavigationItem
            title="محاكاة القوالب"
            subtitle="اختبار ومحاكاة استخراج بيانات الرسائل"
            icon={<FlaskConical className="w-5 h-5" />}
            onClick={() => handleEvent({ type: 'onTemplateSimulationClick' })}
          />
          <SettingsNavigationItem
            title="إعدادات طلبات الرصيد لنقاط البيع"
            subtitle="تخصيص رمز طلب الرصيد، الحد اليومي وقالب الرد"
            icon={<Wallet className="w-5 h-5" />}
            onClick={() => handleEvent({ type: 'onPosBalanceRequestSettingsClick' })}
          />
          <SettingsSwitchItem
            title="إرسال ملخص العمليات اليومي تلقائياً"
            subtitle="ميزة رسالة الملخص اليومي معطلة"
            icon={<FileText className="w-5 h-5" />}
            checked={state.autoSendDailySummary}
            onChange={(checked) => handleEvent({ type: 'onAutoSendDailySummaryToggle', value: checked })}
          />
        </div>

        {/* Section: إعدادات قوالب الرسائل */}
        <SettingsSectionTitle title="إعدادات قوالب الرسائل" />
        <div className="bg-white rounded-2xl mx-4 mb-4 shadow-sm overflow-hidden border border-gray-100">
          <SettingsNavigationItem
            title="قوالب رسائل العملاء"
            subtitle="تخصيص وإدارة قوالب رسائل SMS المرسلة للعملاء"
            icon={<MessageSquare className="w-5 h-5" />}
            onClick={() => handleEvent({ type: 'onCustomerTemplatesClick' })}
            hasDivider={false}
          />
        </div>

        {/* Section: بيانات وصيانة النظام */}
        <SettingsSectionTitle title="بيانات وصيانة النظام" />
        <div className="bg-white rounded-2xl mx-4 mb-4 shadow-sm overflow-hidden border border-gray-100">
          <SettingsDatabaseItem
            title="حجم قاعدة البيانات الحالية"
            subtitle=""
            value={state.databaseSize}
            icon={<Database className="w-5 h-5" />}
            onRefresh={() => handleEvent({ type: 'onRefreshDatabaseSizeClick' })}
          />
          <SettingsNavigationItem
            title="النسخ الاحتياطي واستعادة البيانات"
            subtitle="حفظ واستعادة قاعدة البيانات والإعدادات سحابياً أو محلياً"
            icon={<History className="w-5 h-5" />}
            onClick={() => handleEvent({ type: 'onExportLedgerClick' })}
          />
          <SettingsNavigationItem
            title="تنظيف السجلات وتفريغ المساحة"
            subtitle="إزالة السجلات التلقائية أو تصفية البيانات المؤقتة"
            icon={<Brush className="w-5 h-5" />}
            iconBgColor="bg-[#FEF3C7]"
            iconColor="text-[#D97706]"
            onClick={() => handleEvent({ type: 'onCleanLogsClick' })}
          />
          <SettingsNavigationItem
            title="تنظيف عميق للنظام"
            subtitle="إعادة بناء فهارس قاعدة البيانات لتحرير المساحة وتسريع الأداء"
            icon={<Eraser className="w-5 h-5" />}
            iconBgColor="bg-[#FEF3C7]"
            iconColor="text-[#D97706]"
            onClick={() => handleEvent({ type: 'onDeepCleanClick' })}
            hasDivider={false}
          />
        </div>

        {/* Section: المساعدة */}
        <SettingsSectionTitle title="المساعدة" />
        <div className="bg-white rounded-2xl mx-4 mb-4 shadow-sm overflow-hidden border border-gray-100">
          <SettingsNavigationItem
            title="مركز المساعدة"
            subtitle="دليل الاستخدام والأسئلة الشائعة"
            icon={<HelpCircle className="w-5 h-5" />}
            onClick={() => handleEvent({ type: 'onHelpCenterClick' })}
            hasDivider={false}
          />
        </div>

        {/* Section: عن التطبيق */}
        <SettingsSectionTitle title="عن التطبيق" />
        <div className="bg-white rounded-2xl mx-4 mb-8 shadow-sm p-6 border border-gray-100 flex flex-col">
          <div className="flex items-center justify-center mb-6 relative">
            <div className="absolute right-0 w-12 h-12 rounded-xl bg-[#E6F4F1] text-[#247A7B] flex items-center justify-center">
              <Wifi className="w-6 h-6" />
            </div>
            <div className="flex flex-col text-center">
              <h3 className="text-[17px] font-bold text-[#1A202C]">Z Net</h3>
              <p className="text-[14px] text-gray-500 font-medium mt-1">الإصدار 1.0.3</p>
              <p className="text-[14px] text-gray-500 font-medium mt-1">المبرمج: شركة كيان سوفت</p>
              <p className="text-[14px] text-gray-500 font-medium mt-1" dir="ltr">ت: 773303455</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[13px] text-gray-500 font-medium">© Z Net 2026. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>

      {isEditDialogOpen && (
        <EditNetworkNameDialog
          currentName={state.networkName}
          onSave={(name) => handleEvent({ type: 'onNetworkNameSave', value: name })}
          onCancel={() => handleEvent({ type: 'onNetworkNameCancel' })}
        />
      )}

      {isPosBalanceRequestDialogOpen && (
        <PosBalanceRequestDialog
          currentCode={state.posBalanceRequestCode}
          currentLimit={state.posBalanceRequestDailyLimit}
          onSave={(code, limit) => handleEvent({ type: 'onPosBalanceRequestSettingsSave', code, limit })}
          onCancel={() => handleEvent({ type: 'onPosBalanceRequestSettingsCancel' })}
        />
      )}
    </div>
  );
};
